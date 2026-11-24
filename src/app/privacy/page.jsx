import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { MarketingPage, PageHero, WRAP } from "@/components/marketing/Marketing";
import { COMPANY_NAME, PRIMARY_DOMAIN } from "@/lib/domains";

export const metadata = {
  title: "Privacy policy — CheckSafe",
  description: "How CheckSafe handles worker and client data under UK GDPR, with zero readable client records.",
};

const SECTIONS = [
  { id: "controller", title: "Who we are" },
  { id: "identity", title: "Client ID checks" },
  { id: "numbers", title: "Masked phone numbers" },
  { id: "location", title: "Location data" },
  { id: "retention", title: "How long we keep data" },
  { id: "rights", title: "Your rights" },
  { id: "contact", title: "Contact & complaints" },
];

const RETENTION = [
  ["Client ID photos, selfies and names", "Deleted through Veriff within 60 seconds of the check", "Data minimisation"],
  ["Client phone number (encrypted)", "Deleted when a session closes safely; kept 30 days after an alert, then deleted", "Masked calls and incident follow-up"],
  ["Call and SMS logs (Twilio)", "Deleted on the same schedule as the client phone number", "Data minimisation"],
  ["Client fingerprint and check result", "While the client is in your Trusted Client Vault", "£0 repeat sessions"],
  ["Red-flag reports (anonymous fingerprint)", "Severe safety and non-payment reports are kept permanently", "Protecting other workers"],
  ["Alert and SMS delivery logs", "3 years", "Health and safety records"],
  ["Worker account and billing data", "Length of subscription plus 6 years", "Tax and accounting law"],
];

