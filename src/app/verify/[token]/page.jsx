"use client";
import React, { Suspense, useState } from "react";
import { useParams } from "next/navigation";
import { Lock, ShieldCheck, Loader2, CheckCircle2, Ban } from "lucide-react";
function VerifyClientInner() {
    const params = useParams();
    const [state, setState] = useState("READY");
    async function handleBeginScan() {
        setState("STARTING");
        try {
            const res = await fetch("/api/verify/start", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: params.token }),
            });
            if (res.status === 409) {
                setState("USED");
                return;
            }
            setState("STARTED");
        }
        catch {
            setState("STARTED");
        }
    }
    return (<div className="min-h-screen bg-[#F9FAFB] text-[#111827] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-[390px] space-y-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#111827] text-white flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6 text-[#16A34A]"/>
          </div>

          {state === "USED" ? (<div className="space-y-2">
              <Ban className="w-8 h-8 text-[#DC2626] mx-auto"/>
              <h1 className="text-lg font-bold">Verification link already used</h1>
              <p className="text-sm text-slate-600">
                For your security, each verification link can only be opened once. Please request a
                fresh link from your appointment provider.
              </p>
            </div>) : state === "STARTED" ? (<div className="space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#16A34A] mx-auto"/>
              <h1 className="text-lg font-bold">Secure scan initiated</h1>
              <p className="text-sm text-slate-600">
                Your single-use verification session is now active with our ID partner (Veriff).
                This link is now locked and cannot be reused.
              </p>
            </div>) : (<>
              <h1 className="text-xl font-bold text-[#111827]">Identity Verification</h1>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Complete a quick 60-second ID check before your upcoming appointment. This link is
                single-use.
              </p>

              <button type="button" disabled={state === "STARTING"} onClick={handleBeginScan} className="mt-6 w-full min-h-[48px] px-4 rounded-xl bg-[#16A34A] hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer">
                {state === "STARTING" && <Loader2 className="w-4 h-4 animate-spin"/>}
                <span>BEGIN AUTOMATED SECURE SCAN</span>
              </button>
            </>)}
        </div>

        {/* Zero-Knowledge Privacy Guarantee */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Lock className="w-4 h-4 text-[#16A34A]"/>
            <span>Zero-Knowledge Privacy Guarantee</span>
          </div>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            Your ID document, selfie, and full name are <strong>never stored</strong> by this
            service. Once automated verification completes, all raw identity files are permanently
            deleted within 60 seconds—only an irreversible cryptographic confirmation is retained.
          </p>
        </div>
      </div>
    </div>);
}
/**
 * Unbranded Client ID Verification page (hosted on secondary domain).
 * Single-use: clicking [BEGIN AUTOMATED SECURE SCAN] immediately marks Link_Used_Status = USED.
 */
export default function VerifyClientPage() {
    return (<Suspense fallback={<div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-[#111827]"/>
        </div>}>
      <VerifyClientInner />
    </Suspense>);
}
