import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Lock,
  BadgeCheck,
  Link2,
  PhoneOff,
  MessageSquare,
  Zap,
  Cloud,
  RotateCw,
  Check,
  X,
  Fingerprint,
  Trash2,
  KeyRound,
  BatteryLow,
  Smartphone,
  Users,
  Moon,
  ScanFace,
  Plus,
} from "lucide-react";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { ClassicHero } from "@/components/home/ClassicHero";
import { SectorTabs } from "@/components/home/SectorTabs";
import { GetStartedForm } from "@/components/home/GetStartedForm";
import { ProtocolTimeline } from "@/components/home/ProtocolTimeline";
import { DEFAULT_APP_SETTINGS } from "@/lib/types";
import { Eyebrow, H2, WRAP } from "@/components/marketing/Marketing";

const settings = DEFAULT_APP_SETTINGS;

const ROLES = [
  "Estate agents",
  "Letting agents",
  "Surveyors",
  "Private tutors",
  "Music teachers",
  "Therapists",
  "Domiciliary carers",
  "Mobile practitioners",
  "Consultants",
  "Field auditors",
];

const FACTS = [
  { num: 60, suffix: "s", label: "Raw ID files deleted after every client check" },
  { num: 5, suffix: " min", label: "Grace window before your contact is alerted" },
  { num: 0, suffix: "", label: "Readable client names, photos or numbers stored" },
  { num: 7, suffix: "", label: "Launch countries, each with local emergency numbers" },
];

const PLANS = [
  { id: "core", label: "Core", price: settings.core_price_gbp, lines: 1, note: "For occasional solo appointments" },
  { id: "pro", label: "Pro", price: settings.pro_price_gbp, lines: 2, note: "For busy weeks and separate work lines", featured: true },
  { id: "elite", label: "Elite", price: settings.elite_price_gbp, lines: 5, note: "For high-volume and multi-brand work" },
];

const PLAN_FEATURES = [
  "Cloud safety timer, 30 min to 4 h",
  "Two-stage alerts with 5-minute grace",
  "Silent Duress Code",
  "One-tap SOS link, no login",
  "SMS check-in when data drops",
  "Trusted client vault, £0 repeats",
];

const FAQS = [
  {
    q: "Do you store my clients' personal data?",
    a: "No. ID photos, selfies and names are deleted by our verification partner within 60 seconds of each check. We keep only an anonymous fingerprint and the result. A client's phone number is held encrypted only while you're in a session, so calls can be masked, and it's deleted when you close safely.",
  },
  {
    q: "What happens if my phone dies or loses signal?",
    a: "Your timer runs on our servers, not your phone. If it ends without a check-in, the alerts go out anyway. With weak signal you can text your Safe Code, or simply “SOS”, to your Checksafe number with no mobile data.",
  },
  {
    q: "What does my client see?",
    a: "A single-use link for a quick automated ID check, then your dedicated Checksafe number for calls and texts. They never see your personal mobile.",
  },
  {
    q: "How does the Duress Code work?",
    a: "You set it before each session. If you're pressured to check in, enter it instead of your Safe Code: the screen looks exactly like a normal safe close, while your emergency contact is alerted silently.",
  },
  {
    q: "Do I need to download an app?",
    a: "No app store needed. Checksafe installs from your browser to your home screen on iPhone and Android, and runs full screen like a native app.",
  },
  {
    q: "Can I pause instead of cancelling?",
    a: `Yes. Hibernation Mode keeps your chosen numbers, your client vault and unused checks from £${settings.hibernation_1_price_gbp}/month, with timers and masked calls paused until you return.`,
  },
];

