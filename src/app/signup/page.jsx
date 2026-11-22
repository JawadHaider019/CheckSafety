"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Users, ArrowRight, Eye, EyeOff, Minus, Plus } from "lucide-react";
import { COUNTRY_LIST, SUPPORTED_COUNTRIES, COUNTRY_FLAGS } from "@/lib/countries";
import { DEFAULT_APP_SETTINGS } from "@/lib/types";
import { useSearchString } from "@/lib/useClientSnapshot";
import { startSession, useSession } from "@/lib/demoAuth";
import { useToast } from "@/components/ui/ToastProvider";
import { AuthShell, PrimaryButton } from "@/components/ui/AuthShell";

const PLANS = [
  { id: "core", label: "Core", lines: 1, priceKey: "core_price_gbp" },
  { id: "pro", label: "Pro", lines: 2, priceKey: "pro_price_gbp" },
  { id: "elite", label: "Elite", lines: 5, priceKey: "elite_price_gbp" },
  { id: "agency", label: "Team", lines: 1, priceKey: "agency_seat_price_gbp" },
];

function passwordScore(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

function PhoneField({ id, label, country, onCountry, value, onChange }) {
  const cfg = SUPPORTED_COUNTRIES[country] || SUPPORTED_COUNTRIES.GB;
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-slate-700 mb-1.5">
        {label}
      </label>
      <div className="flex gap-2">
        <select
          aria-label={`${label} country code`}
          value={country}
          onChange={(e) => onCountry(e.target.value)}
          className="cs-input !w-auto !px-2.5 text-xs font-semibold shrink-0 cursor-pointer"
        >
          {COUNTRY_LIST.map((c) => (
            <option key={c.code} value={c.code}>
              {COUNTRY_FLAGS[c.code]} {c.dialCode}
            </option>
          ))}
        </select>
        <input
          id={id}
          type="tel"
          required
          autoComplete="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={cfg.phonePlaceholder}
          className="cs-input flex-1 min-w-0"
        />
      </div>
    </div>
  );
}

