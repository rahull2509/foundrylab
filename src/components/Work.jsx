import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../mock";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-work-row]", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={ref} className="py-24 md:py-36 bg-[var(--bg)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <div className="section-label mb-5">// 03 — OUR WORK</div>
            <h2 className="serif text-5xl md:text-7xl tracking-tight leading-[1]">
              Products We've <span className="italic-serif text-[var(--blue)]">Built</span>
            </h2>
          </div>
          <p className="max-w-sm text-[var(--muted)] text-base md:text-lg">
            Real startups, real results. Each product shipped on time, on budget.
          </p>
        </div>

        <div>
          {projects.map((p, i) => (
            <a key={p.id} href="#" data-work-row className="group block border-t hairline py-10 md:py-12 last:border-b">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-1 mono text-[12px] text-[var(--muted)]">0{i + 1}</div>
                <div className="md:col-span-3">
                  <h3 className="serif text-4xl md:text-5xl tracking-tight group-hover:text-[var(--blue)] transition-colors duration-500">
                    {p.name}
                  </h3>
                </div>
                <div className="md:col-span-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="mono text-[10px] uppercase tracking-widest border hairline rounded-full px-3 py-1 text-[var(--muted)]">{t}</span>
                  ))}
                </div>
                <div className="md:col-span-3 text-[var(--muted)] leading-relaxed text-sm">{p.desc}</div>
                <div className="md:col-span-1 flex md:justify-end">
                  <div className="w-12 h-12 rounded-full border hairline grid place-items-center group-hover:bg-[var(--blue)] group-hover:border-[var(--blue)] group-hover:text-white transition-all duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
              <div className="overflow-hidden max-h-0 group-hover:max-h-[300px] transition-[max-height] duration-700 ease-out">
                <div className="mt-6 rounded-2xl h-[260px] flex items-end justify-between p-8 relative overflow-hidden" style={{ background: `linear-gradient(135deg, var(--blue), #0033CC)` }}>
                  <div className="serif text-5xl md:text-7xl text-white/95">{p.name}</div>
                  <div className="mono text-[11px] tracking-widest text-white/80">{p.meta} →</div>
                  <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-white/10 -translate-y-24 translate-x-24" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