function RoleMarquee() {
  const row = (hidden) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {ROLES.map((r) => (
        <li key={r} className="flex items-center gap-10 text-lg sm:text-xl font-medium text-slate-500 hover:text-[#0B2545] transition-colors whitespace-nowrap">
          {r}
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E08C]" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Who uses Checksafe" className="py-10 sm:py-14">
      <p className="text-center text-xs font-mono tracking-[0.2em] uppercase text-slate-500">Built for people who work alone</p>
      <div className="mk-marquee-wrap relative mt-6 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-y-0 left-0 w-16 sm:w-40 z-10 bg-linear-to-r from-white to-transparent" />
        <div aria-hidden="true" className="absolute inset-y-0 right-0 w-16 sm:w-40 z-10 bg-linear-to-l from-white to-transparent" />
        <div className="mk-marquee flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}

function Sectors() {
  return (
    <section id="sectors" className="py-16 sm:py-24">
      <div className={WRAP}>
        <div className="mk-reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <h2 className={`${H2} mt-4 text-[#0B2545] max-w-[16ch]`}>
              Made for the work <span className="mk-accent font-serif italic font-normal">no one sees.</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-[44ch]">
            Four trades, one promise: you&apos;ll know who you&apos;re meeting, and someone will know if you don&apos;t come back out.
          </p>
        </div>
        <div className="mk-reveal">
          <SectorTabs />
        </div>
      </div>
    </section>
  );
}

function Facts() {
  return (
    <section aria-label="Checksafe in numbers" className="py-6 sm:py-10">
      <div className={WRAP}>
        <dl className="mk-stagger grid grid-cols-2 lg:grid-cols-4 border-y border-slate-200">
          {FACTS.map((f, i) => (
            <div
              key={f.label}
              className={`mk-reveal py-8 sm:py-12 px-1 sm:px-8 ${i % 2 ? "pl-5 border-l border-slate-200" : ""} ${
                i > 0 ? "lg:border-l lg:border-slate-200 lg:pl-8" : "lg:pl-0"
              } ${i > 1 ? "border-t lg:border-t-0 border-slate-200" : ""}`}
            >
              <dt className="sr-only">{f.label}</dt>
              <dd className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-[-0.04em] leading-none text-[#0B2545] tabular-nums">
                <span className="mk-count" style={{ "--to": f.num }}>
                  {f.num}
                </span>
                {f.suffix}
              </dd>
              <dd className="mt-3 text-sm text-slate-500 leading-snug max-w-[24ch]">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function StepCard({ n, title, body, children }) {
  return (
    <li data-fx className="mk-reveal flex flex-col rounded-[28px] bg-white border border-slate-200/80 overflow-hidden">
      <div aria-hidden="true" className="h-[200px] bg-[#F8F7F5] border-b border-slate-100 flex items-center justify-center p-6">
        {children}
      </div>
      <div className="p-7 sm:p-8">
        <p className="fx-num font-serif italic text-3xl text-emerald-700">{n}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#0B2545]">{title}</h3>
        <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">{body}</p>
      </div>
    </li>
  );
}

function HowItWorks() {
  return (
    <section id="journey" className="py-16 sm:py-28 bg-[#F8F7F5]">
      <div className={WRAP}>
        <div className="mk-reveal max-w-[760px]">
          <Eyebrow>How it works</Eyebrow>
          <h2 className={`${H2} mt-4 text-[#0B2545]`}>
            Three steps before <span className="mk-accent font-serif italic font-normal">every appointment.</span>
          </h2>
        </div>
        <ol className="mk-stagger mt-12 sm:mt-16 grid md:grid-cols-3 gap-4 sm:gap-5">
          <StepCard
            n="01"
            title="Verify the client"
            body="Send a single-use link. Your client completes a 60-second ID check, and you see Verified or High risk, never their documents."
          >
            <div className="w-full max-w-[260px] space-y-2.5">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-500">
                <Link2 className="w-3.5 h-3.5 text-[#0B2545] shrink-0" />
                <span className="truncate">cs-idgate.com/verify/8f2k…</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                <span className="flex items-center gap-2 text-sm font-semibold text-[#0B2545]">
                  <ScanFace className="w-4 h-4 text-emerald-600" /> J.M. viewing
                </span>
                <span className="fx-pop inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  <BadgeCheck className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>
          </StepCard>
          <StepCard
            n="02"
            title="Talk through a masked line"
            body="Calls and texts go through your dedicated Checksafe number. Clients can reach you; they just never get your personal mobile."
          >
            <div className="w-full max-w-[260px] space-y-2.5">
              <div className="fx-pop p-3 rounded-xl bg-[#0B2545] text-white">
                <p className="text-[10px] text-slate-300">Client sees</p>
                <p className="text-sm font-mono font-semibold mt-0.5">+44 7700 900412</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500">Your mobile</p>
                  <p className="text-sm font-mono font-semibold text-slate-500 line-through mt-0.5">+44 7911 ••• •••</p>
                </div>
                <PhoneOff className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </StepCard>
          <StepCard
            n="03"
            title="Check in when you leave"
            body="Start a timer for the visit. Enter your Safe Code on the way out. If you don't, the safety protocol takes over."
          >
            <div className="flex items-center gap-5">
              <div className="fx-pop relative w-24 h-24">
                <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90" aria-hidden="true">
                  <circle cx="48" cy="48" r="40" fill="none" stroke="#E2E8F0" strokeWidth="7" />
                  <circle cx="48" cy="48" r="40" fill="none" stroke="#16A34A" strokeWidth="7" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="70" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-base font-bold font-mono text-[#0B2545]">42:18</span>
              </div>
              <div className="space-y-2">
                <p className="text-[11px] font-mono tracking-[0.3em] text-slate-500">SAFE CODE</p>
                <p className="flex gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="fx-dot w-3 h-3 rounded-full bg-[#0B2545]" style={{ "--i": i }} />
                  ))}
                </p>
                <p className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                  <Check className="w-3.5 h-3.5" /> Closed safely
                </p>
              </div>
            </div>
          </StepCard>
        </ol>
      </div>
    </section>
  );
}

function Protocol() {
  return (
    <section id="protocol" className="py-4 sm:py-6 px-2.5 sm:px-4 lg:px-6">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[40px] navy-gradient text-white py-16 sm:py-28">
        <div className={WRAP}>
          <div className="mk-reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <Eyebrow dark>Safety protocol</Eyebrow>
              <h2 className={`${H2} mt-4 max-w-[14ch]`}>
                If you don&apos;t check in, <span className="mk-accent font-serif italic font-normal text-[#00E08C]">we act.</span>
              </h2>
            </div>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-[44ch]">
              Every session runs on our servers with two stages of escalation, so a dead battery or a dropped call never means silence.
            </p>
          </div>

          <ProtocolTimeline />

          <div data-fx="soft" className="mk-reveal mt-6 lg:mt-16 rounded-[24px] bg-[#DC2626]/12 border border-red-400/25 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="fx-icon w-12 h-12 rounded-2xl bg-[#DC2626] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </span>
            <p className="text-base sm:text-lg leading-snug">
              <strong className="font-semibold">Duress Code or SOS skips the wait.</strong>{" "}
              <span className="text-slate-300">Your contact is alerted instantly, at any moment of a session.</span>
            </p>
          </div>

          <ul className="mk-stagger mt-10 grid sm:grid-cols-3 gap-6 text-sm text-slate-300">
            {[
              [Cloud, "Runs in the cloud, not on your phone"],
              [RotateCw, "Every alert logged, failed texts retried"],
              [MessageSquare, "Check in by plain SMS when data drops"],
            ].map(([Icon, text]) => (
              <li key={text} className="mk-reveal flex items-center gap-3">
                <Icon className="w-5 h-5 text-[#00E08C] shrink-0" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Bento({ className = "", title, body, children, dark = false, wide = false }) {
  return (
    <li
      data-fx={wide ? "soft" : ""}
      className={`mk-reveal relative flex flex-col rounded-[28px] overflow-hidden border ${
        dark ? "bg-[#07182E] border-white/10 text-white" : "bg-white border-slate-200/80"
      } ${className}`}
    >
      <div aria-hidden="true" className="flex-1 min-h-[180px] flex items-center justify-center p-6 sm:p-8">
        {children}
      </div>
      <div className="p-7 sm:p-8 pt-0 sm:pt-0">
        <h3 className={`text-xl sm:text-2xl font-semibold tracking-tight ${dark ? "" : "text-[#0B2545]"}`}>{title}</h3>
        <p className={`mt-2 text-[15px] leading-relaxed max-w-[46ch] ${dark ? "text-slate-300" : "text-slate-600"}`}>{body}</p>
      </div>
    </li>
  );
}

function Safeguards() {
  return (
    <section id="safeguards" className="py-16 sm:py-28">
      <div className={WRAP}>
        <div className="mk-reveal max-w-[820px]">
          <Eyebrow>Discreet safeguards</Eyebrow>
          <h2 className={`${H2} mt-4 text-[#0B2545]`}>
            Built for the moment <span className="mk-accent font-serif italic font-normal">you can&apos;t ask for help.</span>
          </h2>
        </div>

        <ul className="mk-stagger mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-5">
          <Bento
            className="md:col-span-3"
            wide
            dark
            title="Silent Duress Code"
            body="Pressured to check in? Enter your Duress Code. The screen shows a normal safe close, while your contact is alerted silently."
          >
            <div className="w-full max-w-[300px] rounded-2xl bg-white/[0.06] border border-white/10 p-5 text-center">
              <div className="flex justify-center gap-2.5">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="fx-dot w-3.5 h-3.5 rounded-full bg-[#00E08C]" style={{ "--i": i }} />
                ))}
              </div>
              <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                <Check className="w-4 h-4 text-[#00E08C]" /> Session closed safely
              </p>
              <p className="mt-3 pt-3 border-t border-white/10 text-[11px] font-mono text-red-300">
                <span className="w-1.5 h-1.5 inline-block rounded-full bg-red-400 mr-1.5 cs-blink" />
                contact alerted silently
              </p>
            </div>
          </Bento>
          <Bento
            className="md:col-span-3"
            wide
            title="Fake low-battery screen"
            body="Triple-tap the top-left corner and your phone shows a dead battery. Your timer keeps running in the cloud."
          >
            <div className="fx-pop w-[150px] h-[170px] rounded-[26px] bg-black flex flex-col items-center justify-center shadow-[0_30px_50px_-25px_rgba(0,0,0,0.7)]">
              <BatteryLow className="fx-blink w-12 h-12 text-[#DC2626]" />
              <p className="mt-2 text-[10px] text-neutral-400">Battery 1%</p>
            </div>
          </Bento>
          <Bento className="md:col-span-2" title="One-tap SOS" body="A private link on your home screen. Works without logging in.">
            <span className="relative w-24 h-24 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-[#DC2626]/20 cs-ring" />
              <span className="fx-press relative w-24 h-24 rounded-full bg-linear-to-b from-[#EF4444] to-[#B91C1C] text-white text-xl font-black flex items-center justify-center shadow-[0_20px_40px_-15px_rgba(220,38,38,0.7)]">
                SOS
              </span>
            </span>
          </Bento>
          <Bento className="md:col-span-2" title="Works on one bar" body="No data? Text your Safe Code, or “SOS”, to your Checksafe number.">
            <div className="w-full max-w-[220px] space-y-2">
              <p className="fx-slide ml-auto w-fit px-4 py-2 rounded-2xl rounded-br-md bg-[#0B2545] text-white text-sm font-semibold">SOS</p>
              <p className="w-fit px-4 py-2 rounded-2xl rounded-bl-md bg-slate-100 text-slate-700 text-xs">Alert sent to your contact.</p>
            </div>
          </Bento>
          <Bento className="md:col-span-2" title="Trusted client vault" body="Verified clients rebook at £0. Reported clients are flagged for every worker, by anonymous fingerprint.">
            <div className="w-full max-w-[230px] space-y-2">
              {[
                ["J.M.", "Verified", "bg-emerald-100 text-emerald-800"],
                ["K.T.", "High risk", "bg-red-100 text-red-700"],
              ].map(([name, status, cls], i) => (
                <div key={name} style={{ "--i": i }} className="fx-row flex items-center justify-between p-2.5 rounded-xl bg-[#F8F7F5] border border-slate-100">
                  <span className="flex items-center gap-2 text-sm font-semibold text-[#0B2545]">
                    <Fingerprint className="w-4 h-4 text-slate-400" /> {name}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cls}`}>{status}</span>
                </div>
              ))}
            </div>
          </Bento>
        </ul>
      </div>
    </section>
  );
}

function Privacy() {
  const never = ["Client names", "ID photos and selfies", "Readable client phone numbers"];
  const keep = [
    "An anonymous HMAC-SHA256 fingerprint",
    "The check result: Verified or High risk",
    "An encrypted number, deleted when you close safely",
    "Alert logs, so no text is ever missed",
  ];
  return (
    <section id="privacy" className="py-16 sm:py-28 bg-[#F8F7F5]">
      <div className={`${WRAP} grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start`}>
        <div className="mk-reveal lg:sticky lg:top-28">
          <Eyebrow>Zero-knowledge privacy</Eyebrow>
          <h2 className={`${H2} mt-4 text-[#0B2545]`}>
            We can&apos;t leak what <span className="mk-accent font-serif italic font-normal">we never keep.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-[46ch]">
            Checksafe is designed so that even a full data breach would reveal nothing readable about your clients.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {["London data region", "Row-level security", "Signed webhooks", "Keys held server-side"].map((t) => (
              <li key={t} className="px-3.5 py-2 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600 hover:border-emerald-400 hover:text-[#0B2545] transition-colors">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="mk-stagger grid sm:grid-cols-2 gap-4 sm:gap-5">
          <div data-fx className="mk-reveal rounded-[28px] bg-white border border-slate-200/80 p-7 sm:p-8">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
              <Trash2 className="w-4 h-4" /> Never stored
            </p>
            <ul className="mt-6 space-y-4">
              {never.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] text-slate-500 line-through decoration-slate-400">
                  <X className="w-4 h-4 mt-1 shrink-0 text-slate-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div data-fx className="mk-reveal rounded-[28px] bg-[#0B2545] text-white p-7 sm:p-8">
            <p className="flex items-center gap-2 text-sm font-semibold text-[#00E08C]">
              <Lock className="w-4 h-4" /> All we keep
            </p>
            <ul className="mt-6 space-y-4">
              {keep.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] text-slate-200 leading-snug">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#00E08C]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div data-fx="soft" className="mk-reveal sm:col-span-2 rounded-[28px] bg-white border border-slate-200/80 p-7 sm:p-8 grid sm:grid-cols-3 gap-6">
            {[
              [60, "s", "ID files deleted after each check"],
              [0, " days", "Number kept after a safe close"],
              [30, " days", "Number kept after an alert, then deleted"],
            ].map(([n, unit, l]) => (
              <div key={l}>
                <p className="text-3xl font-semibold tracking-tight text-[#0B2545] tabular-nums">
                  <span className="mk-count" style={{ "--to": n }}>
                    {n}
                  </span>
                  {unit}
                </p>
                <p className="mt-1 text-sm text-slate-500 leading-snug">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-28">
      <div className={WRAP}>
        <div className="mk-reveal text-center max-w-[720px] mx-auto">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className={`${H2} mt-4 text-[#0B2545]`}>
            Simple plans. <span className="mk-accent font-serif italic font-normal">Serious protection.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600">Every plan includes the full safety protocol. Choose by how many masked numbers you need.</p>
        </div>

        <ul className="mk-stagger mt-12 sm:mt-16 grid lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {PLANS.map((p) => (
            <li
              key={p.id}
              data-fx="soft"
              className={`mk-reveal relative flex flex-col rounded-[32px] p-7 sm:p-9 border ${
                p.featured ? "navy-gradient text-white border-transparent lg:-my-4 lg:py-12" : "bg-white border-slate-200/80"
              }`}
            >
              {p.featured && (
                <span className="absolute top-7 right-7 px-3 py-1 rounded-full bg-[#00E08C] text-[#07182E] text-[11px] font-bold">Recommended</span>
              )}
              <h3 className={`text-lg font-semibold ${p.featured ? "" : "text-[#0B2545]"}`}>{p.label}</h3>
              <p className={`mt-1 text-sm ${p.featured ? "text-slate-300" : "text-slate-500"}`}>{p.note}</p>
              <p className="mt-8 flex items-baseline gap-1">
                <span className={`text-6xl font-semibold tracking-[-0.04em] ${p.featured ? "" : "text-[#0B2545]"}`}>£{p.price}</span>
                <span className={p.featured ? "text-slate-400" : "text-slate-500"}>/month</span>
              </p>
              <p
                className={`mt-5 inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full text-sm font-semibold ${
                  p.featured ? "bg-white/10 text-white" : "bg-[#F8F7F5] text-[#0B2545]"
                }`}
              >
                <PhoneOff className={`fx-icon w-4 h-4 ${p.featured ? "text-[#00E08C]" : "text-emerald-600"}`} />
                {p.lines} masked {p.lines === 1 ? "number" : "numbers"}
              </p>
              <ul className={`mt-8 space-y-3.5 text-[15px] flex-1 ${p.featured ? "text-slate-200" : "text-slate-600"}`}>
                {PLAN_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 mt-1 shrink-0 ${p.featured ? "text-[#00E08C]" : "text-emerald-600"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/signup?plan=${p.id}`}
                className={`cs-press group mt-10 h-14 rounded-full flex items-center justify-center gap-2 text-base font-semibold ${
                  p.featured
                    ? "bg-[#00E08C] hover:bg-[#33E8A3] text-[#07182E]"
                    : "bg-[#0B2545] hover:bg-[#123461] text-white"
                }`}
              >
                Choose {p.label}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>

        <ul className="mk-stagger mt-6 sm:mt-10 grid md:grid-cols-3 gap-4 sm:gap-5">
          <li data-fx className="mk-reveal rounded-[28px] bg-[#F8F7F5] p-7">
            <Users className="fx-icon w-5 h-5 text-emerald-700" />
            <h3 className="mt-4 text-lg font-semibold text-[#0B2545]">Teams &amp; agencies</h3>
            <p className="mt-1 text-sm text-slate-600">
              £{settings.agency_seat_price_gbp} per seat per month, from 5 seats. Admins manage seats, never staff sessions.
            </p>
            <Link href="/signup?plan=agency" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0B2545] hover:gap-2 transition-all">
              Set up a team <ArrowUpRight className="w-4 h-4 text-emerald-600" />
            </Link>
          </li>
          <li data-fx className="mk-reveal rounded-[28px] bg-[#F8F7F5] p-7">
            <Plus className="fx-icon w-5 h-5 text-emerald-700" />
            <h3 className="mt-4 text-lg font-semibold text-[#0B2545]">Client ID checks</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
              {[
                [5, settings.topup_5_price_gbp],
                [15, settings.topup_15_price_gbp],
                [50, settings.topup_50_price_gbp],
              ].map(([n, price]) => (
                <li key={n} className="flex justify-between border-b border-slate-200/70 pb-1.5 last:border-0">
                  <span>{n} checks</span>
                  <span className="font-semibold text-[#0B2545] tabular-nums">£{price}</span>
                </li>
              ))}
            </ul>
          </li>
          <li data-fx className="mk-reveal rounded-[28px] bg-[#F8F7F5] p-7">
            <Moon className="fx-icon w-5 h-5 text-emerald-700" />
            <h3 className="mt-4 text-lg font-semibold text-[#0B2545]">Hibernation Mode</h3>
            <p className="mt-1 text-sm text-slate-600">
              Taking a break? Keep your numbers, vault and unused checks from £{settings.hibernation_1_price_gbp}/month (1 number), £
              {settings.hibernation_2_price_gbp} (2) or £{settings.hibernation_5_price_gbp} (5).
            </p>
          </li>
        </ul>
        <p className="mt-8 text-center text-sm text-slate-500">Prices in GBP. Local-currency pricing is applied at checkout in each launch country.</p>
      </div>
    </section>
  );
}

function GetStarted() {
  const plans = [
    { id: "core", label: "Core", price: settings.core_price_gbp, suffix: "/mo" },
    { id: "pro", label: "Pro", price: settings.pro_price_gbp, suffix: "/mo" },
    { id: "elite", label: "Elite", price: settings.elite_price_gbp, suffix: "/mo" },
    { id: "agency", label: "Team", price: settings.agency_seat_price_gbp, suffix: "/seat" },
  ];
  return (
    <section id="get-started" className="py-4 sm:py-6 px-2.5 sm:px-4 lg:px-6">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[40px] navy-gradient text-white py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="absolute -right-64 -bottom-64 w-[720px] h-[720px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(0,224,140,0.18), rgba(0,224,140,0))" }}
        />
        <div className={`${WRAP} relative grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
          <div className="mk-reveal">
            <Eyebrow dark>Get started</Eyebrow>
            <h2 className={`${H2} mt-4`}>
              Start your protection <span className="mk-accent font-serif italic font-normal text-[#00E08C]">today.</span>
            </h2>
            <ul className="mk-stagger mt-8 space-y-4 text-base text-slate-300">
              {[
                [Smartphone, "No app store: install from your browser to your home screen"],
                [KeyRound, "Set your Safe Code and emergency contact in minutes"],
                [Moon, "Cancel or switch to Hibernation Mode anytime"],
              ].map(([Icon, text]) => (
                <li key={text} className="mk-reveal flex items-start gap-3">
                  <Icon className="w-5 h-5 mt-0.5 text-[#00E08C] shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="mk-reveal rounded-[28px] bg-white/[0.05] border border-white/10 p-5 sm:p-8">
            <GetStartedForm plans={plans} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section id="faq" className="py-16 sm:py-28">
      <div className={`${WRAP} grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20`}>
        <div className="mk-reveal">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className={`${H2} mt-4 text-[#0B2545]`}>
            Questions, <span className="mk-accent font-serif italic font-normal">answered.</span>
          </h2>
          <p className="mt-6 text-base text-slate-600">
            Something else?{" "}
            <Link href="/contact" className="font-semibold text-[#0B2545] underline underline-offset-4 decoration-emerald-500">
              Talk to us
            </Link>
          </p>
        </div>
        <div className="mk-reveal border-t border-slate-200">
          {FAQS.map((f) => (
            <details key={f.q} className="mk-faq group border-b border-slate-200">
              <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none text-lg sm:text-xl font-semibold tracking-tight text-[#0B2545]">
                {f.q}
                <span className="mk-faq-icon w-9 h-9 rounded-full border border-slate-200 group-hover:border-slate-300 flex items-center justify-center shrink-0 transition-transform duration-300">
                  <Plus className="w-4 h-4" />
                </span>
              </summary>
              <p className="mk-faq-body pb-6 -mt-1 text-[15px] sm:text-base text-slate-600 leading-relaxed max-w-[62ch]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-[#0B2545] focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="hero-stack bg-white text-[#0B2545] overflow-x-clip">
        <ClassicHero />
        <div className="relative z-20 bg-white">
          <RoleMarquee />
          <Sectors />
          <Facts />
          <HowItWorks />
          <Protocol />
          <Safeguards />
          <Privacy />
          <Pricing />
          <GetStarted />
          <Faq />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
