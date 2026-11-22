"use client";
import React, { useState } from "react";
import { Lock, Loader2, Ban, IdCard, ScanFace, BadgeCheck, Trash2, EyeOff, Fingerprint } from "lucide-react";

const STEPS = [
  { icon: IdCard, title: "Photo of your ID", body: "Passport, driving licence or national ID" },
  { icon: ScanFace, title: "Quick selfie", body: "Confirms the ID belongs to you" },
  { icon: BadgeCheck, title: "Automatic result", body: "Usually under 60 seconds" },
];

const GUARANTEES = [
  { icon: EyeOff, text: "Your ID document, selfie and name are never stored by this service." },
  { icon: Trash2, text: "Raw identity files are permanently deleted within 60 seconds of the check." },
  { icon: Fingerprint, text: "Only an irreversible cryptographic fingerprint is kept, never readable data." },
];

function ScanFrame() {
  return (
    <div className="relative mx-auto w-[220px] h-[140px] rounded-2xl bg-linear-to-br from-slate-50 to-slate-100 border border-slate-200 overflow-hidden">
      <div className="absolute left-4 top-4 w-14 h-[72px] rounded-lg bg-slate-200/80" />
      <div className="absolute left-[84px] top-5 right-4 space-y-2">
        <div className="h-2 rounded-full bg-slate-200 w-4/5" />
        <div className="h-2 rounded-full bg-slate-200 w-3/5" />
        <div className="h-2 rounded-full bg-slate-200 w-2/3" />
      </div>
      <div className="absolute left-4 right-4 bottom-4 h-2 rounded-full bg-slate-200/70" />
      <div className="cs-scan absolute left-0 right-0 top-2 h-[2px] bg-[#16A34A] shadow-[0_0_14px_3px_rgba(22,163,74,0.45)]" />
      {["left-1.5 top-1.5 border-l-2 border-t-2 rounded-tl-lg", "right-1.5 top-1.5 border-r-2 border-t-2 rounded-tr-lg", "left-1.5 bottom-1.5 border-l-2 border-b-2 rounded-bl-lg", "right-1.5 bottom-1.5 border-r-2 border-b-2 rounded-br-lg"].map((c) => (
        <span key={c} className={`absolute w-5 h-5 border-[#0B2545] ${c}`} />
      ))}
    </div>
  );
}

export default function VerifyClient({ token }) {
  const [state, setState] = useState(token === "used" ? "USED" : "READY");

  async function handleBeginScan() {
    setState("STARTING");
    await new Promise((r) => setTimeout(r, 1100));
    setState("STARTED");
  }

  return (
    <div className="min-h-[100svh] bg-[#F9FAFB] text-[#111827] flex flex-col items-center px-4 py-8 sm:py-14">
      <div className="w-full max-w-[400px] space-y-4">
        <div className="cs-rise flex justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 shadow-xs">
            <Lock className="w-3 h-3 text-[#16A34A]" />
            Secure identity check
          </span>
        </div>

        <div className="cs-rise cs-d1 app-card rounded-[28px] p-6 sm:p-7">
          {state === "USED" ? (
            <div className="text-center py-4">
              <div className="cs-pop mx-auto w-16 h-16 rounded-3xl bg-red-50 border border-red-200 flex items-center justify-center">
                <Ban className="w-7 h-7 text-[#DC2626]" />
              </div>
              <h1 className="mt-5 text-xl font-extrabold tracking-tight text-[#0B2545]">This link has already been used</h1>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                For your security, each verification link works only once. Please ask your appointment provider for a new link.
              </p>
            </div>
          ) : state === "STARTED" ? (
            <div className="text-center py-4">
              <div className="cs-pop mx-auto w-20 h-20 rounded-full bg-[#16A34A] flex items-center justify-center shadow-[0_0_0_10px_rgba(22,163,74,0.12)]">
                <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path className="cs-draw" d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </div>
              <h1 className="cs-rise cs-d2 mt-6 text-xl font-extrabold tracking-tight text-[#0B2545]">Secure scan started</h1>
              <p className="cs-rise cs-d3 mt-2 text-sm text-slate-600 leading-relaxed">
                Follow the on-screen steps from our ID partner. This link is now locked and can&apos;t be reused.
              </p>
              <div className="cs-rise cs-d4 mt-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-[11px] font-mono font-semibold text-slate-600">
                <Lock className="w-3 h-3" />
                LINK STATUS: USED
              </div>
            </div>
          ) : (
            <>
              <ScanFrame />
              <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-[#0B2545] text-center">Verify your identity</h1>
              <p className="mt-2 text-sm text-slate-600 text-center leading-relaxed">
                A quick automated check before your upcoming appointment.
              </p>

              <ol className="mt-6 space-y-2.5">
                {STEPS.map(({ icon: Icon, title, body }, i) => (
                  <li key={title} className={`cs-rise cs-d${i + 2} flex items-center gap-3 p-3 rounded-2xl bg-[#F9FAFB] border border-slate-100`}>
                    <span className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#0B2545]" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#111827]">{title}</p>
                      <p className="text-xs text-slate-500">{body}</p>
                    </div>
                    <span className="ml-auto text-[10px] font-mono font-bold text-slate-300">0{i + 1}</span>
                  </li>
                ))}
              </ol>

              <button
                type="button"
                disabled={state === "STARTING"}
                onClick={handleBeginScan}
                className="cs-press mt-6 w-full min-h-[56px] px-4 rounded-full bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-70 text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-[0_14px_28px_-12px_rgba(22,163,74,0.7)]"
              >
                {state === "STARTING" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>STARTING SECURE SCAN…</span>
                  </>
                ) : (
                  <span>BEGIN AUTOMATED SECURE SCAN</span>
                )}
              </button>
              <p className="mt-3 text-center text-[11px] text-slate-400">Single-use link · locks as soon as you start</p>
            </>
          )}
        </div>

        <section className="cs-rise cs-d3 rounded-[28px] bg-[#0B2545] text-white p-6">
          <p className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#00E08C]">
            <Lock className="w-3.5 h-3.5" />
            Zero-Knowledge Privacy Guarantee
          </p>
          <ul className="mt-4 space-y-3.5">
            {GUARANTEES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <Icon className="w-4 h-4 text-[#00E08C] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
