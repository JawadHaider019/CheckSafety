import React from "react";
import Link from "next/link";
import { Lock, PhoneOff, Timer, ShieldCheck } from "lucide-react";
import { CheckSafeLogo } from "@/components/ui/CheckSafeLogo";

const PILLARS = [
  { icon: Timer, title: "Cloud safety timer", body: "2-stage alerts reach your emergency contact even if your phone dies." },
  { icon: PhoneOff, title: "Masked numbers", body: "Clients only ever see your dedicated proxy line, never your mobile." },
  { icon: ShieldCheck, title: "Client ID checks", body: "Single-use verification links, red-flag screening before you attend." },
];

export function AuthShell({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <aside className="hidden lg:flex navy-grid text-white relative overflow-hidden flex-col justify-between p-12 xl:p-16">
        <Link href="/" className="cs-rise inline-flex w-fit hover:opacity-90 transition-opacity">
          <CheckSafeLogo darkSurface size="md" />
        </Link>

        <div className="max-w-[460px]">
          <p className="cs-rise cs-d1 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#00E08C]">
            Lone-worker safety platform
          </p>
          <h2 className="cs-rise cs-d2 mt-4 text-4xl xl:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Attend every appointment with a safety net behind you.
          </h2>
          <ul className="mt-10 space-y-5">
            {PILLARS.map(({ icon: Icon, title: t, body }, i) => (
              <li key={t} className={`cs-rise cs-d${i + 3} flex gap-4`}>
                <span className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#00E08C]" />
                </span>
                <div>
                  <p className="text-sm font-bold">{t}</p>
                  <p className="text-sm text-slate-300/90 mt-0.5 leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="cs-rise cs-d6 flex items-center gap-2 text-xs text-slate-400">
          <Lock className="w-3.5 h-3.5 text-[#00E08C]" />
          Zero-knowledge · client data is never stored in readable form
        </p>
      </aside>

      <main className="flex flex-col items-center justify-center px-4 py-10 sm:py-16 min-h-screen lg:min-h-0">
        <div className="w-full max-w-[420px]">
          <Link href="/" className="cs-rise lg:hidden flex justify-center mb-8">
            <CheckSafeLogo darkSurface={false} size="md" />
          </Link>

          <div className="cs-rise cs-d1 app-card rounded-[28px] p-6 sm:p-8">
            <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-emerald-700">{eyebrow}</p>
            <h1 className="mt-1.5 text-2xl sm:text-[28px] font-extrabold text-[#0B2545] tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{subtitle}</p>}
            <div className="mt-6">{children}</div>
          </div>

          {footer && <div className="cs-rise cs-d2 mt-5 text-center text-sm text-slate-500">{footer}</div>}

          <p className="cs-rise cs-d3 mt-6 lg:hidden flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <Lock className="w-3 h-3" />
            Zero-knowledge encryption · client data never readable
          </p>
        </div>
      </main>
    </div>
  );
}

export function PrimaryButton({ loading, children, className = "", ...props }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`cs-press w-full min-h-[52px] rounded-full bg-[#0B2545] hover:bg-[#123461] disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_24px_-12px_rgba(11,37,69,0.6)] ${className}`}
    >
      {children}
    </button>
  );
}