function Section({ id, n, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 pt-12 first:pt-0 border-t first:border-t-0 border-slate-200">
      <p className="font-serif italic text-2xl text-emerald-700">§{n}</p>
      <h2 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-[#0B2545]">{title}</h2>
      <div className="mt-5 space-y-4 text-[15px] sm:text-base text-slate-600 leading-relaxed [&_strong]:text-[#0B2545] [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:marker:text-emerald-600">
        {children}
      </div>
    </section>
  );
}

function Callout({ children }) {
  return (
    <div className="flex gap-3 p-5 rounded-[22px] bg-[#0B2545] text-slate-200">
      <ShieldCheck className="w-5 h-5 text-[#00E08C] shrink-0 mt-0.5" />
      <div className="text-[15px] leading-relaxed [&_strong]:!text-white">{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <MarketingPage active="privacy">
      <PageHero
        eyebrow="Privacy policy"
        image="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=2000&q=80"
        imagePosition="center 35%"
        title="Privacy by design,"
        accent="not just policy."
        lead="How CheckSafe handles worker and client data under UK GDPR and the Data Protection Act 2018, and why client details are never stored in readable form."
      >
        <ul className="flex flex-wrap gap-2">
          {["Last updated: November 2026", "UK GDPR & DPA 2018", "London data region"].map((t) => (
            <li key={t} className="px-3.5 py-2 rounded-full bg-white/[0.07] border border-white/10 text-xs font-medium text-slate-200">
              {t}
            </li>
          ))}
        </ul>
      </PageHero>

      <div className={`${WRAP} py-16 sm:py-24 grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-20 items-start`}>
        <aside className="lg:sticky lg:top-28">
          <nav aria-label="On this page" className="rounded-[24px] bg-[#F8F7F5] p-5">
            <p className="text-[11px] font-mono font-semibold tracking-[0.2em] uppercase text-slate-500 px-2">On this page</p>
            <ol className="mt-3 grid grid-cols-2 lg:grid-cols-1 gap-1">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex gap-2 px-2 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-[#0B2545] hover:bg-white transition"
                  >
                    <span className="font-serif italic text-emerald-700 w-4">{i + 1}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <Link
            href="/contact"
            className="mt-4 hidden lg:inline-flex items-center gap-1.5 px-2 text-sm font-semibold text-[#0B2545] hover:gap-2.5 transition-all"
          >
            Questions? Contact us <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          </Link>
        </aside>

        <article className="max-w-[760px] space-y-12">
          <Section id="controller" n={1} title="Who we are">
            <p>
              This policy explains how <strong>{COMPANY_NAME}</strong> (&ldquo;CheckSafe&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) processes
              personal data, registered in England and Wales under company number 14892011, at 100 Leadenhall Street, London EC3A 3BP.
            </p>
            <p>
              We are the <strong>data controller</strong> for the workers and agency admins who use CheckSafe. For clients who complete an ID
              check at a worker&apos;s request, we act as a <strong>data processor</strong> on that worker&apos;s behalf.
            </p>
          </Section>

          <Section id="identity" n={2} title="Client ID checks">
            <Callout>
              <strong>We never keep ID images, selfies or names.</strong> Our verification partner deletes them within 60 seconds of each
              check. We keep only an anonymous fingerprint and the result.
            </Callout>
            <p>
              When a worker requests a check, their client receives a single-use link and completes an automated check with our partner,{" "}
              <strong>Veriff</strong>. The client provides:
            </p>
            <ul>
              <li>a photo of a government-issued ID, such as a passport or driving licence;</li>
              <li>a live selfie, to confirm the ID belongs to them.</li>
            </ul>
            <p>
              The worker enters the client&apos;s phone number when creating the link. We turn it into a one-way{" "}
              <strong>HMAC-SHA256 fingerprint</strong> using a secret key held only on our servers. The fingerprint lets us recognise a
              returning client, or a client reported by another worker, without being able to read who they are.
            </p>
          </Section>

          <Section id="numbers" n={3} title="Masked phone numbers">
            <p>
              Each worker gets dedicated phone numbers, provided through <strong>Twilio</strong>. Calls and texts between a worker and their
              client go through these numbers, so:
            </p>
            <ul>
              <li>clients only ever see the worker&apos;s CheckSafe number, never their personal mobile;</li>
              <li>the client&apos;s real number is held encrypted only while it&apos;s needed to connect calls, and is never shown in the app;</li>
              <li>call and SMS logs are deleted on the same schedule as the client&apos;s number (see section 5).</li>
            </ul>
          </Section>

          <Section id="location" n={4} title="Location data">
            <p>We don&apos;t track workers. Specifically:</p>
            <ul>
              <li>
                <strong>Appointment address only.</strong> For each session the worker enters the appointment address, or fills it once from
                their phone&apos;s location.
              </li>
              <li>
                <strong>Shared only in an alert.</strong> The address is sent to the worker&apos;s emergency contact only if a session isn&apos;t
                closed in time, or the worker uses their Duress Code or SOS.
              </li>
              <li>
                <strong>No background tracking.</strong> CheckSafe doesn&apos;t collect location when no session is running.
              </li>
            </ul>
          </Section>

          <Section id="retention" n={5} title="How long we keep data">
            <p>We keep data only as long as it&apos;s needed for safety, legal and accounting purposes:</p>
            <div className="rounded-[22px] border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F8F7F5] text-[#0B2545]">
                  <tr>
                    <th className="p-4 font-semibold">Data</th>
                    <th className="p-4 font-semibold">How long</th>
                    <th className="p-4 font-semibold hidden sm:table-cell">Why</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {RETENTION.map(([data, period, why]) => (
                    <tr key={data} className="align-top">
                      <td className="p-4 font-medium text-[#0B2545]">{data}</td>
                      <td className="p-4">{period}</td>
                      <td className="p-4 text-slate-500 hidden sm:table-cell">{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="rights" n={6} title="Your rights">
            <p>
              Under <strong>UK GDPR</strong> and the <strong>Data Protection Act 2018</strong>, workers and clients can:
            </p>
            <ul>
              <li>
                <strong>access</strong> the personal data we hold about them;
              </li>
              <li>
                <strong>correct</strong> inaccurate data, such as an emergency contact, which workers can also do in their console;
              </li>
              <li>
                <strong>ask for deletion</strong> where we no longer have a legal reason to keep the data;
              </li>
              <li>
                <strong>object</strong> to non-essential messages at any time.
              </li>
            </ul>
          </Section>

          <Section id="contact" n={7} title="Contact & complaints">
            <div className="p-6 rounded-[22px] bg-[#F8F7F5] text-[15px] space-y-1">
              <p className="font-semibold text-[#0B2545]">Data Protection Officer</p>
              <p>{COMPANY_NAME}, 100 Leadenhall Street, London EC3A 3BP</p>
              <p>
                <a href={`mailto:compliance@${PRIMARY_DOMAIN}`} className="font-mono font-semibold text-[#0B2545] hover:underline underline-offset-4">
                  compliance@{PRIMARY_DOMAIN}
                </a>
              </p>
            </div>
            <p>
              If you&apos;re unhappy with how we&apos;ve handled your data, you can complain to the{" "}
              <strong>Information Commissioner&apos;s Office</strong> at{" "}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0B2545] underline underline-offset-4">
                ico.org.uk
              </a>
              .
            </p>
          </Section>
        </article>
      </div>
    </MarketingPage>
  );
}
