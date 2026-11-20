"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";
import { CheckSafetyLogo } from "@/components/ui/CheckSafetyLogo";
import { useToast } from "@/components/ui/ToastProvider";
export default function ResetPasswordPage() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await new Promise((r) => setTimeout(r, 400));
            setSent(true);
            showToast("Password reset link sent.", "success");
        }
        finally {
            setLoading(false);
        }
    }
    return (<div className="min-h-screen bg-[#F8F7F5] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px] space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center">
            <CheckSafetyLogo darkSurface={false} size="md"/>
          </Link>
        </div>

        <div className="editorial-card bg-white rounded-[32px] p-6 sm:p-8">
          <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-emerald-700">
            /01 Recovery
          </div>
          <h1 className="text-2xl font-extrabold text-[#111215] mt-1">Reset password</h1>
          <p className="text-xs text-slate-500 mt-1">
            Enter your professional email to receive a single-use reset link.
          </p>

          {sent ? (<div className="mt-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
              If an account exists for <strong>{email}</strong>, a password reset link has been
              sent.
            </div>) : (<form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="reset-email" className="block text-xs font-semibold text-slate-700 mb-1">
                  Email address
                </label>
                <input id="reset-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@example.co.uk" className="w-full h-12 px-3.5 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827]"/>
              </div>

              <button type="submit" disabled={loading} className="w-full min-h-[48px] rounded-full bg-[#111215] hover:bg-black disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-sm hover:scale-[1.01]">
                {loading && <Loader2 className="w-4 h-4 animate-spin"/>}
                <span>{loading ? "Sending..." : "Send reset link"}</span>
              </button>
            </form>)}

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <Link href="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#111827] transition">
              <ArrowLeft className="w-3.5 h-3.5"/>
              <span>Back to sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>);
}
