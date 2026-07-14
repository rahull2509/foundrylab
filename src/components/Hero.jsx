import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight, Calendar, Sparkles, CheckCircle2, Star,
  GitCommit, Zap, BarChart3, Database, Cloud, Bot
} from "lucide-react";
import CountUp from "./CountUp";
import ShapeGrid from "./ShapeGrid";

gsap.registerPlugin(ScrollTrigger);

/* ─── Floating ecosystem cards data ─── */
const ECOSYSTEM = [
  {
    id: "deploy",
    style: { top: "8%", right: "3%", animDelay: "0s" },
    rotate: "rotate(3deg)",
    content: (
      <div className="w-[210px] rounded-2xl overflow-hidden bg-[#0A0F1E] border border-white/8 shadow-[0_32px_64px_-20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-1.5 px-3 py-2.5 bg-[#060912] border-b border-white/5">
          <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
          <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
          <span className="ml-auto mono text-[8px] text-white/30 tracking-widest">deploy.yml</span>
        </div>
        <div className="p-3 space-y-1.5">
          {[
            { dot: "#4ADE80", text: "Build successful", sub: "14s" },
            { dot: "#4ADE80", text: "Tests passed", sub: "132/132" },
            { dot: "#60A5FA", text: "Deployed to prod", sub: "vercel" },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: r.dot }} />
              <span className="mono text-[9px] text-white/70 flex-1">{r.text}</span>
              <span className="mono text-[8px] text-white/30">{r.sub}</span>
            </div>
          ))}
        </div>
        <div className="px-3 pb-3">
          <div className="rounded-lg bg-[#4ADE80]/10 border border-[#4ADE80]/20 px-2.5 py-1.5 flex items-center gap-1.5">
            <Cloud size={10} className="text-[#4ADE80]" />
            <span className="mono text-[9px] text-[#4ADE80] font-medium">LIVE · foundrylab.dev</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "metrics",
    style: { top: "38%", right: "1%", animDelay: "0.9s" },
    rotate: "rotate(-2deg)",
    content: (
      <div className="w-[190px] rounded-2xl overflow-hidden bg-[#0A0F1E] border border-white/8 shadow-[0_32px_64px_-20px_rgba(0,0,0,0.5)]">
        <div className="p-3 border-b border-white/5">
          <div className="mono text-[8px] text-white/30 tracking-widest mb-1">MONTHLY REVENUE</div>
          <div className="flex items-end gap-2">
            <span className="text-white font-semibold text-xl leading-none">$48.2k</span>
            <span className="mono text-[9px] text-[#4ADE80] mb-0.5">↑ 34%</span>
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-end gap-0.5 h-10">
            {[28, 42, 35, 55, 48, 62, 50, 72, 65, 85, 74, 95].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i >= 9 ? "linear-gradient(to top,#245BFF,#60A5FA)" : "rgba(255,255,255,0.08)" }} />
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <BarChart3 size={9} className="text-[#245BFF]" />
            <span className="mono text-[8px] text-white/30">Stripe · last 12 months</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "github",
    style: { top: "68%", right: "4%", animDelay: "0.4s" },
    rotate: "rotate(4deg)",
    content: (
      <div className="w-[200px] rounded-2xl bg-[#0A0F1E] border border-white/8 shadow-[0_32px_64px_-20px_rgba(0,0,0,0.5)] p-3 space-y-2">
        <div className="flex items-center gap-2 pb-2 border-b border-white/5">
          <GitCommit size={12} className="text-[#245BFF]" />
          <span className="mono text-[9px] text-white/60 tracking-widest">RECENT COMMITS</span>
        </div>
        {[
          { msg: "feat: auth + JWT flow", time: "2m ago", color: "#4ADE80" },
          { msg: "fix: payment webhook", time: "18m ago", color: "#FBBF24" },
          { msg: "chore: deploy pipeline", time: "1h ago", color: "#60A5FA" },
        ].map((c, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: c.color }} />
            <div className="flex-1 min-w-0">
              <div className="mono text-[9px] text-white/70 truncate">{c.msg}</div>
              <div className="mono text-[8px] text-white/25">{c.time}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "ai",
    style: { top: "18%", left: "1%", animDelay: "0.6s" },
    rotate: "rotate(-4deg)",
    content: (
      <div className="w-[190px] rounded-2xl bg-[#0A0F1E] border border-white/8 shadow-[0_32px_64px_-20px_rgba(0,0,0,0.5)] p-3">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-6 h-6 rounded-full bg-[#245BFF]/20 border border-[#245BFF]/30 grid place-items-center">
            <Bot size={11} className="text-[#60A5FA]" />
          </div>
          <span className="mono text-[9px] text-white/40 tracking-widest">AI ASSISTANT</span>
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4ADE80] pulse-dot" />
        </div>
        <div className="rounded-lg bg-white/5 p-2 mono text-[9px] text-white/60 leading-relaxed">
          "Building your auth module with Next.js + Supabase. ETA: 2 hours."
        </div>
        <div className="mt-2 flex items-center gap-1">
          <Zap size={9} className="text-[#FBBF24]" />
          <span className="mono text-[8px] text-white/25">Gemini AI · Active</span>
        </div>
      </div>
    ),
  },
  {
    id: "db",
    style: { top: "60%", left: "2%", animDelay: "1.1s" },
    rotate: "rotate(3deg)",
    content: (
      <div className="w-[175px] rounded-2xl bg-[#0A0F1E] border border-white/8 shadow-[0_32px_64px_-20px_rgba(0,0,0,0.5)] p-3">
        <div className="flex items-center gap-2 mb-2">
          <Database size={11} className="text-[#A78BFA]" />
          <span className="mono text-[9px] text-white/40 tracking-widest">SUPABASE</span>
        </div>
        <div className="space-y-1.5">
          {[{ table: "users", rows: "12,847", up: true }, { table: "payments", rows: "4,219", up: true }, { table: "sessions", rows: "892", up: false }].map((t, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="mono text-[8px] text-white/40">{t.table}</span>
              <span className="mono text-[8px] text-white/60">{t.rows}</span>
              <span className={`mono text-[7px] ${t.up ? "text-[#4ADE80]" : "text-[#F87171]"}`}>{t.up ? "↑" : "↓"}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const TRUST_BADGES = [
  "Senior Engineers Only",
  "Weekly Progress Updates",
  "100% Source Code Ownership",
  "Post-Launch Support",
];

const SOCIAL_STATS = [
  { value: "4.9", suffix: "/5", label: "Client Rating", stars: true },
  { value: "10", suffix: "+", label: "Products Shipped" },
  { value: "98", suffix: "%", label: "Satisfaction" },
  { value: "3", suffix: " wks", label: "Avg MVP Time" },
];

export default function Hero() {
  const rootRef    = useRef(null);
  const h1Ref      = useRef(null);
  const subRef     = useRef(null);
  const ctaRef     = useRef(null);
  const proofRef   = useRef(null);
  const badgesRef  = useRef(null);
  const floatRef   = useRef(null);
  const orbRef     = useRef(null);
  const glowRef    = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px), (pointer: coarse)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  /* ── Mouse-follow glow ── */
  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => {
      if (!glowRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.background =
        `radial-gradient(800px circle at ${x}px ${y}px, rgba(36,91,255,0.07), transparent 60%)`;
    };
    const root = rootRef.current;
    root?.addEventListener("mousemove", onMove);
    return () => root?.removeEventListener("mousemove", onMove);
  }, [isMobile]);

  /* ── Parallax on floating cards ── */
  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      const cards = floatRef.current?.children || [];
      [...cards].forEach((el, i) => {
        const d = (i % 3 + 1) * 5;
        gsap.to(el, { x: x * d, y: y * d, duration: 1, ease: "power2.out", overwrite: "auto" });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile]);

  /* ── GSAP entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.3 });

      if (h1Ref.current) {
        const words = h1Ref.current.querySelectorAll("[data-word]");
        words.forEach((w) => {
          const text = w.textContent;
          w.textContent = "";
          [...text].forEach((ch) => {
            const s = document.createElement("span");
            s.textContent = ch === " " ? "\u00A0" : ch;
            s.style.display = "inline-block";
            s.style.transform = isMobile ? "" : "translateY(110%)";
            s.style.willChange = "transform";
            w.appendChild(s);
          });
        });

        if (!isMobile) {
          tl.to(h1Ref.current.querySelectorAll("[data-word] > span"),
            { y: 0, duration: 1.1, stagger: { each: 0.011 } }, 0);
        }
      }

      if (!isMobile) {
        tl.from(subRef.current,   { y: 28, opacity: 0, duration: 0.9 }, 0.5)
          .from(ctaRef.current?.children || [],  { y: 28, opacity: 0, duration: 0.8, stagger: 0.07 }, 0.65)
          .from(proofRef.current, { y: 24, opacity: 0, duration: 0.8 }, 0.75)
          .from(badgesRef.current?.children || [], { y: 18, opacity: 0, duration: 0.6, stagger: 0.05 }, 0.85);

        if (floatRef.current) {
          tl.from([...floatRef.current.children], { scale: 0.7, opacity: 0, y: 40, duration: 1.1, stagger: 0.08 }, 0.4);
        }

        /* Orb parallax */
        if (orbRef.current) {
          gsap.to(orbRef.current, {
            y: -100,
            scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 0.5 },
          });
        }
      } else {
        gsap.from([subRef.current, ctaRef.current, proofRef.current, badgesRef.current],
          { y: 16, opacity: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative min-h-screen pt-28 md:pt-32 pb-20 overflow-hidden noise"
    >
      {/* ── Backgrounds ── */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none transition-all duration-75" />

      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          maskImage: "radial-gradient(circle at 50% 40%, black 0%, rgba(0,0,0,0.3) 55%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 40%, black 0%, rgba(0,0,0,0.3) 55%, transparent 80%)",
        }}
      >
        <ShapeGrid direction="diagonal" speed={0.3} squareSize={44} borderColor="rgba(5,7,18,0.08)" hoverFillColor="rgba(36,91,255,0.04)" shape="square" hoverTrailAmount={0} />
      </div>

      <div
        className="absolute inset-0 grid-bg opacity-[0.35] pointer-events-none"
        style={{
          maskImage: "radial-gradient(circle at 50% 40%, black 0%, rgba(0,0,0,0.3) 55%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 40%, black 0%, rgba(0,0,0,0.3) 55%, transparent 80%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(1000px 650px at 50% 35%, rgba(36,91,255,0.10), transparent 60%)," +
            "radial-gradient(700px 500px at 10% 0%, rgba(36,91,255,0.06), transparent 55%)," +
            "radial-gradient(800px 600px at 90% 10%, rgba(5,7,18,0.04), transparent 60%)",
        }}
      />

      {/* Center soft orb */}
      <div
        ref={orbRef}
        className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-[780px] h-[780px] max-w-[110vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(36,91,255,0.13) 0%, rgba(36,91,255,0.03) 45%, transparent 70%)" }}
      />

      {/* Spinning decorative ring */}
      <svg
        className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[900px] h-[900px] max-w-[130vw] max-h-[130vw] hidden lg:block"
        viewBox="0 0 1000 1000" fill="none"
      >
        <g style={{ transformOrigin: "500px 500px", animation: "hero-spin 90s linear infinite" }}>
          <circle cx="500" cy="500" r="450" stroke="rgba(36,91,255,0.12)" strokeDasharray="2 10" />
          <circle cx="950" cy="500" r="5" fill="#245BFF" opacity="0.6" />
        </g>
        <g style={{ transformOrigin: "500px 500px", animation: "hero-spin-rev 70s linear infinite" }}>
          <circle cx="500" cy="500" r="340" stroke="rgba(36,91,255,0.07)" strokeDasharray="1 8" />
        </g>
      </svg>

      {/* ── Floating ecosystem (desktop xl+) ── */}
      <div ref={floatRef} className="absolute inset-0 pointer-events-none hidden xl:block">
        {ECOSYSTEM.map((card) => (
          <div
            key={card.id}
            className="absolute transition-transform duration-700 ease-out"
            style={{
              ...card.style,
              transform: card.rotate,
              animation: `hero-float ${6 + Math.random()}s ${card.style.animDelay} ease-in-out infinite`,
            }}
          >
            {card.content}
          </div>
        ))}
      </div>

      {/* Tablet chip */}
      <div className="absolute inset-0 pointer-events-none hidden md:flex xl:hidden items-start justify-end pt-28 pr-6">
        <div className="rounded-full bg-[#0A0F1E] text-white px-4 py-2 mono text-[10px] tracking-widest shadow-xl flex items-center gap-2" style={{ animation: "hero-float 7s ease-in-out infinite" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] pulse-dot" />
          MVP — SHIPPED IN 3 WEEKS
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-[2] max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="flex flex-col items-center text-center">

          {/* Availability pill */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(36,91,255,0.18)] bg-[rgba(36,91,255,0.05)] backdrop-blur-md px-4 py-2 mono text-[11px] text-[var(--ink)] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] pulse-dot" />
              NOW ACCEPTING Q3 PROJECTS
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#245BFF] text-white text-[9px]">5 SPOTS LEFT</span>
            </div>
          </div>

          {/* ── H1 ── */}
          <h1
            ref={h1Ref}
            className="serif mx-auto tracking-tight overflow-hidden"
            style={{ fontSize: "clamp(42px, 8.5vw, 112px)", lineHeight: 0.93, maxWidth: "min(1080px, 94vw)" }}
          >
            <span data-word>Ship&nbsp;</span>
            <span data-word>Your&nbsp;</span>
            <span data-word>MVP&nbsp;</span>
            <span className="italic-serif text-[#245BFF]">
              <span data-word>in&nbsp;</span>
              <span data-word>Weeks,</span>
            </span>
            <br />
            <span data-word>Not&nbsp;</span>
            <span data-word>Months.</span>
          </h1>

          {/* ── Subtext ── */}
          <p ref={subRef} className="mt-7 max-w-[560px] text-[15px] md:text-[17px] text-[var(--muted)] leading-relaxed">
            FoundryLab helps founders go from idea to production-ready product in weeks — with{" "}
            <span className="text-[var(--ink)] font-medium">senior engineers, zero outsourcing,</span> and
            transparent communication at every step.
          </p>

          {/* ── CTAs ── */}
          <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-[480px]">
            <a
              href="#contact"
              className="group relative inline-flex h-[52px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#245BFF] px-7 text-[15px] font-medium text-white overflow-hidden shadow-[0_20px_40px_-12px_rgba(36,91,255,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_50px_-12px_rgba(36,91,255,0.55)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#245BFF] to-[#4F7CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                Get Free MVP Estimate
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
            <a
              href="#contact"
              className="group inline-flex h-[52px] w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white/70 backdrop-blur-sm px-7 text-[15px] font-medium text-[var(--ink)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(36,91,255,0.25)] hover:shadow-md"
            >
              <Calendar size={15} className="text-[#245BFF] shrink-0" />
              Book Strategy Call
            </a>
          </div>

          {/* ── Trust badges ── */}
          <div ref={badgesRef} className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {TRUST_BADGES.map((badge) => (
              <div key={badge} className="flex items-center gap-1.5 mono text-[11px] text-[var(--muted)]">
                <CheckCircle2 size={12} className="text-[#245BFF] shrink-0" />
                {badge}
              </div>
            ))}
          </div>

          {/* ── Social proof bar ── */}
          <div
            ref={proofRef}
            className="mt-10 w-full max-w-3xl rounded-2xl border border-[var(--line)] bg-white/60 backdrop-blur-md shadow-[0_8px_40px_-16px_rgba(5,7,18,0.12)] px-6 py-5"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-[var(--line)]">
              {SOCIAL_STATS.map((stat, i) => (
                <div key={stat.label} className="flex flex-col items-center gap-1 px-4">
                  {stat.stars && (
                    <div className="flex gap-0.5 mb-0.5">
                      {[0,1,2,3,4].map(j => <Star key={j} size={11} className="fill-[#FBBF24] text-[#FBBF24]" />)}
                    </div>
                  )}
                  <div className="flex items-end gap-0.5">
                    <span className="serif text-2xl md:text-3xl leading-none text-[var(--ink)]">
                      <CountUp to={parseFloat(stat.value)} suffix="" />
                    </span>
                    <span className="serif text-lg leading-none text-[#245BFF] mb-0.5">{stat.suffix}</span>
                  </div>
                  <div className="mono text-[10px] text-[var(--muted)] tracking-widest uppercase">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Founder avatars */}
            <div className="mt-4 pt-4 border-t border-[var(--line)] flex items-center justify-center gap-3">
              <div className="flex -space-x-2.5">
                {[
                  { initials: "RK", bg: "#245BFF" },
                  { initials: "PS", bg: "#050712" },
                  { initials: "AV", bg: "#10B981" },
                  { initials: "NK", bg: "#F59E0B" },
                  { initials: "+", bg: "#6366F1" },
                ].map((a) => (
                  <span
                    key={a.initials}
                    className="w-8 h-8 rounded-full border-2 border-white grid place-items-center mono text-[10px] font-semibold text-white shadow-sm"
                    style={{ background: a.bg }}
                  >
                    {a.initials}
                  </span>
                ))}
              </div>
              <span className="mono text-[11px] text-[var(--muted)]">
                Trusted by <span className="text-[var(--ink)] font-medium">40+ founders</span> worldwide
              </span>
            </div>
          </div>

          {/* ── Scroll cue ── */}
          <div className="mt-12 flex items-center justify-center gap-3 mono text-[10px] tracking-widest text-[var(--muted)]">
            <span className="flex-1 h-[1px] bg-[var(--line)] max-w-[100px]" />
            <span className="flex flex-col items-center gap-1">
              <span className="w-[1px] h-5 bg-[var(--line)] rounded animate-bounce" style={{ animationDuration: "1.6s" }} />
            </span>
            SCROLL TO EXPLORE
            <span className="flex-1 h-[1px] bg-[var(--line)] max-w-[100px]" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-spin     { to { transform: rotate(360deg); } }
        @keyframes hero-spin-rev { to { transform: rotate(-360deg); } }
        @keyframes hero-float    { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
      `}</style>
    </section>
  );
}
