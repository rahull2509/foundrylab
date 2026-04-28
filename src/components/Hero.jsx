import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Calendar, Sparkles, Circle, ArrowDown, Star } from "lucide-react";
import { stats } from "../mock";
import CountUp from "./CountUp";
import ShapeGrid from "./ShapeGrid";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef(null);
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const orbRef = useRef(null);
  const floatersRef = useRef(null);
  const [count, setCount] = useState(12847);

  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + Math.floor(Math.random() * 6) + 1), 1700);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const h1 = h1Ref.current;
      if (!h1) return;
      const words = h1.querySelectorAll("[data-word]");
      words.forEach((w) => {
        const text = w.textContent;
        w.textContent = "";
        [...text].forEach((ch) => {
          const s = document.createElement("span");
          s.textContent = ch === " " ? "\u00A0" : ch;
          s.style.display = "inline-block";
          s.style.transform = "translateY(110%)";
          s.style.willChange = "transform";
          w.appendChild(s);
        });
      });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.5 });
      tl.to(h1.querySelectorAll("[data-word] > span"), { y: 0, duration: 1.1, stagger: { each: 0.012 } }, 0)
        .from(subRef.current, { y: 30, opacity: 0, duration: 0.9 }, 0.5)
        .from(ctaRef.current.children, { y: 30, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.6)
        .from(statsRef.current.children, { y: 40, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.8)
        .from(floatersRef.current.children, { scale: 0.6, opacity: 0, y: 40, duration: 1, stagger: 0.07 }, 0.3);

      gsap.to(orbRef.current, {
        y: -120,
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      const cards = floatersRef.current?.children || [];
      [...cards].forEach((el, i) => {
        const depth = (i % 3 + 1) * 6;
        el.style.transform = `${el.dataset.tx || ""} translate3d(${x * depth}px, ${y * depth}px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const renderStat = (s) => {
    const m = s.value.match(/([\u20B9]?)([\d.]+)([^\d.]*)/);
    if (!m) return s.value;
    const [, prefix, num, suffix] = m;
    return <CountUp prefix={prefix} to={parseFloat(num)} suffix={suffix} />;
  };

  return (
    <section id="hero" ref={rootRef} className="relative min-h-screen pt-28 md:pt-36 pb-20 md:pb-24 overflow-hidden noise">
      {/* ShapeGrid background (subtle, masked) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: "radial-gradient(circle at center, black 0%, rgba(0,0,0,0.35) 55%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 0%, rgba(0,0,0,0.35) 55%, transparent 78%)",
        }}
      >
        <ShapeGrid
          direction="diagonal"
          speed={0.35}
          squareSize={44}
          borderColor="rgba(5, 7, 18, 0.10)"
          hoverFillColor="rgba(0, 71, 255, 0.05)"
          shape="square"
          hoverTrailAmount={0}
        />
      </div>

      {/* Background grid (masked so edges fade) */}
      <div
        className="absolute inset-0 grid-bg opacity-[0.38] pointer-events-none"
        style={{
          maskImage: "radial-gradient(circle at center, black 0%, rgba(0,0,0,0.35) 55%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 0%, rgba(0,0,0,0.35) 55%, transparent 78%)",
        }}
      />

      {/* Vignette + depth wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(900px 620px at 50% 40%, rgba(0,71,255,0.09), transparent 60%)," +
            "radial-gradient(1100px 720px at 50% 120%, rgba(5,7,18,0.07), transparent 55%)," +
            "radial-gradient(1000px 700px at -10% 10%, rgba(0,71,255,0.06), transparent 60%)," +
            "radial-gradient(1200px 900px at 110% -10%, rgba(5,7,18,0.05), transparent 55%)",
        }}
      />

      {/* Center glow orb */}
      <div ref={orbRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] max-w-[120vw] max-h-[120vh] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,71,255,0.16) 0%, rgba(0,71,255,0.04) 40%, transparent 70%)" }} />

      {/* Concentric rings (decorative) */}
      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[1100px] h-[1100px] max-w-[140vw] max-h-[140vw]" viewBox="0 0 1200 1200" fill="none">
        <g style={{ transformOrigin: "600px 600px", animation: "hero-spin 80s linear infinite" }}>
          <circle cx="600" cy="600" r="540" stroke="var(--line)" strokeDasharray="2 8" />
          <circle cx="1140" cy="600" r="6" fill="#0047FF" />
        </g>
        <g style={{ transformOrigin: "600px 600px", animation: "hero-spin-rev 60s linear infinite" }}>
          <circle cx="600" cy="600" r="430" stroke="rgba(0,71,255,0.22)" strokeDasharray="1 6" />
        </g>
      </svg>

      {/* Floating accent cards — ONLY visible on xl+ screens, well outside text area */}
      <div ref={floatersRef} className="absolute inset-0 pointer-events-none hidden xl:block">
        {/* TOP-LEFT: code snippet */}
        <div data-tx="rotate(-6deg)" className="absolute top-[8%] left-[2%] w-[210px] rounded-xl bg-[#0B1022] border border-white/5 shadow-[0_30px_60px_-20px_rgba(5,7,18,0.4)] overflow-hidden transition-transform duration-500 ease-out" style={{ transform: "rotate(-6deg)", animation: "hero-float 7s ease-in-out infinite" }}>
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#070B19] border-b border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
            <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
            <span className="ml-2 mono text-[8px] text-white/40 tracking-widest">deploy.ts</span>
          </div>
          <pre className="mono text-[10px] leading-[1.55] p-3 text-white/85">
            <code>
              <span className="text-[#9CA3FF]">const</span> mvp = <span className="text-[#FBBF24]">await</span><br />
              {"  "}foundry.<span className="text-[#7DD3FC]">build</span>(idea);<br />
              <span className="text-[#9CA3FF]">await</span> mvp.<span className="text-[#7DD3FC]">deploy</span>();<br />
              <span className="text-[#10B981]">// ✓ shipped 14s</span>
            </code>
          </pre>
        </div>

        {/* TOP-RIGHT: live dashboard */}
        <div data-tx="rotate(4deg)" className="absolute top-[6%] right-[2%] w-[230px] rounded-2xl bg-[var(--ink)] border border-white/5 shadow-[0_30px_60px_-20px_rgba(5,7,18,0.4)] overflow-hidden transition-transform duration-500 ease-out" style={{ transform: "rotate(4deg)", animation: "hero-float 6s 0.6s ease-in-out infinite" }}>
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0B1022] border-b border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
            <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
            <span className="ml-2 mono text-[8px] text-white/40 tracking-widest">app.foundry.dev</span>
            <span className="ml-auto mono text-[8px] text-[#4ADE80] flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#4ADE80] pulse-dot" /> LIVE
            </span>
          </div>
          <div className="p-3">
            <div className="mono text-[8px] text-white/40 tracking-widest">ACTIVE USERS</div>
            <div className="serif text-2xl text-white tabular-nums leading-none mt-1">{count.toLocaleString()}</div>
            <div className="flex items-end gap-1 h-9 mt-2">
              {[40, 62, 48, 75, 55, 82, 68, 95, 72, 88].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: "linear-gradient(to top, #0047FF, #2F66FF)" }} />
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM-LEFT: shipping badge */}
        <div data-tx="rotate(-8deg)" className="absolute bottom-[14%] left-[3%] w-[140px] rounded-2xl bg-[var(--blue)] text-white p-3.5 shadow-[0_24px_50px_-16px_rgba(0,71,255,0.55)] transition-transform duration-500 ease-out" style={{ transform: "rotate(-8deg)", animation: "hero-float 6.5s 1s ease-in-out infinite" }}>
          <div className="mono text-[9px] text-white/80 tracking-widest">SHIPPED IN</div>
          <div className="serif text-3xl leading-none mt-1">3 wks</div>
          <div className="mono text-[9px] text-white/80 mt-1.5">idea → live</div>
        </div>

        {/* BOTTOM-RIGHT: rating */}
        <div data-tx="rotate(5deg)" className="absolute bottom-[14%] right-[3%] rounded-2xl bg-[var(--surface)] border hairline shadow-[0_18px_40px_-12px_rgba(5,7,18,0.22)] px-4 py-3 flex items-center gap-3 transition-transform duration-500 ease-out" style={{ transform: "rotate(5deg)", animation: "hero-float 6s 0.8s ease-in-out infinite" }}>
          <div className="flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={14} className="fill-[#FBBF24] text-[#FBBF24]" />
            ))}
          </div>
          <div>
            <div className="serif text-base leading-none">4.9 / 5.0</div>
            <div className="mono text-[9px] text-[var(--muted)] tracking-widest mt-0.5">40+ FOUNDERS</div>
          </div>
        </div>
      </div>

      {/* Mini graphics for medium screens (tablet) — minimal floating chips only */}
      <div className="absolute inset-0 pointer-events-none hidden md:block xl:hidden">
        <div className="absolute top-[12%] right-[4%] rounded-full bg-[var(--ink)] text-white px-4 py-2 mono text-[10px] tracking-widest shadow-[0_18px_40px_-12px_rgba(5,7,18,0.3)] flex items-center gap-2" style={{ animation: "hero-float 7s ease-in-out infinite" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] pulse-dot" />
          MVP — SHIPPED
        </div>
      </div>

      {/* CENTER content */}
      <div className="relative z-[2] max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border hairline bg-[color:var(--surface)]/80 backdrop-blur-md px-3 py-1.5 mono text-[11px] text-[var(--ink)]/85 shadow-[0_18px_40px_-22px_rgba(5,7,18,0.25)]">
              <Sparkles size={12} className="text-[var(--blue)]" />
              NOW BOOKING Q3 MVP SPRINTS
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] text-[var(--bg)] px-3 py-1.5 mono text-[10px] tracking-widest shadow-[0_18px_40px_-22px_rgba(5,7,18,0.35)]">
              <Circle size={6} className="fill-[#4ADE80] text-[#4ADE80]" /> 5 SPOTS LEFT
            </div>
          </div>

          <h1
            ref={h1Ref}
            className="serif mx-auto mt-9 tracking-tight"
            style={{
              fontSize: "clamp(44px, 8.8vw, 116px)",
              lineHeight: 0.92,
              maxWidth: "min(1100px, 94vw)",
            }}
          >
            <span data-word>We&nbsp;</span><span data-word>Turn&nbsp;</span><span data-word>Your&nbsp;</span><span data-word>Startup</span>
            <br />
            <span data-word>Idea&nbsp;</span><span data-word>Into&nbsp;</span><span data-word>a&nbsp;</span>
            <span className="italic-serif text-[var(--blue)]"><span data-word>Live&nbsp;</span><span data-word>Product</span></span>
          </h1>

          <p ref={subRef} className="mt-7 max-w-2xl mx-auto text-[15px] md:text-lg text-[var(--muted)] leading-relaxed">
            From idea to MVP to scalable product, we ship with founder-level speed and clarity.
            <span className="text-[var(--ink)] font-medium"> No fluff. Just execution.</span>
          </p>

          <div className="mt-5 flex flex-col items-center">
            <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-3 md:-translate-y-1">
              <a href="#contact" className="btn-blue rounded-full px-6 py-3.5 text-[15px] font-medium inline-flex items-center gap-2 shadow-[0_22px_50px_-22px_rgba(0,71,255,0.55)]">
                Start Your Project <ArrowUpRight size={16} />
              </a>
              <a href="#contact" className="btn-ghost rounded-full px-6 py-3.5 text-[15px] font-medium inline-flex items-center gap-2 bg-[color:var(--surface)]/60 backdrop-blur-md">
                <Calendar size={15} /> Book a Free Call
              </a>
            </div>

            <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-3 rounded-full bg-[color:var(--surface)]/45 px-3 py-2 backdrop-blur-sm mono text-[11px] text-[var(--muted)]">
              <span className="flex -space-x-2">
                <span className="w-7 h-7 rounded-full bg-[var(--blue)] border-2 border-[var(--surface)] text-white grid place-items-center text-[10px] font-semibold">RK</span>
                <span className="w-7 h-7 rounded-full bg-[var(--ink)] border-2 border-[var(--surface)] text-white grid place-items-center text-[10px] font-semibold">PS</span>
                <span className="w-7 h-7 rounded-full bg-[#10B981] border-2 border-[var(--surface)] text-white grid place-items-center text-[10px] font-semibold">AV</span>
                <span className="w-7 h-7 rounded-full bg-[#F59E0B] border-2 border-[var(--surface)] text-white grid place-items-center text-[10px] font-semibold">+</span>
              </span>
              <span>Trusted by 40+ founders worldwide</span>
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {stats.map((s, i) => (
              <div key={s.label} className="rounded-2xl border hairline bg-[color:var(--surface)]/70 backdrop-blur-md px-4 py-5 md:px-5 md:py-6 shadow-[0_24px_60px_-40px_rgba(5,7,18,0.25)] transition-transform duration-500 ease-out hover:-translate-y-1">
                <div className="serif text-[40px] md:text-[52px] tracking-tight leading-none">
                  <span className={i % 2 === 0 ? "text-[var(--blue)]" : "text-[var(--ink)]"}>{renderStat(s)}</span>
                </div>
                <div className="mono mt-2 text-[11px] text-[var(--muted)] uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll cue */}
          <div className="mt-14 flex items-center justify-center gap-3 mono text-[11px] tracking-widest text-[var(--muted)]">
            <span className="flex-1 h-[1px] bg-[var(--line)] max-w-xs" />
            <ArrowDown size={14} className="animate-bounce text-[var(--blue)]" />
            SCROLL TO EXPLORE
            <span className="flex-1 h-[1px] bg-[var(--line)] max-w-xs" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-spin { to { transform: rotate(360deg); } }
        @keyframes hero-spin-rev { to { transform: rotate(-360deg); } }
        @keyframes hero-float { 0%,100% { transform: translateY(0) rotate(var(--r,0deg)); } 50% { transform: translateY(-12px) rotate(var(--r,0deg)); } }
      `}</style>
    </section>
  );
}
