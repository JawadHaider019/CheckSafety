"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { CheckSafetyLogo } from "@/components/ui/CheckSafetyLogo";
import { useToast } from "@/components/ui/ToastProvider";
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const router = useRouter();
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await new Promise((r) => setTimeout(r, 400));
            showToast("Signed in to your worker account.", "success");
            router.push("/dashboard");
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
            /01 Authentication
          </div>
          <h1 className="text-2xl font-extrabold text-[#111215] mt-1">Sign in</h1>
          <p className="text-xs text-slate-500 mt-1">
            Access your safety timer, proxy lines, and Trusted Client Vault.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-slate-700 mb-1">
                Email address
              </label>
              <input id="login-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@example.co.uk" className="w-full h-12 px-3.5 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827]"/>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="login-password" className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <Link href="/reset-password" className="text-xs font-semibold text-slate-600 hover:text-[#111827]">
                  Forgot password?
                </Link>
              </div>
              <input id="login-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full h-12 px-3.5 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827]"/>
            </div>

            <button type="submit" disabled={loading} className="w-full min-h-[48px] rounded-full bg-[#111215] hover:bg-black disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-sm hover:scale-[1.01]">
              {loading && <Loader2 className="w-4 h-4 animate-spin"/>}
              <span>{loading ? "Signing in..." : "Sign in"}</span>
            </button>
          </form>

          <p className="mt-6 text-xs text-center text-slate-600">
            New to CheckSafety?{" "}
            <Link href="/signup" className="font-bold text-[#111827] underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>);
}
