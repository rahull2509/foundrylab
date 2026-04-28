import React, { useEffect, useState } from "react";
import { Phone, ArrowUpRight } from "lucide-react";

export default function FloatingCTA() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <div className="fixed left-6 bottom-6 z-40 flex items-center gap-3">
      <a
        href="https://wa.me/917830241468"
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="group flex items-center gap-3 rounded-full bg-[var(--ink)] text-white pl-2 pr-5 py-2 shadow-[0_18px_40px_-12px_rgba(5,7,18,0.5)] hover:bg-[var(--blue)] transition-colors"
      >
        <span className="w-9 h-9 rounded-full bg-[var(--blue)] group-hover:bg-white grid place-items-center transition-colors">
          <Phone size={16} className="text-white group-hover:text-[var(--blue)] transition-colors" />
        </span>
        <span className="flex flex-col items-start">
          <span className="mono text-[9px] tracking-widest text-white/60 group-hover:text-white/80">DIRECT HANDOFF</span>
          <span className="text-sm font-medium">WhatsApp the team</span>
        </span>
        <ArrowUpRight size={16} className={`transition-transform duration-300 ${open ? "translate-x-1 -translate-y-1" : ""}`} />
      </a>
    </div>
  );
}
