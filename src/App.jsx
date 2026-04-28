import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import SideRail from "./components/SideRail";
import FloatingCTA from "./components/FloatingCTA";
import Marquee from "./components/Marquee";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustedBy from "./components/TrustedBy";
import Services from "./components/Services";
import Process from "./components/Process";
import Work from "./components/Work";
import WhyUs from "./components/WhyUs";
import AIDesk from "./components/AIDesk";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";

function Home() {
  useEffect(() => {
    const isMobileLike = window.matchMedia("(max-width: 1024px), (pointer: coarse)").matches;
    let lenis = null;
    let rafId = 0;

    if (!isMobileLike) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      window.lenis = lenis;
    }

    // Suppress R3F dev __source-prop noise from CRA overlay
    const removeOverlay = () => {
      document.querySelectorAll("iframe").forEach((f) => {
        if (f.id && f.id.includes("webpack-dev-server-client-overlay")) f.remove();
      });
    };
    const patterns = [/x-line-number/i, /Cannot set "x-/i, /Cannot convert undefined or null to object/i];
    const onError = (e) => {
      const msg = e?.message || e?.reason?.message || "";
      if (patterns.some((p) => p.test(msg))) {
        e.preventDefault?.();
        removeOverlay();
        return true;
      }
    };
    window.addEventListener("error", onError, true);
    window.addEventListener("unhandledrejection", onError, true);
    const interval = setInterval(removeOverlay, 300);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
      window.removeEventListener("error", onError, true);
      window.removeEventListener("unhandledrejection", onError, true);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <Loader />
      <Cursor />
      <SideRail />
      <FloatingCTA />
      <AIDesk />
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <Marquee items={["Build Fast", "Ship Fast", "Scale Fast", "Build Smart", "Ship Real"]} big />
        <Process />
        <Work />
        <Marquee items={["Idea → MVP → Scale", "Fast Delivery", "Founder Friendly", "Built to Last"]} dark />
        <WhyUs />
        <Pricing />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
