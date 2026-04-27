import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Layers3, Target, ShieldCheck } from "lucide-react";
import { whyUs } from "../mock";
import WhyUsVisual from "./WhyUsVisual";

gsap.registerPlugin(ScrollTrigger);
const ICONS = { Zap, Layers3, Target, ShieldCheck };

export default function WhyUs() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-why-card]", {
        y: 60, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      gsap.from("[data-why-heading]", {
        y: 50, opacity: 0, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-36 bg-[var(--ink)] text-[var(--bg)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-95 pointer-events-none hidden md:block">
        <WhyUsVisual />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-8 relative z-[2]">
        <div data-why-heading className="mb-16 max-w-2xl">
          <div className="mono text-[12px] tracking-[0.2em] text-[var(--blue-2)] mb-5">// 04 — WHY FOUNDRYLAB</div>
          <h2 className="serif text-5xl md:text-7xl tracking-tight leading-[1]">
            We're Not an Agency.<br /> We're Your <span className="italic-serif text-[var(--blue-2)]">Co-Founders</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
          {whyUs.map((w, i) => {
            const Icon = ICONS[w.icon] || Zap;
            return (
              <div key={w.title} data-why-card className="rounded-3xl border border-[#1f2340] p-8 hover:border-[var(--blue)] transition-colors duration-500 bg-[#080B1A]/80 backdrop-blur">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[var(--blue)] grid place-items-center shadow-[0_8px_24px_-6px_rgba(0,71,255,0.7)]">
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="mono text-[11px] text-white/40">0{i + 1}</div>
                </div>
                <h3 className="serif text-2xl md:text-3xl mb-3 text-white">{w.title}</h3>
                <p className="text-white/70 leading-relaxed text-sm">{w.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
