import React, { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Moon, Sun } from "lucide-react";
import { navLinks } from "../mock";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolvedTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(resolvedTheme);
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, []);

  useEffect(() => {
    if (!theme) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="px-4 md:px-6 pt-4">
        <div
          className={`mx-auto max-w-[1400px] flex items-center justify-between rounded-full border hairline px-4 md:px-5 py-2.5 transition-all duration-500 ${
            scrolled
              ? "bg-[color:var(--surface)]/95 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(5,7,18,0.22)]"
              : "bg-[color:var(--surface)]/70 backdrop-blur-md"
          }`}
        >
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--ink)] grid place-items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[var(--blue)] origin-left scale-x-0 hover:scale-x-100 transition-transform duration-500" />
              <span className="relative text-white text-sm font-bold">F.</span>
            </div>
            <span className="serif text-xl md:text-2xl tracking-tight">FoundryLab</span>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="link-underline text-sm text-[var(--ink)]/80 hover:text-[var(--ink)]">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border hairline text-[var(--ink)] hover:bg-[color:var(--bg-2)] transition-colors"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="hidden md:flex items-center gap-2 mono text-[11px] text-[var(--muted)] px-3">
              <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
              AVAILABLE Q3
            </div>
            <a href="#contact" className="hidden md:inline-flex items-center gap-2 btn-blue rounded-full px-4 py-2 text-sm">
              Start Project <ArrowUpRight size={16} />
            </a>
            <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 mt-2">
          <div className="mx-auto max-w-7xl rounded-3xl border hairline bg-[color:var(--surface)]/95 backdrop-blur-xl p-6 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-lg">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn-blue rounded-full px-4 py-3 text-sm inline-flex items-center justify-center gap-2">
              Start Project <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
