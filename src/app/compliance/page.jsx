import { Check, X, Scale, FileCheck, Lock } from "lucide-react";
import { MarketingPage, PageHero, Eyebrow, Accent, WRAP, H2 } from "@/components/marketing/Marketing";
import { SecurityPackForm } from "@/components/marketing/SecurityPackForm";
import { DEFAULT_APP_SETTINGS } from "@/lib/types";

export const metadata = {
  title: "Compliance & duty of care — Checksafe",
  description:
    "How Checksafe helps UK employers and solo workers meet lone-working duties of care, with automated alerts and zero readable client data.",
};

const HERO_FACTS = [
  ["60s", "ID files deleted after each check"],
  ["2-stage", "Automated alert escalation"],
  ["0", "Readable client records stored"],
  ["London", "Data region"],
];

const DUTIES = [
  {
    title: "Verify before you attend",
    body: "A single-use ID check for the client before the address is shared or keys are handed over.",
  },
  {
    title: "Escalation that doesn't rely on the phone",
    body: "Timers run on our servers. A missed check-in triggers a warning to the worker, then an alert to their contact.",
  },
  {
    title: "No awkward conversations",
    body: "The ID check is part of booking, so workers never have to ask a stranger for documents at the door.",
  },
  {
    title: "Team cover without surveillance",
    body: `Team seats from £${DEFAULT_APP_SETTINGS.agency_seat_price_gbp}/month. Admins manage seats but can't see staff sessions or client vaults.`,
  },
];

const SAFEGUARDS = [
  {
    title: "Private communication",
    risk: "Workers' personal numbers end up with unknown clients, leading to harassment out of hours.",
    answer: "Each worker gets dedicated Checksafe numbers. Clients call and text those; the personal mobile is never shown.",
  },
  {
    title: "Raising the alarm under pressure",
    risk: "A worker being watched or coerced can't openly call for help.",
    answer: "A Duress Code looks like a normal safe check-in on screen while alerting the emergency contact. A triple-tap shows a fake low-battery screen.",
  },
  {
    title: "Missed check-ins",
    risk: "Nobody notices a worker hasn't left an appointment until hours later.",
    answer: "Sessions of 15 minutes to 4 hours. If the Safe Code isn't entered, the worker is warned, then after 5 minutes their contact gets the address.",
  },
  {
    title: "Poor or no mobile data",
    risk: "Basements, plant rooms and rural sites often have signal but no data.",
    answer: "Workers can text their Safe Code, or “SOS”, to their Checksafe number. Only texts from their registered mobile are accepted.",
  },
  {
    title: "Unknown clients",
    risk: "Workers meet people they know nothing about, alone.",
    answer: "Single-use ID links through Veriff. Clients reported by other workers are flagged High risk, using anonymous fingerprints only.",
  },
];

const COMPARISON = [
  { feature: "Client ID check before the meeting", checksafe: true, pendant: false, chat: false },
  { feature: "Personal number kept private", checksafe: true, pendant: false, chat: false },
  { feature: "Covert alarm (Duress Code, fake low battery)", checksafe: true, pendant: false, chat: false },
  { feature: "Alerts fire even if the phone dies", checksafe: true, pendant: true, chat: false },
  { feature: "Check in by SMS without data", checksafe: true, pendant: false, chat: false },
  { feature: "No extra device to carry or charge", checksafe: true, pendant: false, chat: true },
];

