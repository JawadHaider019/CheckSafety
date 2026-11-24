"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { COUNTRY_LIST, COUNTRY_FLAGS } from "@/lib/countries";
import { isLoggedIn } from "@/lib/demoAuth";

const field =
  "w-full h-14 px-4 rounded-2xl bg-white/[0.06] border border-white/15 text-white text-[15px] placeholder:text-slate-400 focus:outline-none focus:border-[#00E08C] focus:bg-white/[0.09] focus:ring-4 focus:ring-[#00E08C]/15 transition";

export function GetStartedForm({ plans }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("GB");
  const [plan, setPlan] = useState("pro");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (isLoggedIn()) {
      router.push(`/dashboard?plan=${encodeURIComponent(plan)}`);
      return;
    }
    const params = new URLSearchParams({ email: email.trim(), country, plan });
    router.push(`/signup?${params}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="gs-email" className="sr-only">
          Work email
        </label>
        <input
          id="gs-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your work email"
          className={field}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="gs-country" className="block text-xs font-medium text-slate-400 mb-1.5 pl-1">
            Operating country
          </label>
          <select id="gs-country" value={country} onChange={(e) => setCountry(e.target.value)} className={`${field} cursor-pointer`}>
            {COUNTRY_LIST.map((c) => (
              <option key={c.code} value={c.code} className="text-[#0B2545]">
                {COUNTRY_FLAGS[c.code]} {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="gs-plan" className="block text-xs font-medium text-slate-400 mb-1.5 pl-1">
            Plan
          </label>
          <select id="gs-plan" value={plan} onChange={(e) => setPlan(e.target.value)} className={`${field} cursor-pointer`}>
            {plans.map((p) => (
              <option key={p.id} value={p.id} className="text-[#0B2545]">
                {p.label} · £{p.price}
                {p.suffix}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="cs-press group w-full h-14 rounded-2xl bg-[#00E08C] hover:bg-[#33E8A3] disabled:opacity-70 text-[#07182E] text-base font-semibold flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
        Create my account
        {!loading && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
      </button>
      <p className="text-xs text-slate-400 text-center pt-1">Set up in about a minute · cancel or hibernate anytime</p>
    </form>
  );
}
