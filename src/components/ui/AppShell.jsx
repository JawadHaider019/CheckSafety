"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { CheckSafeLogo } from "@/components/ui/CheckSafeLogo";

export function SectionLabel({ index, children, tone = "emerald" }) {
  const color =
    tone === "red" ? "text-[#DC2626]" : tone === "slate" ? "text-slate-400" : "text-emerald-700";
  return (
    <p className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase ${color}`}>
      {index ? `/${index} · ` : ""}
      {children}
    </p>
  );
}

export function AppHeader({ maxWidth = "max-w-[390px]", children, onLogoTap }) {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 pt-[env(safe-area-inset-top)]">
      <div className={`${maxWidth} mx-auto px-4 h-16 flex items-center justify-between gap-2`}>
        <Link
          href="/"
          aria-label="Checksafe home"
          onClick={onLogoTap}
          className="inline-flex items-center shrink-0 hover:opacity-90 transition-opacity"
        >
          <CheckSafeLogo darkSurface={false} size="sm" />
        </Link>
        <div className="flex items-center gap-1.5 min-w-0">{children}</div>
      </div>
    </header>
  );
}

export function Sheet({ open, onClose, labelledBy, maxWidth = "sm:max-w-[420px]", children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
    >
      <div
        className="cs-fade absolute inset-0 bg-[#0B2545]/45 backdrop-blur-[3px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        data-lenis-prevent
        className={`cs-sheet relative w-full ${maxWidth} bg-white rounded-t-[28px] sm:rounded-[28px] shadow-[0_30px_80px_-20px_rgba(11,37,69,0.45)] max-h-[92vh] overflow-x-hidden overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]`}
      >
        <div className="sm:hidden mx-auto mt-2.5 h-1 w-10 rounded-full bg-slate-200" />
        <div className="p-5 sm:p-6 min-w-0 w-full">{children}</div>
      </div>
    </div>
  );
}

export function SheetHeader({ id, eyebrow, title, subtitle, onClose, tone = "emerald", icon: Icon }) {
  const iconStyles =
    tone === "red"
      ? "bg-red-50 text-[#DC2626]"
      : tone === "amber"
        ? "bg-amber-50 text-amber-700"
        : "bg-[#0B2545] text-[#00E08C]";
  return (
    <div className="flex items-start justify-between gap-3 mb-4">
      <div className="flex items-start gap-3 min-w-0">
        {Icon && (
          <span className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${iconStyles}`}>
            <Icon className="w-5 h-5" />
          </span>
        )}
        <div className="min-w-0">
          {eyebrow && (
            <SectionLabel tone={tone === "red" ? "red" : tone === "amber" ? "slate" : "emerald"}>
              {eyebrow}
            </SectionLabel>
          )}
          <h2 id={id} className="text-lg font-extrabold text-[#0B2545] tracking-tight leading-tight mt-0.5">
            {title}
          </h2>
          {subtitle && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{subtitle}</p>}
        </div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="cs-press p-2 -mr-1 -mt-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
