import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "../mock";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      const amount = track.scrollWidth - window.innerWidth;
      if (amount <= 0) return;

      gsap.to(track, {
        x: -amount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + amount,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Heading reveal
      gsap.from("[data-process-heading]", {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="bg-[var(--bg)] text-[var(--ink)] relative overflow-hidden border-t border-b hairline">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(5,7,18,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(5,7,18,0.04) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

      <div className="relative pt-24 md:pt-32 pb-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div data-process-heading className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <div className="mono text-[12px] tracking-[0.2em] text-[var(--blue)] mb-5">// 02 — HOW WE WORK</div>
              <h2 className="serif text-5xl md:text-7xl tracking-tight leading-[1]">
                Zero to Live in <span className="italic-serif text-[var(--blue)]">5 Steps</span>
              </h2>
            </div>
            <div className="max-w-sm text-[var(--muted)] text-base md:text-lg">
              A battle-tested process refined across 40+ startups. Scroll → to see each step pinned.
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal pinned track */}
      <div className="overflow-x-auto lg:overflow-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory scroll-smooth">
        <div ref={trackRef} className="flex flex-nowrap pl-6 md:pl-10 pb-28 md:pb-36" style={{ width: "max-content", willChange: "transform" }}>
          {processSteps.map((s, i) => (
            <div key={s.num} className="shrink-0 w-[82vw] md:w-[62vw] lg:w-[52vw] pr-6 md:pr-10 snap-center">
              <div className="card p-8 md:p-14 h-[58vh] min-h-[480px] flex flex-col justify-between relative overflow-hidden shadow-sm bg-[var(--surface)] hover:shadow-md transition-shadow duration-300">
                <div className="absolute -right-24 -bottom-24 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,71,255,0.08), transparent 70%)", filter: "blur(40px)" }} />
                <div className="relative z-10 flex items-start justify-between">
                  <div className="mono text-[12px] tracking-widest text-[var(--muted)]">
                    STEP {i + 1} / {processSteps.length}
                  </div>
                  <div className="mono text-[12px] tracking-widest text-[var(--blue)] font-medium">
                    {i === 0 ? "DAY 01" : i === 1 ? "DAY 02–03" : i === 2 ? "WEEK 01" : i === 3 ? "WEEK 02–04" : "LAUNCH"}
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 step-number text-[var(--ink)] opacity-[0.03] select-none pointer-events-none z-0">
                  {s.num}
                </div>
                <div className="relative z-10">
                  <h3 className="serif text-4xl md:text-6xl mb-4 text-[var(--ink)]">{s.title}</h3>
                  <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed max-w-md">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="shrink-0 w-[20vw]" />
        </div>
      </div>
    </section>
  );
}
