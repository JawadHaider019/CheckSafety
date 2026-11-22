"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Loader2, ArrowLeft, ArrowRight, MailCheck } from "lucide-react";
import { useToast } from "@/components/ui/ToastProvider";
import { AuthShell, PrimaryButton } from "@/components/ui/AuthShell";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSent(true);
    showToast("Password reset link sent.", "success");
  }

  return (
    <AuthShell
      eyebrow="Account recovery"
      title={sent ? "Check your inbox" : "Reset your password"}
      subtitle={sent ? undefined : "We'll email you a single-use reset link."}
      footer={
        <Link href="/login" className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-[#0B2545] transition">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="text-center">
          <div className="cs-pop mx-auto w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <MailCheck className="w-7 h-7 text-[#16A34A]" />
          </div>
          <p className="cs-rise cs-d2 mt-5 text-sm text-slate-600 leading-relaxed">
            If an account exists for <strong className="text-[#0B2545] break-all">{email}</strong>, a reset link
            is on its way. It expires in 60 minutes. Check your spam folder too.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="cs-rise cs-d3 mt-5 text-xs font-semibold text-slate-500 hover:text-[#0B2545] transition cursor-pointer"
          >
            Use a different email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reset-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email address
            </label>
            <input
              id="reset-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.co.uk"
              className="cs-input"
            />
          </div>
          <PrimaryButton type="submit" loading={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending…</span>
              </>
            ) : (
              <>
                <span>Send reset link</span>
                <ArrowRight className="w-4 h-4 text-[#00E08C]" />
              </>
            )}
          </PrimaryButton>
        </form>
      )}
    </AuthShell>
  );
}
