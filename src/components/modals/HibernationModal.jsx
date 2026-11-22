"use client";

import React, { useMemo, useState } from "react";
import { AlertTriangle, Check, Loader2, Moon, Phone, ShieldCheck, Coins } from "lucide-react";
import { Sheet, SheetHeader } from "@/components/ui/AppShell";

export function HibernationModal({ open, onClose, proxyNumbers = [], settings = {}, onConfirmHibernation }) {
  const activeNumbers = useMemo(() => proxyNumbers.filter((n) => n.Status !== "RELEASED"), [proxyNumbers]);

  const allowedOptions = useMemo(() => {
    const opts = [];
    if (activeNumbers.length >= 1) opts.push({ count: 1, price: settings.hibernation_1_price_gbp ?? 7 });
    if (activeNumbers.length >= 2) opts.push({ count: 2, price: settings.hibernation_2_price_gbp ?? 12 });
    if (activeNumbers.length >= 5) opts.push({ count: 5, price: settings.hibernation_5_price_gbp ?? 22 });
    return opts;
  }, [activeNumbers.length, settings]);

  const [selectedCount, setSelectedCount] = useState(1);
  const [selectedIds, setSelectedIds] = useState(() => (activeNumbers[0] ? [activeNumbers[0].id] : []));
  const [submitting, setSubmitting] = useState(false);

  const activePrice =
    allowedOptions.find((o) => o.count === selectedCount)?.price ?? settings.hibernation_1_price_gbp ?? 7;

  function toggleNumber(id) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= selectedCount) return [...prev.slice(1), id];
      return [...prev, id];
    });
  }

  function handleOptionChange(count) {
    setSelectedCount(count);
    setSelectedIds(activeNumbers.slice(0, count).map((n) => n.id));
  }

  async function handleConfirm() {
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      await onConfirmHibernation?.(selectedIds, activePrice);
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Sheet open={open} onClose={onClose} labelledBy="hibernation-title">
      <SheetHeader
        id="hibernation-title"
        eyebrow="Before you cancel"
        title="Switch to Hibernation instead?"
        icon={Moon}
        onClose={onClose}
      />

      <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
        <p className="text-xs text-red-900 leading-relaxed">
          Cancelling <strong>permanently releases your proxy numbers</strong> and{" "}
          <strong>deletes your Trusted Client Vault</strong>. Clients who know your masked line won&apos;t be able to reach you.
        </p>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { icon: Phone, label: "Numbers reserved" },
          { icon: ShieldCheck, label: "Vault kept" },
          { icon: Coins, label: "Tokens kept" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
            <Icon className="w-4 h-4 text-[#16A34A] mx-auto" />
            <p className="mt-1 text-[10px] font-semibold text-emerald-900 leading-tight">{label}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-slate-500">Safety timers and masked calls pause until you reactivate.</p>

      <div className="mt-5">
        <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">1 · Numbers to keep</p>
        <div className="space-y-2">
          {allowedOptions.map((opt) => {
            const isSelected = selectedCount === opt.count;
            return (
              <button
                key={opt.count}
                type="button"
                onClick={() => handleOptionChange(opt.count)}
                aria-pressed={isSelected}
                className={`cs-press w-full min-h-[52px] px-4 rounded-2xl border text-left flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? "border-[#0B2545] bg-[#0B2545] text-white shadow-[0_10px_24px_-12px_rgba(11,37,69,0.6)]"
                    : "border-slate-200 bg-white text-[#111827] hover:border-slate-300"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-[#00E08C]" : "border-slate-300"
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#00E08C]" />}
                  </span>
                  <span className="text-sm font-semibold">
                    Keep {opt.count} {opt.count === 1 ? "number" : "numbers"}
                  </span>
                </span>
                <span className="text-sm font-extrabold tabular-nums">
                  £{opt.price}
                  <span className={`text-xs font-medium ${isSelected ? "text-slate-300" : "text-slate-400"}`}>/mo</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">
          2 · Tick {selectedCount === 1 ? "the number" : `${selectedCount} numbers`} · the rest are released
        </p>
        <div className="space-y-2">
          {activeNumbers.map((num) => {
            const checked = selectedIds.includes(num.id);
            return (
              <button
                key={num.id}
                type="button"
                onClick={() => toggleNumber(num.id)}
                aria-pressed={checked}
                className={`cs-press w-full min-h-[52px] px-4 rounded-2xl border flex items-center justify-between cursor-pointer ${
                  checked ? "border-[#16A34A] bg-emerald-50/60" : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="text-left">
                  <div className="text-sm font-mono font-semibold text-[#111827]">{num.Twilio_Number}</div>
                  <div className="text-[11px] text-slate-500">
                    Line #{num.Assigned_Order}
                    {num.Assigned_Order === 1 ? " · primary" : ""} · {num.Country_Code}
                  </div>
                </div>
                <span
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    checked ? "bg-[#16A34A] border-[#16A34A] text-white" : "border-slate-300 bg-white"
                  }`}
                >
                  {checked && <Check className="w-3.5 h-3.5 cs-pop" strokeWidth={3} />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <button
          type="button"
          disabled={submitting || selectedIds.length !== selectedCount}
          onClick={handleConfirm}
          className="cs-press w-full min-h-[52px] rounded-full bg-[#0B2545] hover:bg-[#123461] disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Moon className="w-4 h-4 text-[#00E08C]" />}
          <span>Hibernate for £{activePrice}/month</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="cs-press w-full min-h-[48px] rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
        >
          Keep my active plan
        </button>
      </div>
    </Sheet>
  );
}
