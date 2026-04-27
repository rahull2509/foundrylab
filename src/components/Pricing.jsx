import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowUpRight } from "lucide-react";
import { pricing } from "../mock";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-price-card]", {
        y: 80, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      gsap.from("[data-price-heading]", {
        y: 40, opacity: 0, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={ref} className="py-24 md:py-36 bg-[var(--bg)] relative noise">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div data-price-heading className="text-center mb-16 max-w-2xl mx-auto">
          <div className="section-label mb-5">// 05 — PRICING</div>
          <h2 className="serif text-5xl md:text-7xl tracking-tight leading-[1]">
            Transparent, <span className="italic-serif text-[var(--blue)]">Founder-Friendly</span>
          </h2>
          <p className="mt-6 text-[var(--muted)] text-lg">
            No retainers. No hidden costs. Pay for what you need, when you need it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pricing.map((p) => (
            <div key={p.name} data-price-card className={`${p.popular ? "card-blue scale-[1.02] shadow-[0_30px_80px_-20px_rgba(0,71,255,0.45)]" : "card"} p-8 md:p-10 flex flex-col relative overflow-hidden`}>
              {p.popular && (
                <div className="absolute top-0 right-0 mono text-[10px] uppercase tracking-widest bg-white text-[var(--blue)] rounded-bl-2xl px-4 py-1.5">
                  Most Popular
                </div>
              )}
              <h3 className={`serif text-3xl md:text-4xl mb-2 ${p.popular ? "text-white" : "text-[var(--ink)]"}`}>
                {p.name}
              </h3>
              <div className={`serif text-4xl md:text-5xl mb-4 ${p.popular ? "text-white" : "text-[var(--ink)]"}`}>
                {p.price}
              </div>
              <p className={`mb-8 text-sm leading-relaxed ${p.popular ? "text-white/80" : "text-[var(--muted)]"}`}>
                {p.tagline}
              </p>
              <ul className="flex-1 space-y-3 mb-10">
                {p.features.map((f) => (
                  <li key={f} className={`flex items-start gap-3 text-sm ${p.popular ? "text-white/90" : "text-[var(--ink)]/80"}`}>
                    <Check size={16} className="mt-0.5 flex-none" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm transition-all ${p.popular ? "bg-white text-[var(--blue)] hover:bg-[var(--ink)] hover:text-white" : "btn-dark"}`}>
                {p.cta} <ArrowUpRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
