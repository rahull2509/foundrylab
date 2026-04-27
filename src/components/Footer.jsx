import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, ArrowUpRight } from "lucide-react";
import { footerLinks } from "../mock";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-footer-mark] span", {
        y: 120, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.04,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const brand = "FoundryLab".split("");

  return (
    <footer ref={ref} className="bg-[var(--ink)] text-[var(--bg)] pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 relative z-[2]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[var(--blue)] grid place-items-center">
                <span className="text-white text-xs font-bold">F.</span>
              </div>
              <span className="serif text-2xl">FoundryLab</span>
            </div>
            <p className="text-[var(--bg)]/60 max-w-sm leading-relaxed">
              We turn startup ideas into live products. Fast, clean, and built to scale.
            </p>
            <a href="mailto:contact@foundrylab.com" className="inline-flex items-center gap-2 mt-6 text-[var(--bg)]/80 hover:text-[var(--blue-2)]">
              <Mail size={16} /> contact@foundrylab.com
            </a>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="md:col-span-2">
              <h4 className="mono text-[11px] uppercase tracking-[0.25em] text-[var(--blue-2)] mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[var(--bg)]/80 hover:text-white inline-flex items-center gap-1.5 link-underline text-sm">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[var(--blue)] text-white px-4 py-2.5 text-sm hover:bg-white hover:text-[var(--blue)] transition-colors">
              Hire Us <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div data-footer-mark className="border-t border-white/10 pt-10 overflow-hidden">
          <div className="serif text-[18vw] md:text-[16vw] leading-[0.85] tracking-tighter text-white/95 select-none whitespace-nowrap">
            {brand.map((c, i) => (
              <span key={i} className="inline-block">{c}</span>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 mono text-[11px] text-[var(--bg)]/40">
          <div>© 2026 FOUNDRYLAB. BUILT WITH <span className="italic-serif text-[var(--blue-2)] not-italic">OBSESSION</span>.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">PRIVACY</a>
            <a href="#" className="hover:text-white">TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
