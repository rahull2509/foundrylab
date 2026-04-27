import React, { useEffect, useState } from "react";

// Animated 2D composition for CTA section right side.
// Concentric orbits + rotating diamond + floating lifecycle pills.
export default function CTAVisual() {
  const [step, setStep] = useState(0);
  const steps = ["IDEA", "BUILD", "SHIP", "SCALE"];

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % steps.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500" fill="none">
        <defs>
          <pattern id="cta-dot" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.25)" />
          </pattern>
          <linearGradient id="cta-tracer" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="500" height="500" fill="url(#cta-dot)" />

        {/* Outer ring */}
        <g style={{ transformOrigin: "250px 250px", animation: "cta-spin 28s linear infinite" }}>
          <circle cx="250" cy="250" r="210" stroke="rgba(255,255,255,0.22)" strokeDasharray="2 6" />
          <circle cx="460" cy="250" r="6" fill="#fff" />
          <circle cx="460" cy="250" r="14" fill="#fff" opacity="0.18" />
        </g>
        {/* Mid ring with square */}
        <g style={{ transformOrigin: "250px 250px", animation: "cta-spin-rev 36s linear infinite" }}>
          <circle cx="250" cy="250" r="155" stroke="rgba(255,255,255,0.32)" />
          <rect x="395" y="245" width="10" height="10" fill="#fff" />
        </g>
        {/* Inner ring with dashed */}
        <g style={{ transformOrigin: "250px 250px", animation: "cta-spin 18s linear infinite" }}>
          <circle cx="250" cy="250" r="100" stroke="rgba(255,255,255,0.55)" strokeDasharray="4 4" />
        </g>
        {/* Tracer */}
        <g style={{ transformOrigin: "250px 250px", animation: "cta-spin 6s linear infinite" }}>
          <path d="M 250 250 L 250 50" stroke="url(#cta-tracer)" strokeWidth="1.5" />
          <circle cx="250" cy="50" r="3" fill="#fff" />
        </g>

        {/* Center diamond (pulses) */}
        <g style={{ transformOrigin: "250px 250px", animation: "cta-spin 12s linear infinite" }}>
          <rect x="220" y="220" width="60" height="60" fill="#fff" transform="rotate(45 250 250)" />
          <rect x="232" y="232" width="36" height="36" fill="#0047FF" transform="rotate(45 250 250)" />
        </g>
      </svg>

      {/* Center current-step pill */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-[150px] rounded-full bg-white text-[var(--blue)] px-4 py-1.5 mono text-[11px] tracking-widest font-semibold shadow-[0_10px_30px_-8px_rgba(0,0,0,0.3)]">
        {steps[step]}
      </div>

      {/* Floating pills */}
      <div className="absolute top-[12%] right-[10%] rounded-full bg-white/10 backdrop-blur border border-white/25 text-white px-3 py-1.5 mono text-[10px] tracking-widest" style={{ animation: "cta-float 6s ease-in-out infinite" }}>
        // IDEA → MVP
      </div>
      <div className="absolute bottom-[18%] right-[6%] rounded-full bg-white/15 backdrop-blur border border-white/30 text-white px-3 py-1.5 mono text-[10px] tracking-widest" style={{ animation: "cta-float 7s 1s ease-in-out infinite" }}>
        // 3 WEEKS
      </div>
      <div className="absolute top-[60%] left-[6%] rounded-2xl bg-white/10 backdrop-blur border border-white/25 text-white p-3 mono text-[10px] tracking-widest" style={{ animation: "cta-float 5.5s 0.6s ease-in-out infinite" }}>
        <div className="text-white/60">DAILY UPDATES</div>
        <div className="serif text-2xl text-white leading-none mt-1">✓</div>
      </div>
      <div className="absolute top-[12%] left-[8%] rounded-full bg-white text-[var(--blue)] px-3 py-1.5 mono text-[10px] tracking-widest font-medium" style={{ animation: "cta-float 6.5s 0.4s ease-in-out infinite" }}>
        ⚡ 60ms
      </div>

      <style>{`
        @keyframes cta-spin { to { transform: rotate(360deg); } }
        @keyframes cta-spin-rev { to { transform: rotate(-360deg); } }
        @keyframes cta-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
      `}</style>
    </div>
  );
}
