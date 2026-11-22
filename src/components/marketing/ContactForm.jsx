"use client";
import { useState } from "react";
import { ArrowRight, Building2, LifeBuoy, Check, Loader2 } from "lucide-react";
import { COUNTRY_LIST, SUPPORTED_COUNTRIES, COUNTRY_FLAGS } from "@/lib/countries";

const field =
  "w-full h-12 px-4 rounded-2xl bg-[#F9FAFB] border border-slate-200 text-[15px] text-[#0B2545] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#0B2545] focus:ring-4 focus:ring-[#0B2545]/8 transition";
const label = "block text-xs font-semibold text-slate-700 mb-1.5";

const TABS = [
  { id: "team", label: "Team demo", icon: Building2 },
  { id: "support", label: "Support", icon: LifeBuoy },
];

export function ContactForm() {
  const [tab, setTab] = useState("team");
  const [phoneCountry, setPhoneCountry] = useState("GB");
  const [state, setState] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setState("sending");
    await new Promise((r) => setTimeout(r, 800));
    setState("sent");
  }

  function switchTab(id) {
    setTab(id);
    setState("idle");
  }

  return (
    <div>
      <div role="tablist" aria-label="Enquiry type" className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-slate-100">
        {TABS.map(({ id, label: text, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            type="button"
            onClick={() => switchTab(id)}
            className={`cs-press h-12 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer ${
              tab === id ? "bg-white text-[#0B2545] shadow-sm" : "text-slate-500 hover:text-[#0B2545]"
            }`}
          >
            <Icon className={`w-4 h-4 ${tab === id ? "text-emerald-600" : ""}`} />
            {text}
          </button>
        ))}
      </div>

      {state === "sent" ? (
        <div className="py-14 text-center">
          <span className="cs-pop mx-auto w-16 h-16 rounded-full bg-[#16A34A] flex items-center justify-center shadow-[0_0_0_10px_rgba(22,163,74,0.12)]">
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </span>
          <h3 className="mt-6 text-2xl font-semibold tracking-tight">Message received</h3>
          <p className="mt-2 text-[15px] text-slate-600 max-w-[40ch] mx-auto">
            Thanks for getting in touch. We&apos;ll reply by email during UK business hours.
          </p>
          <button
            type="button"
            onClick={() => setState("idle")}
            className="cs-press mt-6 h-11 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-sm font-semibold cursor-pointer"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form key={tab} onSubmit={handleSubmit} className="cs-rise mt-7 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="c-name" className={label}>
                Full name
              </label>
              <input id="c-name" required autoComplete="name" className={field} placeholder="Alex Morgan" />
            </div>
            <div>
              <label htmlFor="c-email" className={label}>
                Work email
              </label>
              <input id="c-email" type="email" required autoComplete="email" className={field} placeholder="alex@company.co.uk" />
            </div>
          </div>

          {tab === "team" ? (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-company" className={label}>
                    Organisation
                  </label>
                  <input id="c-company" required autoComplete="organization" className={field} placeholder="Company name" />
                </div>
                <div>
                  <label htmlFor="c-phone" className={label}>
                    Phone <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      aria-label="Phone country code"
                      value={phoneCountry}
                      onChange={(e) => setPhoneCountry(e.target.value)}
                      className={`${field} !w-auto !px-3 text-sm font-semibold cursor-pointer`}
                    >
                      {COUNTRY_LIST.map((c) => (
                        <option key={c.code} value={c.code}>
                          {COUNTRY_FLAGS[c.code]} {c.dialCode}
                        </option>
                      ))}
                    </select>
                    <input
                      id="c-phone"
                      type="tel"
                      autoComplete="tel"
                      className={`${field} flex-1 min-w-0`}
                      placeholder={(SUPPORTED_COUNTRIES[phoneCountry] || SUPPORTED_COUNTRIES.GB).phonePlaceholder}
                    />
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-size" className={label}>
                    Team size
                  </label>
                  <select id="c-size" defaultValue="5-10" className={`${field} cursor-pointer`}>
                    <option value="5-10">5–10 people</option>
                    <option value="11-25">11–25 people</option>
                    <option value="26-50">26–50 people</option>
                    <option value="51-150">51–150 people</option>
                    <option value="150+">150+ people</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="c-sector" className={label}>
                    Sector
                  </label>
                  <select id="c-sector" defaultValue="property" className={`${field} cursor-pointer`}>
                    <option value="property">Property</option>
                    <option value="tuition">Private tuition</option>
                    <option value="wellness">Mobile wellness &amp; care</option>
                    <option value="independent">Independent professionals</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="c-topic" className={label}>
                Topic
              </label>
              <select id="c-topic" defaultValue="numbers" className={`${field} cursor-pointer`}>
                <option value="numbers">Masked numbers</option>
                <option value="checks">Client ID checks</option>
                <option value="codes">Safe Code or Duress Code</option>
                <option value="billing">Billing, seats or Hibernation</option>
                <option value="other">Something else</option>
              </select>
            </div>
          )}

          <div>
            <label htmlFor="c-message" className={label}>
              {tab === "team" ? "What would you like to cover?" : "How can we help?"}
            </label>
            <textarea
              id="c-message"
              rows={4}
              required={tab === "support"}
              className={`${field} !h-auto py-3 resize-none`}
              placeholder={tab === "team" ? "Your team's lone-working setup and timescales…" : "Tell us what's happening…"}
            />
          </div>

          <p className="text-xs text-slate-500">
            In an emergency, don&apos;t use this form. Call your local emergency number.
          </p>

          <button
            type="submit"
            disabled={state === "sending"}
            className="cs-press group w-full h-14 rounded-full bg-[#0B2545] hover:bg-[#123461] disabled:opacity-70 text-white text-base font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-[0_12px_28px_-14px_rgba(11,37,69,0.7)]"
          >
            {state === "sending" ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            {tab === "team" ? "Request a team demo" : "Send message"}
            {state !== "sending" && <ArrowRight className="w-5 h-5 text-[#00E08C] transition-transform group-hover:translate-x-1" />}
          </button>
        </form>
      )}
    </div>
  );
}
