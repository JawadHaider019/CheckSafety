"use client";
import { useEffect } from "react";

export function CardFx() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = null;
    let frame = 0;
    let last = null;

    const release = (el) => {
      el.classList.remove("fx-on");
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };

    const update = () => {
      frame = 0;
      const el = last.target instanceof Element ? last.target.closest("[data-fx]") : null;
      if (el !== active) {
        if (active) release(active);
        active = el;
        if (el) el.classList.add("fx-on");
      }
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (last.clientX - r.left) / r.width;
      const y = (last.clientY - r.top) / r.height;
      const tilt = el.dataset.fx === "soft" ? 3 : 7;
      el.style.setProperty("--px", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--py", `${(y * 100).toFixed(1)}%`);
      el.style.setProperty("--rx", `${((x - 0.5) * tilt).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((0.5 - y) * tilt).toFixed(2)}deg`);
    };

    const onMove = (e) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onLeave = () => {
      if (active) release(active);
      active = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      onLeave();
    };
  }, []);

  return null;
}
