import React from "react";

export default function Marquee({ items, dark = false, big = false }) {
  const list = [...items, ...items, ...items];
  return (
    <section className={`relative overflow-hidden border-y hairline ${dark ? "bg-[var(--ink)] text-[var(--bg)]" : "bg-[var(--bg)] text-[var(--ink)]"}`}>
      <div className="marquee-track flex gap-12 py-7 whitespace-nowrap w-max">
        {list.map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className={`serif tracking-tight ${big ? "text-6xl md:text-[120px] leading-none" : "text-3xl md:text-5xl"}`}>
              {item}
            </span>
            <span className={`${big ? "text-3xl md:text-5xl" : "text-xl"} text-[var(--blue)]`}>✱</span>
          </div>
        ))}
      </div>
    </section>
  );
}
