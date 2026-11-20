"use client";
import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({ children }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis with smooth momentum settings
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.25,
      infinite: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Global reference for programmatic control
    window.__lenis = lenis;

    // Smooth anchor click handling
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"], a[href^="/#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const hash = href.startsWith("/#") ? href.slice(1) : href;

      if (hash && hash !== "#") {
        const isHomePage =
          typeof window !== "undefined" &&
          (window.location.pathname === "/" || window.location.pathname === "");

        if (isHomePage) {
          const targetElement = document.querySelector(hash);
          if (targetElement) {
            e.preventDefault();

            // Calculate precise target scroll position (in pixels)
            // Navbar is 64px tall (fixed at top: 0, height: 64px)
            const rect = targetElement.getBoundingClientRect();
            const currentScroll = window.scrollY || window.pageYOffset;

            // For #sectors (Services):
            // Header is 64px. Tucking slightly by 56px ensures the hero slide panel
            // is 100% hidden, framing the white header cleanly (exact Image 1 match).
            const headerOffset = hash === "#sectors" ? 56 : 64;
            const targetScroll = Math.max(0, rect.top + currentScroll - headerOffset);

            lenis.scrollTo(targetScroll, {
              duration: 1.15,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });

            if (window.history.pushState) {
              window.history.pushState(null, "", hash);
            }
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });

    // Handle initial hash on mount if arriving with hash in URL
    if (window.location.hash) {
      setTimeout(() => {
        const initialTarget = document.querySelector(window.location.hash);
        if (initialTarget) {
          const rect = initialTarget.getBoundingClientRect();
          const currentScroll = window.scrollY || window.pageYOffset;
          const headerOffset = window.location.hash === "#sectors" ? 56 : 64;
          const targetScroll = Math.max(0, rect.top + currentScroll - headerOffset);
          lenis.scrollTo(targetScroll, { immediate: true });
        }
      }, 120);
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
