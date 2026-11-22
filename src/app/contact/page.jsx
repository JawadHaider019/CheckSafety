import Link from "next/link";
import { MapPin, PhoneCall, ShieldCheck, Clock, ArrowUpRight, Plus } from "lucide-react";
import { MarketingPage, PageHero, Eyebrow, Accent, WRAP, H2 } from "@/components/marketing/Marketing";
import { ContactForm } from "@/components/marketing/ContactForm";
import { COMPANY_NAME, PRIMARY_DOMAIN } from "@/lib/domains";
import { DEFAULT_APP_SETTINGS } from "@/lib/types";

export const metadata = {
  title: "Contact — Checksafe",
  description: "Book a team demo or get help with your Checksafe account.",
};

const FAQS = [
  {
    q: "How quickly can a team get started?",
    a: "The same day. Checksafe runs in the browser and installs to the home screen, so there's no app store step. An agency admin invites staff by email and each person sets up their own Safe Code and emergency contact.",
  },
  {
    q: "Do clients need to download anything to be verified?",
    a: "No. Clients receive a single-use link and complete a quick automated ID check in their phone's browser. The link stops working once it's been used.",
  },
  {
    q: "Can I use Checksafe on my own, without an employer?",
    a: `Yes. Most of our plans are for individuals: estate agents, tutors, therapists and consultants who work alone. Plans start at £${DEFAULT_APP_SETTINGS.core_price_gbp}/month and you choose your own emergency contact.`,
  },
  {
    q: "What if I'm somewhere with no mobile data?",
    a: "Your timer runs on our servers, so alerts still fire if your phone goes offline. With basic signal you can text your Safe Code, or “SOS”, to your Checksafe number.",
  },
  {
    q: "Can an agency admin see my sessions?",
    a: "No. Admins can invite and remove seats and see the bill. They can't see staff session history, client vaults or codes.",
  },
];

const CONTACTS = [
  {
    icon: MapPin,
    title: "London office",
    body: (
      <>
        {COMPANY_NAME}
        <br />
        100 Leadenhall Street, London EC3A 3BP
      </>
    ),
  },
  {
    icon: PhoneCall,
    title: "Phone",
    body: (
      <>
        <a href="tel:+442079460920" className="font-semibold text-[#0B2545] hover:underline underline-offset-4">
          +44 20 7946 0920
        </a>
        <span className="mt-1 flex items-center gap-1.5 text-emerald-700">
          <Clock className="w-3.5 h-3.5" /> Mon–Fri, 08:00–19:00 UK time
        </span>
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: "Security & data protection",
    body: (
      <a href={`mailto:compliance@${PRIMARY_DOMAIN}`} className="font-mono font-semibold text-[#0B2545] hover:underline underline-offset-4 break-all">
        compliance@{PRIMARY_DOMAIN}
      </a>
    ),
  },
];

export default function ContactPage() {
  return (
    <MarketingPage active="contact">
      <PageHero
        eyebrow="Contact"
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=80"
        imagePosition="center"
        title="Talk to"
        accent="a real person."
        lead="Rolling out protection for a team, or need a hand with your account? Tell us what you need and we'll get back to you."
      />

      <section className="py-16 sm:py-24">
        <div className={`${WRAP} grid lg:grid-cols-[1.25fr_0.75fr] gap-8 lg:gap-12 items-start`}>
          <div className="mk-reveal rounded-[32px] bg-white border border-slate-200/80 shadow-[0_30px_60px_-40px_rgba(11,37,69,0.35)] p-5 sm:p-9">
            <ContactForm />
          </div>

          <div className="mk-stagger space-y-4">
            {CONTACTS.map(({ icon: Icon, title, body }) => (
              <div key={title} data-fx className="mk-reveal rounded-[28px] bg-[#F8F7F5] p-6 sm:p-7 flex gap-4">
                <span className="fx-icon w-11 h-11 rounded-2xl bg-[#0B2545] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#00E08C]" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
                  <div className="mt-1 text-sm text-slate-600 leading-relaxed">{body}</div>
                </div>
              </div>
            ))}

            <div data-fx="soft" className="mk-reveal rounded-[28px] navy-grid text-white p-7">
              <h2 className="text-2xl font-semibold tracking-tight">
                Working alone <Accent dark>today?</Accent>
              </h2>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                You don&apos;t need a call to get protected. Set up in about a minute, no contract.
              </p>
              <Link
                href="/signup"
                className="cs-press group mt-5 inline-flex items-center gap-2 h-12 pl-6 pr-4 rounded-full bg-[#00E08C] hover:bg-[#33E8A3] text-[#07182E] text-sm font-semibold"
              >
                Start protection
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28 bg-[#F8F7F5]">
        <div className={`${WRAP} grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20`}>
          <div className="mk-reveal">
            <Eyebrow>Before you write</Eyebrow>
            <h2 className={`${H2} mt-4`}>
              Common <Accent>questions.</Accent>
            </h2>
            <p className="mt-6 text-base text-slate-600">
              More answers on the{" "}
              <Link href="/#faq" className="font-semibold text-[#0B2545] underline underline-offset-4 decoration-emerald-500">
                homepage FAQ
              </Link>
              .
            </p>
          </div>
          <div className="mk-reveal border-t border-slate-300/60">
            {FAQS.map((f) => (
              <details key={f.q} className="mk-faq group border-b border-slate-300/60">
                <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none text-lg sm:text-xl font-semibold tracking-tight">
                  {f.q}
                  <span className="mk-faq-icon w-9 h-9 rounded-full border border-slate-300 bg-white flex items-center justify-center shrink-0 transition-transform duration-300">
                    <Plus className="w-4 h-4" />
                  </span>
                </summary>
                <p className="mk-faq-body pb-6 -mt-1 text-[15px] sm:text-base text-slate-600 leading-relaxed max-w-[62ch]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
