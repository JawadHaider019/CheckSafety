"use client";

import React, { useMemo, useState } from "react";
import { AlertTriangle, Check, Loader2, PauseCircle, X } from "lucide-react";

export function HibernationModal({
  open,
  onClose,
  proxyNumbers = [],
  settings = {},
  onConfirmHibernation,
}) {
  const activeNumbers = useMemo(
    () => proxyNumbers.filter((n) => n.Status !== "RELEASED"),
    [proxyNumbers]
  );

  // Allowed keep-counts up to the number of lines the user owns
  const allowedOptions = useMemo(() => {
    const opts = [];
    if (activeNumbers.length >= 1) {
      opts.push({ count: 1, price: settings.hibernation_1_price_gbp ?? 7 });
    }
    if (activeNumbers.length >= 2) {
      opts.push({ count: 2, price: settings.hibernation_2_price_gbp ?? 12 });
    }
    if (activeNumbers.length >= 5) {
      opts.push({ count: 5, price: settings.hibernation_5_price_gbp ?? 22 });
    }
    return opts;
  }, [activeNumbers.length, settings]);

  const [selectedCount, setSelectedCount] = useState(1);
  const [selectedIds, setSelectedIds] = useState(() =>
    activeNumbers[0] ? [activeNumbers[0].id] : []
  );
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const activePrice =
    allowedOptions.find((o) => o.count === selectedCount)?.price ??
    (settings.hibernation_1_price_gbp ?? 7);

  function toggleNumber(id) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= selectedCount) {
        return [...prev.slice(1), id];
      }
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
      if (onConfirmHibernation) {
        await onConfirmHibernation(selectedIds, activePrice);
      }
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hibernation-title"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="w-full max-w-[390px] bg-white rounded-t-2xl sm:rounded-2xl p-5 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <PauseCircle className="w-5 h-5" />
            </span>
            <div>
              <h2 id="hibernation-title" className="text-base font-bold text-[#111827]">
                Cancel Subscription?
              </h2>
              <p className="text-xs text-slate-500">Switch to Hibernation Mode instead</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
          <p className="text-xs text-red-900 leading-relaxed">
            Cancelling your plan permanently releases your assigned proxy numbers and deletes your
            Trusted Client Vault. Switch to <strong>Hibernation Mode</strong> to keep your lines
            reserved, your vault, and unused check tokens.
          </p>
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold text-slate-700 mb-2">
            1. Choose how many numbers to keep
          </p>
          <div className="grid grid-cols-1 gap-2">
            {allowedOptions.map((opt) => {
              const isSelected = selectedCount === opt.count;
              return (
                <button
                  key={opt.count}
                  type="button"
                  onClick={() => handleOptionChange(opt.count)}
                  className={`min-h-[48px] px-3.5 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                    isSelected
                      ? "border-[#111827] bg-[#111827] text-white"
                      : "border-slate-200 bg-[#F9FAFB] text-[#111827] hover:bg-slate-100"
                  }`}
                >
                  <span className="text-sm font-medium">
                    Keep {opt.count} {opt.count === 1 ? "number" : "numbers"}
                  </span>
                  <span className="text-sm font-bold tabular-nums">£{opt.price}/month</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold text-slate-700 mb-2">
            2. Tick the {selectedCount === 1 ? "number" : `${selectedCount} numbers`} to keep
            (others will be released)
          </p>
          <div className="space-y-2">
            {activeNumbers.map((num) => {
              const checked = selectedIds.includes(num.id);
              return (
                <button
                  key={num.id}
                  type="button"
                  onClick={() => toggleNumber(num.id)}
                  className={`w-full min-h-[48px] px-3.5 rounded-xl border flex items-center justify-between transition cursor-pointer ${
                    checked
                      ? "border-[#16A34A] bg-emerald-50 text-[#111827]"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  <div className="text-left">
                    <div className="text-sm font-mono font-medium">{num.Twilio_Number}</div>
                    <div className="text-[11px] text-slate-500">
                      Line #{num.Assigned_Order} · {num.Country_Code}
                    </div>
                  </div>
                  <span
                    className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                      checked
                        ? "bg-[#16A34A] border-[#16A34A] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {checked && <Check className="w-3.5 h-3.5" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <button
            type="button"
            disabled={submitting || selectedIds.length !== selectedCount}
            onClick={handleConfirm}
            className="w-full min-h-[48px] rounded-xl bg-[#111827] hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Confirm Hibernation (£{activePrice}/month)</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[44px] rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            Keep active subscription
          </button>
        </div>
      </div>
    </div>
  );
}