function Mark({ yes, dark = false }) {
  return yes ? (
    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${dark ? "text-[#00E08C]" : "text-emerald-700"}`}>
      <Check className="w-4 h-4" /> Yes
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
      <X className="w-4 h-4" /> No
    </span>
  );
}

export default function CompliancePage() {
  return (
    <MarketingPage active="compliance">
      <PageHero
        eyebrow="Compliance & duty of care"
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2000&q=80"
        imagePosition="center 40%"
        title="Duty of care,"
        accent="built in."
        lead="How Checksafe helps UK employers and solo workers meet their lone-working responsibilities, while keeping client data unreadable by design."
      >
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/10">
          {HERO_FACTS.map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="text-3xl sm:text-4xl font-semibold tracking-tight">{value}</dd>
              <dd className="mt-1 text-sm text-slate-400">{label}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="py-16 sm:py-28">
        <div className={`${WRAP} grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-20 items-start`}>
          <div className="mk-reveal lg:sticky lg:top-28">
            <Eyebrow>Statutory responsibilities</Eyebrow>
            <h2 className={`${H2} mt-4`}>
              Lone-worker safety <Accent>can&apos;t be delegated.</Accent>
            </h2>
            <div className="mt-6 space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              <p>
                Under the <strong className="text-[#0B2545]">Health and Safety at Work etc. Act 1974</strong> and the{" "}
                <strong className="text-[#0B2545]">Management of Health and Safety at Work Regulations 1999</strong>, employers must assess
                lone-working risks and put measures in place before staff attend off-site appointments.
              </p>
              <p>
                Informal check-ins by text or missed-call agreements leave gaps. Checksafe gives every appointment a timed, automatic
                safety net with a clear record of what happened.
              </p>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-slate-500">
              <Scale className="w-4 h-4 text-emerald-700" />
              This page is general information, not legal advice.
            </p>
          </div>

          <ol className="mk-stagger grid sm:grid-cols-2 gap-4 sm:gap-5">
            {DUTIES.map((d, i) => (
              <li key={d.title} data-fx className="mk-reveal rounded-[28px] bg-[#F8F7F5] border border-slate-200/70 p-7">
                <p className="fx-num font-serif italic text-3xl text-emerald-700">0{i + 1}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{d.title}</h3>
                <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">{d.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-28 bg-[#F8F7F5]">
        <div className={WRAP}>
          <div className="mk-reveal max-w-[760px]">
            <Eyebrow>Risk by risk</Eyebrow>
            <h2 className={`${H2} mt-4`}>
              Each risk, <Accent>a specific safeguard.</Accent>
            </h2>
          </div>
          <ol className="mk-stagger mt-12 sm:mt-16 border-t border-slate-300/60">
            {SAFEGUARDS.map((s, i) => (
              <li key={s.title} className="mk-reveal grid md:grid-cols-[80px_1fr_1fr] gap-3 md:gap-10 py-8 sm:py-10 border-b border-slate-300/60">
                <p className="font-serif italic text-3xl text-emerald-700">0{i + 1}</p>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-700">The risk: </span>
                    {s.risk}
                  </p>
                </div>
                <p className="text-[15px] sm:text-base text-[#0B2545] leading-relaxed md:pt-1">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 mr-1">
                    <Check className="w-4 h-4" /> Checksafe:
                  </span>
                  {s.answer}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-28">
        <div className={WRAP}>
          <div className="mk-reveal max-w-[760px]">
            <Eyebrow>Compared</Eyebrow>
            <h2 className={`${H2} mt-4`}>
              Pendants, chat apps, <Accent>or Checksafe.</Accent>
            </h2>
          </div>

          <div className="mk-reveal mt-12 sm:mt-16 hidden md:block rounded-[28px] border border-slate-200/80 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm">
                  <th className="py-5 px-7 font-semibold text-slate-500">Capability</th>
                  <th className="py-5 px-7 font-semibold bg-[#0B2545] text-white">Checksafe</th>
                  <th className="py-5 px-7 font-semibold text-slate-500">Hardware pendant</th>
                  <th className="py-5 px-7 font-semibold text-slate-500">Group chat check-ins</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80">
                {COMPARISON.map((row) => (
                  <tr key={row.feature}>
                    <td className="py-5 px-7 text-[15px] font-medium">{row.feature}</td>
                    <td className="py-5 px-7 bg-[#0B2545]">
                      <Mark yes={row.checksafe} dark />
                    </td>
                    <td className="py-5 px-7">
                      <Mark yes={row.pendant} />
                    </td>
                    <td className="py-5 px-7">
                      <Mark yes={row.chat} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mk-stagger mt-10 md:hidden space-y-3">
            {COMPARISON.map((row) => (
              <li key={row.feature} data-fx="soft" className="mk-reveal rounded-[22px] border border-slate-200/80 p-5">
                <p className="text-base font-semibold">{row.feature}</p>
                <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  {[
                    ["Checksafe", row.checksafe],
                    ["Pendant", row.pendant],
                    ["Group chat", row.chat],
                  ].map(([label, yes]) => (
                    <div key={label} className={`rounded-xl p-2.5 ${label === "Checksafe" ? "bg-[#0B2545] text-white" : "bg-[#F8F7F5]"}`}>
                      <dt className={label === "Checksafe" ? "text-slate-300" : "text-slate-500"}>{label}</dt>
                      <dd className="mt-1">
                        <Mark yes={yes} dark={label === "Checksafe"} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-4 sm:py-6 px-2.5 sm:px-4 lg:px-6">
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[40px] navy-gradient text-white py-16 sm:py-24">
          <div className={`${WRAP} relative grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
            <div className="mk-reveal">
              <Eyebrow dark>Security pack</Eyebrow>
              <h2 className={`${H2} mt-4`}>
                For your safety <Accent dark>committee.</Accent>
              </h2>
              <ul className="mt-8 space-y-4 text-base text-slate-300">
                {[
                  [FileCheck, "Data Processing Agreement (DPA)"],
                  [Lock, "Security and data-handling overview"],
                  [Scale, "Alert protocol and escalation documentation"],
                ].map(([Icon, text]) => (
                  <li key={text} className="flex items-start gap-3">
                    <Icon className="w-5 h-5 mt-0.5 text-[#00E08C] shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mk-reveal rounded-[28px] bg-white/[0.05] border border-white/10 p-5 sm:p-8">
              <SecurityPackForm />
            </div>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
