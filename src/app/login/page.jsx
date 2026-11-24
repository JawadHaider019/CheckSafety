"use client";
import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Eye, EyeOff, ArrowRight, AlertCircle, KeyRound } from "lucide-react";
import { useToast } from "@/components/ui/ToastProvider";
import { AuthShell, PrimaryButton } from "@/components/ui/AuthShell";
import { DEMO_USER, safeNext, signIn, useSession } from "@/lib/demoAuth";
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();
  const session = useSession();
  const next = safeNext(useSearchParams().get("next"));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    if (!signIn(email, password)) {
      setLoading(false);
      setError("That email and password don't match an account.");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    showToast("Signed in to your worker console.", "success");
    router.push(next);
  }

  return (
    <AuthShell
      eyebrow="Worker sign in"
      title="Welcome back"
      subtitle="Your safety console, masked lines and client vault."
      footer={
        <>
          New to Checksafe?{" "}
          <Link href="/signup" className="font-bold text-[#0B2545] hover:underline underline-offset-4">
            Create a worker account
          </Link>
        </>
      }
    >
      <div className="mb-5 flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8F7F5] border border-slate-200 text-xs text-slate-600">
        <KeyRound className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <p>
          Demo account: <strong className="font-mono text-[#0B2545]">{DEMO_USER.email}</strong> · password{" "}
          <strong className="font-mono text-[#0B2545]">{DEMO_USER.password}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`space-y-4 ${shake ? "cs-shake" : ""}`} noValidate>
        <div>
          <label htmlFor="login-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="alex@example.co.uk"
            aria-invalid={!!error}
            className={`cs-input ${error ? "!border-[#DC2626]" : ""}`}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-password" className="text-xs font-semibold text-slate-700">
              Password
            </label>
            <Link href="/reset-password" className="text-xs font-semibold text-slate-500 hover:text-[#0B2545] transition">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="••••••••"
              aria-invalid={!!error}
              aria-describedby={error ? "login-error" : undefined}
              className={`cs-input pr-12 ${error ? "!border-[#DC2626]" : ""}`}
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
        </div>

        {error && (
          <p id="login-error" role="alert" className="cs-rise flex items-center gap-2 text-sm font-medium text-[#DC2626]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </p>
        )}

        <PrimaryButton type="submit" loading={loading || !email || !password} className="!mt-6">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing in…</span>
            </>
          ) : (
            <>
              <span>Sign in</span>
              <ArrowRight className="w-4 h-4 text-[#00E08C]" />
            </>
          )}
        </PrimaryButton>
      </form>
    </AuthShell>
  );
}
