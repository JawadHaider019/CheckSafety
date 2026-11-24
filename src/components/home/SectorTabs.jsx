"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  GraduationCap,
  HeartPulse,
  Briefcase,
  ShieldCheck,
  PhoneOff,
  Timer,
  KeyRound,
  BatteryLow,
  Smartphone,
  MessageSquare,
  RotateCcw,
  Flag,
  ArrowUpRight,
} from "lucide-react";

const SECTORS = [
  {
    id: "property",
    label: "Property",
    icon: Home,
    who: "Estate agents, letting agents, surveyors",
    headline: "Viewings with strangers,",
    accent: "in empty homes.",
    body: "You hand a stranger the keys to a vacant property and walk in alone. CheckSafe checks who they are first, and makes sure someone knows if you don't walk back out.",
    points: [
      { icon: ShieldCheck, text: "Verify the viewer's ID before you share the address" },
      { icon: PhoneOff, text: "Arrange viewings from a masked number, not your own" },
      { icon: Timer, text: "Your contact is alerted if you don't check out" },
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70",
    alt: "Bright, empty modern living room ready for a viewing",
  },
  {
    id: "tuition",
    label: "Private tuition",
    icon: GraduationCap,
    who: "In-home tutors, music teachers, coaches",
    headline: "First lessons,",
    accent: "in someone else's home.",
    body: "New families, unfamiliar addresses, no reception desk. Verify the parent or guardian before lesson one and keep every session on a timer.",
    points: [
      { icon: ShieldCheck, text: "Single-use ID check for the parent or guardian" },
      { icon: PhoneOff, text: "Keep your personal number out of family group chats" },
      { icon: Timer, text: "A safety timer for every lesson, extendable in one tap" },
    ],
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=70",
    alt: "Tutor and student working together at a table",
  },
  {
    id: "wellness",
    label: "Mobile wellness",
    icon: HeartPulse,
    who: "Therapists, carers, mobile practitioners",
    headline: "One-to-one,",
    accent: "behind closed doors.",
    body: "When a session turns, you can't always reach for help openly. CheckSafe gives you ways to raise the alarm that look like nothing at all.",
    points: [
      { icon: KeyRound, text: "A Duress Code, your secret PIN that silently sends an alert while looking like a safe check-in" },
      { icon: BatteryLow, text: "Triple-tap to show a fake low-battery screen" },
      { icon: Smartphone, text: "One-tap SOS from your home screen, instantly alerts your emergency contact, no login required" },
    ],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=70",
    alt: "Practitioner preparing for a home appointment",
  },
  {
    id: "independent",
    label: "Independent professionals",
    icon: Briefcase,
    who: "Consultants, tradespeople, field auditors",
    headline: "Site visits,",
    accent: "where signal drops.",
    body: "Basements, plant rooms and rural sites rarely have data. Your timer runs in the cloud, and a basic text message is enough to check in or call for help.",
    points: [
      { icon: MessageSquare, text: "Text your Safe Code or “SOS” with no data needed" },
      { icon: RotateCcw, text: "Verified repeat clients rebook at £0" },
      { icon: Flag, text: "New clients checked against reported red flags" },
    ],
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=70",
    alt: "Electrician in a hard hat working on a wall-mounted meter",
  },
];

export function SectorTabs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const sector = SECTORS[active];

  function onKeyDown(e) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + SECTORS.length) % SECTORS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Sectors"
        onKeyDown={onKeyDown}
        className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3"
      >
        {SECTORS.map((s, i) => {
          const Icon = s.icon;
          const selected = i === active;
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={selected}
              aria-controls={`panel-${s.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`cs-press min-w-0 flex items-center gap-2 sm:gap-2.5 min-h-[52px] px-3.5 sm:px-5 py-2.5 rounded-2xl border text-left text-[13px] sm:text-sm font-semibold leading-tight cursor-pointer ${
                selected
                  ? "bg-[#0B2545] border-[#0B2545] text-white shadow-[0_12px_24px_-14px_rgba(11,37,69,0.8)]"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-[#0B2545]"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${selected ? "text-[#00E08C]" : ""}`} />
              {s.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${sector.id}`}
        aria-labelledby={`tab-${sector.id}`}
        className="mt-8 sm:mt-10 grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-16 items-center"
      >
        <div className="mk-zoom relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[5/4] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-slate-200">
          {SECTORS.map((s, i) => (
            <Image
              key={s.id}
              src={s.image}
              alt={s.alt}
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className={`object-cover transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div className="absolute inset-0 bg-linear-to-t from-[#07182E]/70 via-transparent to-transparent" />
          <p className="absolute left-5 bottom-5 right-5 text-sm font-medium text-white/90">{sector.who}</p>
        </div>

        <div key={sector.id} className="cs-rise">
          <h3 className="text-[clamp(1.875rem,3.6vw,3rem)] font-semibold tracking-[-0.03em] leading-[1.05] text-[#0B2545] text-balance">
            {sector.headline} <span className="font-serif italic font-normal">{sector.accent}</span>
          </h3>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-[52ch]">{sector.body}</p>
          <ul className="mt-7 space-y-3">
            {sector.points.map(({ icon: Icon, text }, i) => (
              <li
                key={text}
                data-fx="soft"
                className="cs-rise flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80"
                style={{ animationDelay: `${120 + i * 80}ms` }}
              >
                <span className="fx-icon w-10 h-10 rounded-xl bg-[#0B2545] flex items-center justify-center shrink-0">
                  <Icon className="w-[18px] h-[18px] text-[#00E08C]" />
                </span>
                <span className="text-[15px] font-medium text-[#0B2545]">{text}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/#get-started"
            className="group mt-8 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0B2545] hover:gap-2.5 transition-all"
          >
            Protect your {sector.label.toLowerCase()} work
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          </Link>
        </div>
      </div>
    </div>
  );
}
