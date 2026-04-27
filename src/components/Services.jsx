import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, Layers, Palette, Compass, ArrowUpRight } from "lucide-react";
import { services } from "../mock";

gsap.registerPlugin(ScrollTrigger);
const ICONS = { Rocket, Layers, Palette, Compass };

export default function Services() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-service-card]", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      gsap.from("[data-services-heading]", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={ref} className="py-24 md:py-36 bg-[var(--bg)] relative noise">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div data-services-heading>
            <div className="section-label mb-5">// 01 — WHAT WE DO</div>
            <h2 className="serif text-5xl md:text-7xl tracking-tight leading-[1]">
              Built for Founders<br /> Who <span className="italic-serif text-[var(--blue)]">Move Fast</span>
            </h2>
          </div>
          <p className="max-w-sm text-[var(--muted)] text-base md:text-lg leading-relaxed">
            We cover every angle of your product — from a single-page idea to a funded SaaS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] || Rocket;
            const isDark = s.badge === "Most Popular";
            return (
              <div key={s.id} data-service-card className={`${isDark ? "card-dark" : "card"} p-8 md:p-10 relative group overflow-hidden`}>
                <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full transition-transform duration-700 ${isDark ? "bg-[var(--blue)]/20" : "bg-[var(--blue)]/5"} group-hover:scale-150`} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-14 h-14 rounded-xl grid place-items-center ${isDark ? "bg-[var(--blue)]" : "bg-[var(--ink)]"}`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    {s.badge && (
                      <span className="mono text-[10px] uppercase tracking-widest bg-[var(--blue)] text-white rounded-full px-3 py-1">
                        {s.badge}
                      </span>
                    )}
                    <div className={`mono text-[11px] ${isDark ? "text-[var(--bg)]/50" : "text-[var(--muted)]"}`}>0{s.id}</div>
                  </div>
                  <h3 className={`serif text-3xl md:text-4xl mb-3 ${isDark ? "text-[var(--bg)]" : "text-[var(--ink)]"}`}>
                    {s.title}
                  </h3>
                  <p className={`${isDark ? "text-[var(--bg)]/70" : "text-[var(--muted)]"} leading-relaxed max-w-md`}>
                    {s.desc}
                  </p>
                  <div className="mt-10 flex items-center justify-between">
                    <a href="#contact" className={`inline-flex items-center gap-2 text-sm ${isDark ? "text-[var(--bg)]" : "text-[var(--ink)]"}`}>
                      <span className="link-underline">Learn more</span>
                      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
