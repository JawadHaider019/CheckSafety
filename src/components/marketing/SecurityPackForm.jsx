"use client";
import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export function SecurityPackForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setState("sending");
    await new Promise((r) => setTimeout(r, 700));
    setState("sent");
  }

  if (state === "sent") {
    return (
      <div className="text-center py-6">
        <span className="cs-pop mx-auto w-14 h-14 rounded-full bg-[#00E08C] flex items-center justify-center">
          <Check className="w-7 h-7 text-[#07182E]" strokeWidth={3} />
        </span>
        <p className="mt-5 text-xl font-semibold">Request received</p>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          We&apos;ll send our security documentation to <strong className="text-white break-all">{email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor="pack-email" className="block text-xs font-medium text-slate-400 pl-1">
        Work email
      </label>
      <input
        id="pack-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="safety.lead@company.co.uk"
        className="w-full h-14 px-4 rounded-2xl bg-white/[0.06] border border-white/15 text-white text-[15px] placeholder:text-slate-400 focus:outline-none focus:border-[#00E08C] focus:ring-4 focus:ring-[#00E08C]/15 transition"
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className="cs-press group w-full h-14 rounded-2xl bg-[#00E08C] hover:bg-[#33E8A3] disabled:opacity-70 text-[#07182E] text-base font-semibold flex items-center justify-center gap-2 cursor-pointer"
      >
        {state === "sending" ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
        Request security pack
        {state !== "sending" && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
      </button>
      <p className="text-xs text-slate-400 text-center pt-1">For safety leads, DPOs and procurement teams. No marketing emails.</p>
    </form>
  );
}
