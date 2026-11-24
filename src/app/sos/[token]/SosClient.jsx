"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Loader2, Phone, MapPin, Lock, ArrowLeft, Share2 } from "lucide-react";
import { useClientValue } from "@/lib/useClientSnapshot";
import { useIsLoggedIn } from "@/lib/demoAuth";

const EMERGENCY_NUMBER = "999";

const timeFmt = (d) => d?.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
const subscribeClock = (cb) => {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
};
const readClock = () => timeFmt(new Date());

export default function SosClient() {
  const [status, setStatus] = useState("READY");
  const [sentAt, setSentAt] = useState(null);
  const [shareCopied, setShareCopied] = useState(false);
  const clock = useClientValue(readClock, "", subscribeClock);
  const loggedIn = useIsLoggedIn();

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: "Checksafe SOS link", url });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(url).catch(() => {});
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  }

  async function triggerSos() {
    if (status !== "READY") return;
    navigator.vibrate?.(60);
    setStatus("SENDING");
    await new Promise((r) => setTimeout(r, 900));
    setSentAt(new Date());
    setStatus("SENT");
    navigator.vibrate?.([80, 60, 80]);
  }

  return (
    <div className="min-h-[100svh] bg-[#07182E] text-white flex flex-col select-none overflow-hidden relative pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-700 ${status === "SENT" ? "opacity-0" : "opacity-100"}`}
        style={{ background: "radial-gradient(circle at 50% 45%, rgba(220,38,38,0.28), transparent 60%)" }}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-700 ${status === "SENT" ? "opacity-100" : "opacity-0"}`}
        style={{ background: "radial-gradient(circle at 50% 35%, rgba(22,163,74,0.22), transparent 60%)" }}
      />

      <div className="relative flex items-center justify-between px-5 h-14 text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          {loggedIn ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Dashboard
            </Link>
          ) : (
            <>
              <Lock className="w-3 h-3" />
              Private link
            </>
          )}
        </span>
        <span className="tabular-nums">{clock}</span>
      </div>

      <main className="relative flex-1 flex flex-col items-center justify-center px-6 pb-10">
        {status === "SENT" ? (
          <div className="w-full max-w-[340px] text-center">
            <div className="cs-pop mx-auto w-24 h-24 rounded-full bg-[#16A34A] flex items-center justify-center shadow-[0_0_0_12px_rgba(22,163,74,0.15),0_0_0_28px_rgba(22,163,74,0.07)]">
              <svg viewBox="0 0 24 24" className="w-11 h-11" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path className="cs-draw" d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </div>
            <h1 className="cs-rise cs-d2 mt-8 text-2xl font-extrabold tracking-tight">Alert sent</h1>
            <p className="cs-rise cs-d3 mt-2 text-sm text-slate-300 leading-relaxed">
              Your emergency contact has been sent your appointment address
              {sentAt ? ` at ${timeFmt(sentAt)}` : ""}.
            </p>

            <div className="cs-rise cs-d4 mt-6 rounded-2xl bg-white/[0.06] border border-white/10 p-4 text-left space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#00E08C] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed">Session marked DURESS. Address and local emergency instructions included.</p>
              </div>
            </div>

            <a
              href={`tel:${EMERGENCY_NUMBER}`}
              className="cs-rise cs-d5 cs-press mt-6 w-full min-h-[56px] rounded-full bg-white text-[#07182E] font-extrabold text-base flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-[#DC2626]" />
              Call {EMERGENCY_NUMBER}
            </a>
            <p className="cs-rise cs-d6 mt-3 text-[11px] text-slate-500">If you are in immediate danger, call the emergency services.</p>
          </div>
        ) : (
          <div className="w-full max-w-[340px] flex flex-col items-center text-center">
            <p className="cs-rise text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-red-300/80">Emergency</p>
            <h1 className="cs-rise cs-d1 mt-2 text-xl font-extrabold tracking-tight">Tap once to alert your contact</h1>

            <div className="cs-rise cs-d2 relative mt-12 mb-12 w-60 h-60 flex items-center justify-center">
              {status === "READY" && (
                <>
                  <span className="cs-ring absolute inset-0 rounded-full bg-[#DC2626]" />
                  <span className="cs-ring cs-ring-delay absolute inset-0 rounded-full bg-[#DC2626]" />
                </>
              )}
              <button
                type="button"
                disabled={status === "SENDING"}
                onClick={triggerSos}
                aria-label="Send SOS emergency alert"
                className="relative w-60 h-60 rounded-full bg-linear-to-b from-[#EF4444] to-[#B91C1C] shadow-[0_30px_60px_-15px_rgba(220,38,38,0.7),inset_0_2px_0_rgba(255,255,255,0.25)] flex flex-col items-center justify-center gap-1 cursor-pointer transition-transform duration-200 active:scale-95 disabled:cursor-wait"
              >
                <span className="absolute inset-3 rounded-full border border-white/20" />
                {status === "SENDING" ? (
                  <>
                    <Loader2 className="w-12 h-12 animate-spin" />
                    <span className="mt-2 text-sm font-bold tracking-[0.2em]">SENDING</span>
                  </>
                ) : (
                  <>
                    <span className="text-6xl font-black tracking-tight">SOS</span>
                    <span className="text-xs font-bold tracking-[0.2em] text-red-100/90">TAP</span>
                  </>
                )}
              </button>
            </div>

            <p className="cs-rise cs-d3 text-xs text-slate-400 leading-relaxed max-w-[280px]">
              Sends an emergency SMS with your appointment address immediately. No login needed.
            </p>

            <button
              type="button"
              onClick={handleShare}
              className="cs-rise cs-d4 cs-press mt-5 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 text-xs font-semibold text-slate-300 transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              {shareCopied ? "Link copied!" : "Save / Share link"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
