import React, { useEffect, useState, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on desktop devices (non-coarse pointer and screen width > 1024px)
    const checkDevice = () => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const isMobileWidth = window.matchMedia("(max-width: 1024px)").matches;
      setEnabled(!isCoarse && !isMobileWidth);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot) {
        dot.style.left = mx + "px";
        dot.style.top = my + "px";
      }
    };
    const loop = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ring) {
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
      }
      requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    const rafId = requestAnimationFrame(loop);

    const onEnter = () => {
      dot?.classList.add("hover");
      ring?.classList.add("hover");
    };
    const onLeave = () => {
      dot?.classList.remove("hover");
      ring?.classList.remove("hover");
    };
    
    const targets = () => document.querySelectorAll("a, button, [data-cursor]");
    const bind = () => {
      targets().forEach((el) => {
        // Prevent duplicate event listeners
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    bind();
    const observer = new MutationObserver(bind);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      // Clean up event listeners from targets if still in DOM
      targets().forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
