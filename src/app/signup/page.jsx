"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { CheckSafetyLogo } from "@/components/ui/CheckSafetyLogo";
import { COUNTRY_LIST, SUPPORTED_COUNTRIES } from "@/lib/countries";
import { useToast } from "@/components/ui/ToastProvider";
export default function SignupPage() {
    const [country, setCountry] = useState("GB");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [emergencyContact, setEmergencyContact] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const router = useRouter();
    const countryCfg = SUPPORTED_COUNTRIES[country];
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await new Promise((r) => setTimeout(r, 500));
            showToast("Account created. Check your inbox for confirmation.", "success");
            router.push("/dashboard");
        }
        finally {
            setLoading(false);
        }
    }
    return (<div className="min-h-screen bg-[#F8F7F5] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px] space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center">
            <CheckSafetyLogo darkSurface={false} size="md"/>
          </Link>
        </div>

        <div className="editorial-card bg-white rounded-[32px] p-6 sm:p-8">
          <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-emerald-700">
            /01 Registration
          </div>
          <h1 className="text-2xl font-extrabold text-[#111215] mt-1">Create worker account</h1>
          <p className="text-xs text-slate-500 mt-1">
            We only send account confirmation and password reset emails.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="signup-country" className="block text-xs font-semibold text-slate-700 mb-1">
                Operating Country &amp; Emergency Dispatch
              </label>
              <select id="signup-country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full h-12 px-3 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm font-semibold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827] cursor-pointer">
                {COUNTRY_LIST.map((c) => (<option key={c.code} value={c.code}>
                    {c.name} ({c.code}) — {c.emergencyNumber}
                  </option>))}
              </select>
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-xs font-semibold text-slate-700 mb-1">
                Professional email
              </label>
              <input id="signup-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@example.co.uk" className="w-full h-12 px-3.5 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827]"/>
            </div>

            <div>
              <label htmlFor="signup-mobile" className="block text-xs font-semibold text-slate-700 mb-1">
                Your mobile (for masked calls &amp; SMS fallback)
              </label>
              <input id="signup-mobile" type="tel" required value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder={countryCfg.phonePlaceholder} className="w-full h-12 px-3.5 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827]"/>
            </div>

            <div>
              <label htmlFor="signup-emergency" className="block text-xs font-semibold text-slate-700 mb-1">
                Emergency peer contact mobile
              </label>
              <input id="signup-emergency" type="tel" required value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} placeholder={countryCfg.phonePlaceholder} className="w-full h-12 px-3.5 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827]"/>
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input id="signup-password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 8 characters" className="w-full h-12 px-3.5 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827]"/>
            </div>

            <button type="submit" disabled={loading} className="w-full min-h-[48px] rounded-full bg-[#111215] hover:bg-black disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer mt-2 shadow-sm hover:scale-[1.01]">
              {loading && <Loader2 className="w-4 h-4 animate-spin"/>}
              <span>{loading ? "Creating account..." : "Create account"}</span>
            </button>
          </form>

          <p className="mt-6 text-xs text-center text-slate-600">
            Already registered?{" "}
            <Link href="/login" className="font-bold text-[#111827] underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>);
}
