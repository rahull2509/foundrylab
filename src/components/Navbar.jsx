import React, { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks } from "../mock";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="px-4 md:px-6 pt-4">
        <div
          className={`mx-auto max-w-[1400px] flex items-center justify-between rounded-full border hairline px-4 md:px-5 py-2.5 md:grid md:grid-cols-[auto_1fr_auto] md:gap-6 transition-all duration-500 ${
            scrolled
              ? "bg-[color:var(--surface)]/95 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(5,7,18,0.22)]"
              : "bg-[color:var(--surface)]/70 backdrop-blur-md"
          }`}
        >
          <a href="#" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[var(--ink)] grid place-items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[var(--blue)] origin-left scale-x-0 hover:scale-x-100 transition-transform duration-500" />
              <span className="relative text-white text-sm font-bold">F.</span>
            </div>
            <span className="serif text-xl md:text-2xl tracking-tight">FoundryLab</span>
          </a>

          <nav className="hidden md:flex items-center justify-center gap-7">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="link-underline text-sm text-[var(--ink)]/80 hover:text-[var(--ink)]">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0 md:justify-self-end">
            <div className="hidden md:flex items-center gap-2 mono text-[11px] text-[var(--muted)] px-3">
              <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
              AVAILABLE Q3
            </div>
            <a href="#contact" className="hidden md:inline-flex items-center gap-2 btn-blue rounded-full px-4 py-2 text-sm whitespace-nowrap">
              Start Project <ArrowUpRight size={16} />
            </a>
            <button 
              className={`md:hidden p-2 z-[60] transition-colors ${open ? "text-[var(--ink)]" : "text-[var(--ink)]"}`} 
              onClick={() => setOpen(!open)} 
              aria-label="Menu"
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-[color:var(--surface)]/98 backdrop-blur-2xl transition-all duration-500 flex flex-col pt-28 px-6 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((l, i) => (
            <a 
              key={l.label} 
              href={l.href} 
              onClick={() => setOpen(false)} 
              className={`text-2xl font-medium text-[var(--ink)] py-4 border-b hairline flex items-center justify-between transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${i * 100 + 100}ms` : '0ms' }}
            >
              {l.label}
              <ArrowUpRight size={20} className="text-[var(--muted)]" />
            </a>
          ))}
        </div>
        
        <div 
          className={`mt-10 transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: open ? `${navLinks.length * 100 + 100}ms` : '0ms' }}
        >
          <a 
            href="#contact" 
            onClick={() => setOpen(false)}
            className="btn-blue w-full rounded-full px-6 py-4 text-base inline-flex items-center justify-center gap-2"
          >
            Start Project <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}
