import React, { useEffect, useState } from "react";

export default function Loader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 350);
      }
      setProgress(Math.floor(p));
    }, 110);
    return () => clearInterval(id);
  }, []);

  if (done) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-[var(--ink)] text-[var(--bg)] flex items-center justify-center transition-opacity duration-500" style={{ opacity: progress >= 100 ? 0 : 1, pointerEvents: progress >= 100 ? "none" : "auto" }}>
      <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="flex items-end justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--blue)] grid place-items-center">
              <span className="text-white text-base font-bold">F.</span>
            </div>
            <div className="serif text-3xl md:text-4xl">FoundryLab</div>
          </div>
          <div className="mono text-xs md:text-sm text-white/60 tracking-widest">
            // INITIALIZING_SYSTEM
          </div>
        </div>

        <div className="serif text-5xl md:text-7xl leading-[0.95] tracking-tight max-w-3xl">
          We turn ideas into <span className="italic-serif text-[var(--blue-2)]">live products</span>.
        </div>

        <div className="mt-14 flex items-center gap-5">
          <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
            <div className="absolute left-0 top-0 bottom-0 bg-[var(--blue)] transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
          </div>
          <div className="mono text-sm md:text-base text-white tabular-nums w-12 text-right">{progress}%</div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 mono text-[11px] tracking-widest text-white/40">
          <div className={progress > 20 ? "text-[var(--blue-2)]" : ""}>• BOOTING</div>
          <div className={progress > 45 ? "text-[var(--blue-2)]" : ""}>• LOADING ASSETS</div>
          <div className={progress > 70 ? "text-[var(--blue-2)]" : ""}>• PRELOADING SCENES</div>
          <div className={progress > 95 ? "text-[var(--blue-2)]" : ""}>• READY</div>
        </div>
      </div>
    </div>
  );
}
