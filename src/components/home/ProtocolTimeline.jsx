"use client";
import { useEffect, useRef } from "react";
import { Timer, MessageSquare, BellRing, Siren } from "lucide-react";

const STEPS = [
  {
    icon: Timer,
    tag: "In session",
    title: "Timer runs",
    body: "Set 15 minutes to 4 hours. Enter your Safe Code when you leave to close it safely.",
    iconClass: "bg-white text-[#0B2545]",
    fill: "from-white/80 to-amber-300",
  },
  {
    icon: MessageSquare,
    tag: "Stage 1",
    title: "Warning to you",
    body: "No check-in when time is up? We text you first, never your contact.",
    iconClass: "bg-amber-400 text-[#0B2545]",
    fill: "from-amber-300 to-amber-400",
  },
  {
    icon: BellRing,
    tag: "Stage 1",
    title: "5-minute grace",
    body: "One last window to enter your Safe Code, by app or by reply text.",
    iconClass: "bg-amber-400 text-[#0B2545]",
    fill: "from-amber-400 to-red-500",
  },
  {
    icon: Siren,
    tag: "Stage 2",
    title: "Contact alerted",
    body: "Your emergency contact gets the address and local emergency instructions.",
    iconClass: "bg-[#DC2626] text-white",
    fill: "from-red-500 to-red-500/80",
    tail: true,
  },
];

export function ProtocolTimeline() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.pt = "ready";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.pt = "in";
        observer.disconnect();
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={ref} className="mt-14 sm:mt-20 grid lg:grid-cols-4 gap-0 lg:gap-6">
      {STEPS.map(({ icon: Icon, tag, title, body, iconClass, fill, tail }, i) => (
        <li key={title} className="relative flex lg:flex-col gap-5 pb-10 last:pb-0 lg:pb-0" style={{ "--i": i }}>
          {fill && (
            <span
              aria-hidden="true"
              className={`pt-seg absolute left-6 top-6 ${
                tail
                  ? "hidden lg:block h-px w-[calc(100%-3rem)] bg-white/12"
                  : "w-px h-full lg:h-px lg:w-[calc(100%+1.5rem)] bg-white/12"
              }`}
            >
              <span className={`pt-fill absolute inset-0 bg-linear-to-b lg:bg-linear-to-r ${fill}`} />
              <span className="pt-dot absolute w-2.5 h-2.5 -ml-[4.5px] -mt-[4.5px] lg:-ml-[5px] lg:-mt-[4.5px] rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.55)]" />
            </span>
          )}
          <span className={`pt-icon relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] ${iconClass}`}>
            {i === STEPS.length - 1 && <span aria-hidden="true" className="pt-ping absolute inset-0 rounded-2xl bg-[#DC2626]" />}
            <Icon className="relative w-5 h-5" />
          </span>
          <div className="pt-text">
            <p className="text-xs font-mono text-slate-400">{tag}</p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-[15px] text-slate-300 leading-relaxed max-w-[34ch]">{body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
