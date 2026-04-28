import React, { startTransition, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bot,
  MessageCircle,
  Minimize2,
  MoveDiagonal2,
  X,
  LoaderCircle,
  Send,
  TimerReset,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

const PHONE_DISPLAY = "+91 78302 41468";
const MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyABQCQ3XGC01iDw6LHWkylvCuEMrAHkL_o";

const knowledgeBase = `
You are FoundryLab's AI counselor and sales guide.
Your job is to help founders understand why they should choose FoundryLab and what to build first.
Write like a sharp product consultant, not like a generic chatbot.
Keep replies concise, practical, and confidence-building.
Do not use emojis.
Use simple formatting only. If emphasis helps, use markdown bold with double asterisks.

Business facts:
- FoundryLab builds MVPs, landing pages, full-stack apps, UI/UX systems, and startup product strategy.
- The team position is speed, clarity, strong engineering, and founder-friendly execution.
- Direct contact number: ${PHONE_DISPLAY}

Team proof points:
- Keshav Sharma is a backend engineer focused on distributed microservices and event-driven systems.
- Core strengths include Node.js, Go, gRPC, Kafka, RabbitMQ, PostgreSQL, MongoDB, Docker, Kubernetes, AWS, React, Next.js, and Tailwind.
- Helical Consulting: led frontend technical design, reusable component systems, and reduced UI rework by 40%.
- Sheryians Coding School: improved API response times by 40% through indexing and query optimization.
- ClinixSphere: reduced server-side errors by 25% and improved PostgreSQL performance from about 200ms to under 80ms.
- VerifyDev: 8-microservice platform with gRPC, RabbitMQ, Next.js, React Native, and real-time chat.
- SocialHub: 8-microservice event-driven platform using Kafka, Redis, Kubernetes, and LangChain.
- Kurser: cloud deployment platform that ships React apps in under 45 seconds.

When asked why choose FoundryLab:
- Emphasize strong backend architecture, fast MVP delivery, scalable systems, and product-minded execution.
- Mention that the team can handle both engineering depth and polished frontend delivery.
- If the lead sounds qualified, suggest calling or messaging on WhatsApp at ${PHONE_DISPLAY}.
`;

const initialMessages = [
  {
    role: "assistant",
    content:
      "Hi, I’m FoundryLab AI. Tell me about your product, timeline, or idea and I’ll help you scope it, position it, and plan the next move.",
  },
];

const GEMINI_TIMEOUT_MS = 25000;
const GEMINI_MAX_RETRIES = 2;

function buildHistory(messages) {
  return messages.slice(-6).map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
}

function readGeminiText(payload) {
  return payload?.candidates?.[0]?.content?.parts?.map((part) => part?.text || "").join("").trim();
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function callGemini(contents, maxOutputTokens = 640) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: knowledgeBase }],
          },
          contents,
          generationConfig: {
            temperature: 0.65,
            topP: 0.9,
            maxOutputTokens,
          },
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Gemini request failed with ${response.status}`);
    }

    const payload = await response.json();
    return {
      text: readGeminiText(payload),
      finishReason: payload?.candidates?.[0]?.finishReason || "",
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function requestGeminiReply(messages) {
  let lastError;

  for (let attempt = 0; attempt <= GEMINI_MAX_RETRIES; attempt += 1) {
    try {
      const history = buildHistory(messages);
      const firstPass = await callGemini(history, 640);

      if (!firstPass.text) {
        throw new Error("Gemini returned an empty response");
      }

      if (firstPass.finishReason !== "MAX_TOKENS") {
        return firstPass.text;
      }

      const continuationContents = [
        ...history,
        { role: "model", parts: [{ text: firstPass.text }] },
        { role: "user", parts: [{ text: "Continue exactly from where you stopped. Do not restart. Finish the answer cleanly in the same tone." }] },
      ];

      const continuation = await callGemini(continuationContents, 320);
      return continuation.text ? `${firstPass.text}\n${continuation.text}` : firstPass.text;
    } catch (error) {
      lastError = error;

      if (attempt < GEMINI_MAX_RETRIES) {
        await sleep(600 * (attempt + 1));
      }
    }
  }

  throw lastError;
}

function renderFormattedText(content) {
  const parts = content.split(/(\*\*.*?\*\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={`${part}-${index}`} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
  });
}

function getFallbackReply(input) {
  const message = input.toLowerCase();

  if (message.includes("why") || message.includes("choose") || message.includes("best")) {
    return `Choose FoundryLab if you need both speed and engineering depth. The team is strong in MVP delivery, polished frontend work, and backend-heavy systems like microservices, Kafka, gRPC, Redis, and cloud deployment.\n\nYou are not hiring a surface-level design shop. You are hiring builders who can scope the product well and still ship the hard parts cleanly.\n\nIf you want, message or call ${PHONE_DISPLAY} and we can qualify your project directly.`;
  }

  if (message.includes("mvp") || message.includes("launch") || message.includes("3 weeks")) {
    return `For a fast MVP, keep version one narrow: one user type, one core workflow, one measurable outcome. FoundryLab is strongest when the scope is cut aggressively first and the launch path is engineered for speed.\n\nIf you share your product idea in one line, I can suggest the exact V1 feature cut next.`;
  }

  if (message.includes("backend") || message.includes("scalable") || message.includes("microservice") || message.includes("realtime")) {
    return `Yes. The team background is unusually strong on backend systems: Go, Node.js, gRPC, Kafka, RabbitMQ, Redis, PostgreSQL, Kubernetes, and AWS. That matters if your product needs chat, events, scaling, or multi-service architecture later.\n\nFoundryLab can start lean for MVP and still avoid painting you into a corner.`;
  }

  if (message.includes("landing") || message.includes("lead") || message.includes("sales")) {
    return `For a sales-focused landing page, version one should usually include a sharp offer, a clear founder promise, proof of technical credibility, a call or WhatsApp path, and one fast intake flow. The goal is not more sections. The goal is lower hesitation and faster contact.\n\nThat is exactly where this kind of AI counselor chat works well.`;
  }

  return `The strongest next step is to define your first buyer, the main action you want them to take, and the smallest version that proves demand. FoundryLab can help with the scope, stack, design, and build path.\n\nIf you want direct help, call or WhatsApp ${PHONE_DISPLAY}.`;
}

export default function AIDesk() {
  const { toast } = useToast();
  const threadRef = useRef(null);
  const resizeRef = useRef(null);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [panelSize, setPanelSize] = useState({ width: 390, height: 520 });
  useEffect(() => {
    if (!threadRef.current) return;
    threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    const handle = resizeRef.current;
    if (!handle || !open) return;

    const onPointerDown = (event) => {
      event.preventDefault();

      const startX = event.clientX;
      const startY = event.clientY;

      setPanelSize((current) => {
        const startWidth = current.width;
        const startHeight = current.height;

        const onPointerMove = (moveEvent) => {
          const width = Math.min(Math.max(startWidth + (moveEvent.clientX - startX), 320), Math.min(window.innerWidth - 24, 640));
          const height = Math.min(Math.max(startHeight + (moveEvent.clientY - startY), 420), Math.min(window.innerHeight - 40, 820));
          setPanelSize({ width, height });
        };

        const onPointerUp = () => {
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("pointerup", onPointerUp);
        };

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);

        return current;
      });
    };

    handle.addEventListener("pointerdown", onPointerDown);

    return () => {
      handle.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const sendMessage = async (rawValue) => {
    const value = rawValue.trim();
    if (!value || loading) return;

    const nextMessages = [...messages, { role: "user", content: value }];
    startTransition(() => {
      setMessages(nextMessages);
      setInput("");
    });

    setLoading(true);

    try {
      let reply = await requestGeminiReply(nextMessages);

      if (!reply) {
        reply = getFallbackReply(value);
      }

      startTransition(() => {
        setMessages((current) => [...current, { role: "assistant", content: reply }]);
      });
    } catch (error) {
      startTransition(() => {
        setMessages((current) => [...current, { role: "assistant", content: getFallbackReply(value) }]);
      });

      toast({
        title: "Gemini unavailable",
        description: "The AI request failed, so a local backup reply was shown.",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-3 md:bottom-8 md:right-8">
      {open && (
        <div
          className="relative w-[calc(100vw-1.5rem)] overflow-hidden rounded-[28px] border hairline bg-[var(--surface)] shadow-[0_28px_90px_-32px_rgba(5,7,18,0.45)] backdrop-blur-md"
          style={{
            width: `min(calc(100vw - 1.5rem), ${panelSize.width}px)`,
            height: `min(calc(100vh - 2rem), ${panelSize.height}px)`,
          }}
        >
          <div className="bg-[linear-gradient(135deg,var(--ink)_0%,#0E1730_100%)] px-5 py-4 text-white">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--blue)] shadow-[0_18px_40px_-18px_rgba(0,71,255,0.65)]">
                  <Bot size={18} />
                </div>
                <div>
                  <div className="serif text-xl leading-none">FoundryLab AI</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Minimize chat"
                >
                  <Minimize2 size={16} />
                </button>
              </div>
            </div>

          </div>

          <div
            ref={threadRef}
            className="overflow-y-auto bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F9FC_100%)] px-4 pb-4 pt-5"
            style={{ height: `calc(100% - 168px)` }}
          >
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[88%] rounded-[22px] px-4 py-3 ${
                    message.role === "assistant"
                      ? "border hairline bg-[var(--surface)] text-[var(--ink)] shadow-[0_18px_40px_-34px_rgba(5,7,18,0.25)]"
                      : "ml-auto bg-[linear-gradient(135deg,var(--blue)_0%,#2F66FF_100%)] text-white shadow-[0_24px_54px_-28px_rgba(0,71,255,0.6)]"
                  }`}
                >
                  <div className="mb-2 mono text-[10px] tracking-[0.18em] opacity-55">
                    {message.role === "assistant" ? "FOUNDRYLAB" : "YOU"}
                  </div>
                  <p className="whitespace-pre-line text-[14px] leading-relaxed">{renderFormattedText(message.content)}</p>
                </div>
              ))}

              {loading && (
                <div className="max-w-[88%] rounded-[22px] border hairline bg-[var(--surface)] px-4 py-3 shadow-[0_18px_40px_-34px_rgba(5,7,18,0.25)]">
                  <div className="mb-2 mono text-[10px] tracking-[0.18em] opacity-55">FOUNDRYLAB</div>
                  <div className="inline-flex items-center gap-2 text-[14px] text-[var(--muted)]">
                    <LoaderCircle size={15} className="animate-spin" />
                    Thinking through the best answer...
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t hairline bg-[color:var(--surface)]/96 p-4">
            <form onSubmit={handleSubmit}>
              <div className="rounded-[22px] border hairline bg-[var(--surface-2)] px-3 py-2.5">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void sendMessage(input);
                    }
                  }}
                  placeholder="Ask anything about your product or project..."
                  rows={1}
                  className="max-h-28 min-h-[24px] w-full resize-none bg-transparent px-1 py-1 text-[14px] leading-relaxed outline-none placeholder:text-[var(--muted-2)]"
                />
                <div className="mt-2 flex items-center justify-between gap-2 border-t hairline pt-2">
                  <button
                    type="button"
                    onClick={() => setMessages(initialMessages)}
                    className="inline-flex items-center gap-2 rounded-full border hairline px-3 py-2 mono text-[10px] tracking-[0.18em] text-[var(--muted)] transition-colors hover:bg-[var(--surface)]"
                  >
                    <TimerReset size={12} />
                    RESET
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-full btn-blue px-4 py-2.5 text-sm font-medium disabled:opacity-50 disabled:hover:bg-[var(--blue)]"
                  >
                    Send <Send size={14} />
                  </button>
                </div>
              </div>
            </form>
          </div>

          <button
            ref={resizeRef}
            type="button"
            className="absolute bottom-2 right-2 hidden h-8 w-8 cursor-se-resize place-items-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--ink)] md:grid"
            aria-label="Resize chat"
          >
            <MoveDiagonal2 size={15} />
          </button>
        </div>
      )}

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-3 py-3 pr-5 text-white shadow-[0_22px_56px_-18px_rgba(5,7,18,0.48)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--blue)]"
          aria-label="Open AI chat"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--blue)] transition-colors group-hover:bg-white">
            <MessageCircle size={18} className="text-white group-hover:text-[var(--blue)]" />
          </span>
          <span className="flex flex-col items-start text-left">
            <span className="mono text-[9px] tracking-[0.18em] text-white/55">GEMINI CHAT</span>
            <span className="text-sm font-medium">Ask AI</span>
          </span>
          <span className="absolute -top-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-white text-[var(--blue)] shadow-[0_12px_24px_-12px_rgba(5,7,18,0.45)]">
            <ArrowUpRight size={12} />
          </span>
        </button>
      )}

      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="grid h-12 w-12 place-items-center rounded-full bg-[var(--ink)] text-white shadow-[0_18px_40px_-18px_rgba(5,7,18,0.45)] transition-colors hover:bg-[var(--blue)] md:hidden"
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
