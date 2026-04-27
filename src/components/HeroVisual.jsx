import React, { useEffect, useRef, useState } from "react";

// PREMIUM hero visual — multi-layer product showcase:
// - Background: code editor card
// - Middle: live dashboard mockup with real-time counter + animated bars
// - Foreground: phone preview, deploy snippet, status pill, "shipped 3wks" badge
// - Orbital rings + glow + mouse-tilt parallax + scroll-aware reveal
export default function HeroVisual() {
  const wrapRef = useRef(null);
  const parRef = useRef(null);
  const [count, setCount] = useState(12847);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + Math.floor(Math.random() * 7) + 1), 1600);
    const id2 = setInterval(() => setTab((t) => (t + 1) % 3), 2400);
    return () => { clearInterval(id); clearInterval(id2); };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const par = parRef.current;
    if (!wrap || !par) return;
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      par.style.transform = `translate3d(${x * -22}px, ${y * -16}px, 0) rotateX(${y * 5}deg) rotateY(${x * -7}deg)`;
    };
    const onLeave = () => { par.style.transform = ""; };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const tabs = ["Overview", "Users", "Revenue"];

  return (
    <div ref={wrapRef} className="relative w-full h-full" style={{ perspective: "1500px" }}>
      {/* Glow + orbital rings */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600" fill="none">
        <defs>
          <radialGradient id="hv-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0047FF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0047FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="600" height="600" fill="url(#hv-glow)" />
        <g style={{ transformOrigin: "300px 300px", animation: "hv-spin 60s linear infinite" }}>
          <circle cx="300" cy="300" r="290" stroke="rgba(5,7,18,0.07)" strokeDasharray="2 8" />
        </g>
        <g style={{ transformOrigin: "300px 300px", animation: "hv-spin-rev 40s linear infinite" }}>
          <circle cx="300" cy="300" r="225" stroke="rgba(0,71,255,0.22)" strokeDasharray="1 4" />
          <circle cx="525" cy="300" r="5" fill="#0047FF" />
        </g>
        <g style={{ transformOrigin: "300px 300px", animation: "hv-spin 22s linear infinite" }}>
          <circle cx="300" cy="300" r="170" stroke="rgba(5,7,18,0.10)" />
        </g>
      </svg>

      <div ref={parRef} className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transformStyle: "preserve-3d" }}>
        {/* === BACK LAYER: Code editor === */}
        <div className="absolute left-[8%] top-[6%] w-[55%] rounded-xl bg-[#0B1022] border border-white/5 shadow-[0_30px_60px_-20px_rgba(5,7,18,0.4)] overflow-hidden" style={{ transform: "translateZ(-20px) rotate(-5deg)" }}>
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#070B19] border-b border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
            <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
            <span className="ml-2 mono text-[8px] text-white/40 tracking-widest">app.tsx</span>
          </div>
          <pre className="mono text-[9px] leading-[1.55] p-3 text-white/80">
            <code>
              <span className="text-[#9CA3FF]">import</span> {"{"} <span className="text-[#7DD3FC]">FoundryLab</span> {"}"} <span className="text-[#9CA3FF]">from</span> <span className="text-[#86EFAC]">"@foundry/core"</span><br />
              <span className="text-white/40">// MVP shipped in 3 weeks</span><br />
              <span className="text-[#9CA3FF]">const</span> app = <span className="text-[#FBBF24]">await</span> FoundryLab.<span className="text-[#7DD3FC]">launch</span>({"{"}<br />
              {"  "}name: <span className="text-[#86EFAC]">"YourStartup"</span>,<br />
              {"  "}stack: [<span className="text-[#86EFAC]">"next"</span>, <span className="text-[#86EFAC]">"node"</span>],<br />
              {"  "}deploy: <span className="text-[#FBBF24]">true</span><br />
              {"}"});<br />
              <span className="text-[#10B981]">✓ Deployed in 14s</span>
            </code>
          </pre>
        </div>

        {/* === MAIN: Browser dashboard === */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[460px] rounded-2xl bg-[var(--ink)] shadow-[0_50px_100px_-20px_rgba(5,7,18,0.5)] overflow-hidden border border-[#1a2040]" style={{ transform: "translateZ(50px)" }}>
          <div className="flex items-center gap-1.5 px-4 py-3 bg-[#0B1022] border-b border-white/5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            <span className="ml-3 mono text-[10px] text-white/55">app.foundrylab.dev</span>
            <span className="ml-auto mono text-[10px] text-[#4ADE80] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] pulse-dot" /> LIVE
            </span>
          </div>
          {/* Tabs */}
          <div className="flex border-b border-white/5">
            {tabs.map((t, i) => (
              <div key={t} className={`flex-1 mono text-[9px] tracking-widest text-center py-2.5 transition-colors ${i === tab ? "text-white border-b-2 border-[var(--blue)]" : "text-white/45"}`}>
                {t.toUpperCase()}
              </div>
            ))}
          </div>
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="mono text-[9px] text-white/45 tracking-widest">ACTIVE USERS — LIVE</div>
                <div className="serif text-[34px] leading-none text-white mt-1.5 tabular-nums">{count.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="mono text-[10px] text-[#4ADE80] bg-[#4ADE80]/10 rounded-full px-2 py-1">+23.4%</div>
                <div className="mono text-[9px] text-white/45 mt-2">vs last week</div>
              </div>
            </div>
            <div className="flex items-end gap-1.5 h-24">
              {[40, 62, 48, 75, 55, 82, 68, 95, 72, 88, 78, 100].map((h, i) => (
                <div key={i} className="flex-1 rounded-t relative overflow-hidden" style={{ height: `${h}%`, background: `linear-gradient(to top, #0047FF, #2F66FF)`, animation: `hv-grow 2.2s ${i * 0.05}s ease-out both` }}>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/20 to-transparent" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[["MRR", "₹4.2L"], ["NPS", "72"], ["CHURN", "0.8%"]].map(([k, v], i) => (
                <div key={i} className="rounded-lg border border-white/10 p-2.5 bg-white/[0.02]">
                  <div className="mono text-[8px] text-white/40 tracking-widest">{k}</div>
                  <div className="text-white text-sm mt-0.5 font-medium">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === Phone mockup (right) === */}
        <div className="absolute right-[2%] bottom-[6%] w-[110px] h-[210px] rounded-[26px] bg-[#0B1022] border border-white/10 shadow-[0_30px_60px_-16px_rgba(5,7,18,0.45)] overflow-hidden" style={{ transform: "translateZ(75px) rotate(8deg)", animation: "hv-float 6s 0.4s ease-in-out infinite" }}>
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-3 bg-black rounded-full" />
          <div className="p-3 pt-6 space-y-2">
            <div className="mono text-[7px] text-white/40 tracking-widest">FOUNDRY APP</div>
            <div className="rounded-lg bg-[var(--blue)] p-2">
              <div className="text-white text-[8px] mono">LIVE • 1.2k</div>
              <div className="serif text-white text-lg leading-none mt-1">+23%</div>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 rounded bg-white/15 w-full" />
              <div className="h-1.5 rounded bg-white/15 w-2/3" />
              <div className="h-1.5 rounded bg-[var(--blue)]/70 w-4/5" />
            </div>
            <div className="rounded-lg border border-white/10 p-1.5">
              <div className="mono text-[6px] text-white/40">REVENUE</div>
              <div className="text-white text-[10px] mt-0.5">₹4.2L</div>
            </div>
          </div>
        </div>

        {/* Floating: deploy snippet */}
        <div className="absolute top-[2%] right-[2%] w-[180px] rounded-xl bg-white border hairline shadow-[0_24px_50px_-16px_rgba(5,7,18,0.25)] p-3" style={{ transform: "translateZ(90px) rotate(6deg)", animation: "hv-float 6s ease-in-out infinite" }}>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
            <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
            <span className="ml-1 mono text-[8px] text-[var(--muted)] tracking-widest">DEPLOY.SH</span>
          </div>
          <div className="mono text-[10px] space-y-1 text-[var(--ink)]/85">
            <div><span className="text-[var(--blue)]">$</span> vercel --prod</div>
            <div className="text-[#10B981]">✓ Deployed in 14s</div>
            <div className="text-[var(--muted)]">→ live.foundrylab.dev</div>
          </div>
        </div>

        {/* Floating: status pill */}
        <div className="absolute bottom-[14%] left-[2%] rounded-full bg-[var(--ink)] text-white px-4 py-2.5 shadow-[0_24px_50px_-16px_rgba(5,7,18,0.35)] flex items-center gap-2" style={{ transform: "translateZ(70px) rotate(-4deg)", animation: "hv-float 7s 0.5s ease-in-out infinite" }}>
          <span className="w-2 h-2 rounded-full bg-[#4ADE80] pulse-dot" />
          <span className="mono text-[10px] tracking-widest">MVP — SHIPPED</span>
        </div>

        {/* Floating: shipping badge */}
        <div className="absolute top-[42%] left-[-3%] w-[140px] rounded-2xl bg-[var(--blue)] text-white p-3.5 shadow-[0_24px_50px_-16px_rgba(0,71,255,0.55)]" style={{ transform: "translateZ(100px) rotate(-8deg)", animation: "hv-float 5.5s 1s ease-in-out infinite" }}>
          <div className="mono text-[9px] text-white/80 tracking-widest">SHIPPED IN</div>
          <div className="serif text-3xl leading-none mt-1">3 wks</div>
          <div className="mono text-[9px] text-white/80 mt-1.5">idea → live</div>
        </div>
      </div>

      <style>{`
        @keyframes hv-spin { to { transform: rotate(360deg); } }
        @keyframes hv-spin-rev { to { transform: rotate(-360deg); } }
        @keyframes hv-float { 0%,100% { transform: translateY(0) translateZ(80px) rotate(var(--r,0deg)); } 50% { transform: translateY(-12px) translateZ(80px) rotate(var(--r,0deg)); } }
        @keyframes hv-grow { from { height: 0; opacity: 0.3; } }
      `}</style>
    </div>
  );
}
