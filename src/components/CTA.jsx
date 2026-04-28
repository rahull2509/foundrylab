import React, { useState } from "react";
import { ArrowUpRight, Calendar, MessageCircleMore, Phone } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import CTAVisual from "./CTAVisual";

export default function CTA() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    toast({ title: "Thanks — we'll be in touch", description: `Email received: ${email}. Expect a reply within 24h.` });
    setEmail("");
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-[var(--bg)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="relative rounded-[32px] bg-[var(--blue)] text-white overflow-hidden p-10 md:p-20 shadow-[0_40px_100px_-30px_rgba(0,71,255,0.55)]">
          <div className="absolute inset-0 opacity-[0.18] pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute right-0 top-0 bottom-0 w-[44%] opacity-95 pointer-events-none hidden md:block">
            <CTAVisual />
          </div>

          <div className="relative z-[2] max-w-2xl">
            <div className="mono text-[12px] tracking-[0.2em] text-white/80 mb-5">// 07 — LET'S TALK</div>
            <h2 className="serif text-5xl md:text-7xl tracking-tight leading-[1]">
              Let's Build Your <span className="italic-serif">Startup</span>
            </h2>
            <p className="mt-6 max-w-lg text-white/85 text-lg leading-relaxed">
              Ready to turn your idea into a live product? Book a free 30-min call and let's map out your path to launch.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/90">
              <a href="tel:+917830241468" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 hover:bg-white/10 transition-colors">
                <Phone size={15} /> +91 78302 41468
              </a>
              <a href="https://wa.me/917830241468" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 hover:bg-white/10 transition-colors">
                <MessageCircleMore size={15} /> WhatsApp
              </a>
            </div>

            <form onSubmit={submit} className="mt-8 max-w-xl flex flex-col sm:flex-row gap-3">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
                className="flex-1 rounded-full bg-white/10 border border-white/30 text-white placeholder:text-white/60 px-5 py-4 outline-none focus:border-white focus:bg-white/15 transition-colors" />
              <button type="submit" className="rounded-full bg-white text-[var(--blue)] px-6 py-4 font-medium inline-flex items-center justify-center gap-2 hover:bg-[var(--ink)] hover:text-white transition-colors">
                Start Your Project <ArrowUpRight size={18} />
              </button>
            </form>
            <a href="tel:+917830241468" className="mt-3 inline-flex items-center gap-2 text-white/85 hover:text-white transition-colors text-sm">
              <Calendar size={16} /> Or call Keshav directly →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
