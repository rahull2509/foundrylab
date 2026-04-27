import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "../mock";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const prev = () => setI((v) => (v - 1 + testimonials.length) % testimonials.length);
  const next = () => setI((v) => (v + 1) % testimonials.length);
  const t = testimonials[i];

  return (
    <section className="py-24 md:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <div className="section-label mb-5">// 06 — FOUNDER STORIES</div>
          <h2 className="serif text-5xl md:text-7xl tracking-tight leading-[1]">
            Built With Trust,<br /> Remembered by <span className="italic-serif text-[var(--blue)]">Results</span>
          </h2>
        </div>

        <div className="relative">
          <Quote size={100} className="absolute -top-6 left-0 text-[var(--blue)]/10" />
          <div className="min-h-[340px] flex flex-col justify-center">
            <div key={i} className="text-center px-4 animate-[fadeIn_0.6s_ease]">
              <p className="serif text-3xl md:text-5xl leading-[1.15] tracking-tight text-[var(--ink)] max-w-4xl mx-auto">
                “{t.quote}”
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--blue)] text-white grid place-items-center text-sm font-semibold">
                  {t.initials}
                </div>
                <div className="text-left">
                  <div className="text-[var(--ink)] font-medium">{t.name}</div>
                  <div className="text-[var(--muted)] text-sm">{t.role}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-12">
            <button onClick={prev} aria-label="Previous" className="w-12 h-12 rounded-full border hairline grid place-items-center hover:bg-[var(--blue)] hover:border-[var(--blue)] hover:text-white transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-[var(--blue)]" : "w-1.5 bg-[var(--ink)]/20"}`} />
              ))}
            </div>
            <button onClick={next} aria-label="Next" className="w-12 h-12 rounded-full border hairline grid place-items-center hover:bg-[var(--blue)] hover:border-[var(--blue)] hover:text-white transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
