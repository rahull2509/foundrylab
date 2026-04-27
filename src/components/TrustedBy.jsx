import React from "react";
import { trustedLogos } from "../mock";

export default function TrustedBy() {
  const loop = [...trustedLogos, ...trustedLogos];
  return (
    <section className="py-14 md:py-16 border-y hairline bg-white">
      <p className="text-center mono text-[11px] tracking-[0.3em] text-[var(--muted)] mb-8">
        TRUSTED BY EARLY-STAGE FOUNDERS
      </p>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="marquee-track flex gap-14 w-max">
          {loop.map((l, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-2">
              <span className="text-2xl text-[var(--ink)]/60">{l.symbol}</span>
              <span className="serif text-2xl md:text-3xl text-[var(--ink)]/90">{l.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
