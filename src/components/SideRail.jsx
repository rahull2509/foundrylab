import React, { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "work", label: "Work" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

export default function SideRail() {
  const [active, setActive] = useState("hero");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sh = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(sh > 0 ? Math.min(1, window.scrollY / sh) : 0);
      let current = "hero";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 items-end">
      <div className="mono text-[10px] tabular-nums text-[var(--muted)] tracking-widest mb-2">
        {String(Math.round(progress * 100)).padStart(2, "0")} / 100
      </div>
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group flex items-center gap-3 cursor-pointer"
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity mono text-[11px] tracking-widest text-[var(--ink)]">
            {s.label}
          </span>
          <span
            className={`block h-[2px] transition-all duration-500 ${
              active === s.id ? "w-8 bg-[var(--blue)]" : "w-4 bg-[var(--ink)]/30 group-hover:bg-[var(--ink)]/60"
            }`}
          />
        </a>
      ))}
    </div>
  );
}
