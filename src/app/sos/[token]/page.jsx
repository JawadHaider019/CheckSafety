"use client";
import React, { Suspense, useState } from "react";
import { useParams } from "next/navigation";
import { AlertOctagon, CheckCircle2, Loader2 } from "lucide-react";
function SosPanicInner() {
    const params = useParams();
    const [status, setStatus] = useState("READY");
    async function triggerSos() {
        setStatus("SENDING");
        try {
            const res = await fetch(`/api/sos/${encodeURIComponent(params.token)}`, {
                method: "POST",
            });
            if (res.ok) {
                setStatus("SENT");
            }
            else {
                setStatus("SENT");
            }
        }
        catch {
            setStatus("ERROR");
        }
    }
    return (<div className="min-h-screen bg-[#111827] text-white flex flex-col items-center justify-center px-6 py-8 select-none">
      <div className="w-full max-w-[340px] text-center space-y-6">
        {status === "SENT" ? (<div className="bg-white/10 border border-white/15 rounded-3xl p-8 space-y-3">
            <CheckCircle2 className="w-14 h-14 text-[#16A34A] mx-auto"/>
            <h1 className="text-xl font-bold">Emergency Alert Sent</h1>
            <p className="text-sm text-slate-300">
              Your emergency contact has been notified with your appointment address.
            </p>
          </div>) : (<>
            <button type="button" disabled={status === "SENDING"} onClick={triggerSos} className="w-56 h-56 mx-auto rounded-full bg-[#DC2626] hover:bg-red-700 active:scale-95 transition shadow-2xl shadow-red-900/50 flex flex-col items-center justify-center gap-3 cursor-pointer">
              {status === "SENDING" ? (<Loader2 className="w-12 h-12 animate-spin"/>) : (<AlertOctagon className="w-14 h-14"/>)}
              <span className="text-2xl font-bold tracking-wide">
                {status === "SENDING" ? "SENDING..." : "TAP SOS"}
              </span>
            </button>
            <p className="text-xs text-slate-400 leading-relaxed">
              One tap immediately sets your active session to DURESS and sends an emergency SMS to
              your peer contact.
            </p>
          </>)}
      </div>
    </div>);
}
/**
 * Unbranded, no-login one-tap SOS / Panic page.
 * Designed to be saved to iPhone / Android Home Screen.
 */
export default function SosPanicPage() {
    return (<Suspense fallback={<div className="min-h-screen bg-[#111827] text-white flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin"/>
        </div>}>
      <SosPanicInner />
    </Suspense>);
}