export default function SignupPage() {
  const [country, setCountry] = useState("GB");
  const [mobileCountry, setMobileCountry] = useState("GB");
  const [emergencyCountry, setEmergencyCountry] = useState("GB");
  const [plan, setPlan] = useState("pro");
  const [agencySeats, setAgencySeats] = useState(5);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();
  const settings = DEFAULT_APP_SETTINGS;
  const session = useSession();

  useEffect(() => {
    if (session.status === "in" && !loading) router.replace("/dashboard");
  }, [session.status, loading, router]);

  const search = useSearchString();
  const [appliedSearch, setAppliedSearch] = useState("");
  if (search !== appliedSearch) {
    setAppliedSearch(search);
    const params = new URLSearchParams(search);
    const urlCountry = params.get("country");
    const urlPlan = params.get("plan");
    const urlSeats = Number(params.get("seats"));
    if (urlCountry && SUPPORTED_COUNTRIES[urlCountry]) {
      setCountry(urlCountry);
      setMobileCountry(urlCountry);
      setEmergencyCountry(urlCountry);
    }
    if (urlPlan && PLANS.some((p) => p.id === urlPlan)) setPlan(urlPlan);
    if (urlSeats >= 5) setAgencySeats(urlSeats);
    const urlEmail = params.get("email");
    if (urlEmail) setEmail(urlEmail);
  }

  function handleCountryChange(code) {
    setCountry(code);
    setMobileCountry(code);
    setEmergencyCountry(code);
  }

  const countryCfg = SUPPORTED_COUNTRIES[country] || SUPPORTED_COUNTRIES.GB;
  const selectedPlan = PLANS.find((p) => p.id === plan);
  const score = passwordScore(password);
  const scoreLabel = ["Too short", "Weak", "Fair", "Good", "Strong"][score];
  const scoreColor = ["bg-slate-200", "bg-[#DC2626]", "bg-amber-500", "bg-emerald-500", "bg-[#16A34A]"][score];

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.length < 8) {
      showToast("Password must be at least 8 characters.", "error");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    startSession(email);
    showToast("Account created. Check your inbox to confirm your email.", "success");
    router.push("/dashboard");
  }

  return (
    <AuthShell
      eyebrow="Create worker account"
      title="Start your protection"
      subtitle="Takes about a minute. We only email you to confirm your account."
      footer={
        <>
          Already registered?{" "}
          <Link href="/login" className="font-bold text-[#0B2545] hover:underline underline-offset-4">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <fieldset>
          <legend className="text-xs font-semibold text-slate-700 mb-1.5">Plan</legend>
          <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-slate-100">
            {PLANS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlan(p.id)}
                aria-pressed={plan === p.id}
                className={`cs-press min-h-[52px] rounded-xl text-center cursor-pointer ${
                  plan === p.id ? "bg-white shadow-sm text-[#0B2545]" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <span className="block text-xs font-bold">{p.label}</span>
                <span className="block text-[10px] font-mono tabular-nums mt-0.5">
                  {countryCfg.symbol}
                  {settings[p.priceKey]}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            {plan === "agency"
              ? `Team plan · ${countryCfg.symbol}${settings.agency_seat_price_gbp}/seat/month · minimum 5 seats · 1 masked line per seat`
              : `${selectedPlan.label} · ${selectedPlan.lines} dedicated masked ${selectedPlan.lines === 1 ? "line" : "lines"} · billed monthly`}
          </p>

          {plan === "agency" && (
            <div className="cs-rise mt-3 p-3.5 rounded-2xl navy-grid text-white flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-xs font-bold">
                <Users className="w-4 h-4 text-[#00E08C]" />
                Seats
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Remove seat"
                  onClick={() => setAgencySeats((s) => Math.max(5, s - 1))}
                  disabled={agencySeats <= 5}
                  className="cs-press w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-mono font-bold tabular-nums">{agencySeats}</span>
                <button
                  type="button"
                  aria-label="Add seat"
                  onClick={() => setAgencySeats((s) => Math.min(500, s + 1))}
                  className="cs-press w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <span className="ml-1 text-xs font-mono font-bold text-[#00E08C] tabular-nums">
                  {countryCfg.symbol}
                  {agencySeats * settings.agency_seat_price_gbp}/mo
                </span>
              </div>
            </div>
          )}
        </fieldset>

        <div>
          <label htmlFor="signup-country" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Operating country
          </label>
          <select
            id="signup-country"
            value={country}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="cs-input font-semibold cursor-pointer"
          >
            {COUNTRY_LIST.map((c) => (
              <option key={c.code} value={c.code}>
                {COUNTRY_FLAGS[c.code]} {c.name} · emergency {c.emergencyNumber}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="signup-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Email address
          </label>
          <input
            id="signup-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex@example.co.uk"
            className="cs-input"
          />
        </div>

        <div className="pt-1 space-y-4">
          <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-slate-400">Safety contacts</p>
          <PhoneField
            id="signup-mobile"
            label="Your mobile"
            country={mobileCountry}
            onCountry={setMobileCountry}
            value={mobile}
            onChange={setMobile}
          />
          <PhoneField
            id="signup-emergency"
            label="Emergency contact's mobile"
            country={emergencyCountry}
            onCountry={setEmergencyCountry}
            value={emergencyContact}
            onChange={setEmergencyContact}
          />
          <p className="text-[11px] text-slate-500 -mt-2 leading-relaxed">
            This person receives an SMS with your appointment address if you miss a check-in or trigger SOS.
          </p>
        </div>

        <div>
          <label htmlFor="signup-password" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="cs-input pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 grid grid-cols-4 gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-colors duration-300 ${i <= score ? scoreColor : "bg-slate-200"}`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-semibold text-slate-500 w-14 text-right">{scoreLabel}</span>
            </div>
          )}
        </div>

        <PrimaryButton type="submit" loading={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating account…</span>
            </>
          ) : (
            <>
              <span>Create account</span>
              <ArrowRight className="w-4 h-4 text-[#00E08C]" />
            </>
          )}
        </PrimaryButton>
      </form>
    </AuthShell>
  );
}
