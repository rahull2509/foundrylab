import React, { useEffect, useRef } from "react";

// Animated 2D dark-mode "blueprint" graphic for Why Us section.
// Orbiting nodes, animated grid pulse, code snippet, floating metric chips.
export default function WhyUsVisual() {
  const wrapRef = useRef(null);
  const parRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const par = parRef.current;
    if (!wrap || !par) return;
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      par.style.transform = `translate3d(${x * -22}px, ${y * -16}px, 0)`;
    };
    const onLeave = () => { par.style.transform = ""; };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      {/* Orbits + nodes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500" fill="none">
        <defs>
          <radialGradient id="why-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0047FF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0047FF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="why-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2F66FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#2F66FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2F66FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="250" cy="250" r="240" fill="url(#why-glow)" />

        {/* Outer dashed ring */}
        <g style={{ transformOrigin: "250px 250px", animation: "why-spin 50s linear infinite" }}>
          <circle cx="250" cy="250" r="220" stroke="rgba(47,102,255,0.3)" strokeDasharray="2 8" strokeWidth="1" />
        </g>

        {/* Mid ring with planet */}
        <g style={{ transformOrigin: "250px 250px", animation: "why-spin-rev 30s linear infinite" }}>
          <circle cx="250" cy="250" r="170" stroke="rgba(255,255,255,0.18)" strokeDasharray="1 4" />
          <circle cx="420" cy="250" r="6" fill="#2F66FF" />
          <circle cx="420" cy="250" r="14" fill="#2F66FF" opacity="0.18" />
        </g>

        {/* Inner ring with diamond */}
        <g style={{ transformOrigin: "250px 250px", animation: "why-spin 18s linear infinite" }}>
          <circle cx="250" cy="250" r="115" stroke="rgba(0,71,255,0.55)" strokeWidth="1" />
          <rect x="358" y="244" width="12" height="12" fill="#fff" transform="rotate(45 364 250)" />
        </g>

        {/* Tracer line */}
        <g style={{ transformOrigin: "250px 250px", animation: "why-spin 8s linear infinite" }}>
          <path d="M 250 250 L 250 60" stroke="url(#why-line)" strokeWidth="1.5" />
          <circle cx="250" cy="60" r="3" fill="#fff" />
        </g>
      </svg>

      <div ref={parRef} className="absolute inset-0 transition-transform duration-300 ease-out">
        {/* Center monogram */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-[var(--blue)] grid place-items-center shadow-[0_20px_60px_-10px_rgba(0,71,255,0.7)]">
          <div className="serif text-3xl text-white">F.</div>
        </div>

        {/* Floating chips */}
        <div className="absolute top-[14%] right-[8%] rounded-full bg-white/10 backdrop-blur border border-white/20 text-white px-3 py-1.5 mono text-[10px] tracking-widest" style={{ animation: "why-float 6s ease-in-out infinite" }}>
          // 99.99% UPTIME
        </div>
        <div className="absolute top-[42%] right-[2%] rounded-full bg-[var(--blue)]/20 backdrop-blur border border-[var(--blue)]/40 text-white px-3 py-1.5 mono text-[10px] tracking-widest" style={{ animation: "why-float 7s 0.6s ease-in-out infinite" }}>
          ⚡ 60ms TTFB
        </div>
        <div className="absolute bottom-[18%] right-[14%] rounded-2xl bg-white/5 backdrop-blur border border-white/15 text-white px-3 py-2 mono text-[10px] tracking-widest" style={{ animation: "why-float 5.5s 1.2s ease-in-out infinite" }}>
          <div className="text-white/50">SHIPPED</div>
          <div className="serif text-xl">3 wks</div>
        </div>
        <div className="absolute top-[68%] left-[8%] rounded-full bg-white text-[var(--ink)] px-3 py-1.5 mono text-[10px] tracking-widest font-medium" style={{ animation: "why-float 6.5s 0.8s ease-in-out infinite" }}>
          ✓ PROD-READY
        </div>
      </div>

      <style>{`
        @keyframes why-spin { to { transform: rotate(360deg); } }
        @keyframes why-spin-rev { to { transform: rotate(-360deg); } }
        @keyframes why-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      `}</style>
    </div>
  );
}
