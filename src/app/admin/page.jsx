"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Save, Users, Info } from "lucide-react";
import { CheckSafetyLogo } from "@/components/ui/CheckSafetyLogo";
import { useToast } from "@/components/ui/ToastProvider";
import { DEFAULT_APP_SETTINGS } from "@/lib/types";
export default function OwnerAdminPage() {
    const { showToast } = useToast();
    const [settings, setSettings] = useState(DEFAULT_APP_SETTINGS);
    const [saving, setSaving] = useState(false);
    useEffect(() => {
        fetch("/api/settings")
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
            if (data)
                setSettings(data);
        })
            .catch(() => { });
    }, []);
    // Numbers only — zero personal data
    const activeCounts = {
        core: 142,
        pro: 87,
        elite: 29,
        hibernation: 19,
        agencySeats: 65,
    };
    async function handleSave(e) {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            if (!res.ok) {
                showToast("Could not save settings. Check price values.", "error");
                return;
            }
            showToast("Prices synced with Paddle and landing page copy updated.", "success");
        }
        finally {
            setSaving(false);
        }
    }
    return (<div className="min-h-screen bg-[#F8F7F5] text-[#111215] pb-16">
      <header className="editorial-glass sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center">
            <CheckSafetyLogo darkSurface={false} size="sm"/>
          </Link>
          <span className="text-xs text-slate-500 font-mono">Owner Admin Panel</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-8 space-y-6">
        {/* Active User Counts */}
        <section className="editorial-card rounded-[32px] p-6 sm:p-8 bg-white">
          <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-emerald-700 mb-1">
            /01 Platform Metrics
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#111215]"/>
            <h1 className="text-lg font-bold text-[#111215]">Active User Counts (Zero PII)</h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 tabular-nums">
            {[
            { label: "Core", value: activeCounts.core },
            { label: "Pro", value: activeCounts.pro },
            { label: "Elite", value: activeCounts.elite },
            { label: "Hibernation", value: activeCounts.hibernation },
            { label: "Agency Seats", value: activeCounts.agencySeats },
        ].map((stat) => (<div key={stat.label} className="p-3.5 rounded-2xl bg-[#F8F7F5] border border-black/[0.08]">
                <p className="text-[11px] text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-[#111215] mt-0.5">{stat.value}</p>
              </div>))}
          </div>
        </section>

        {/* Grandfathering Notice */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-700"/>
          <p className="leading-relaxed">
            <strong>Paddle Price Sync Rule:</strong> Updating plan, top-up, or Hibernation pricing
            applies to <strong>new customers only</strong>. Existing subscribers keep their current
            price unless you explicitly migrate them in the Paddle merchant dashboard.
          </p>
        </div>

        {/* Prices & Copy */}
        <form onSubmit={handleSave} className="space-y-6">
          <section className="bg-white border border-slate-200 rounded-[24px] p-6 space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-[#111827]">
              Subscription, Top-Up &amp; Hibernation Rates (£ GBP)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {[
            ["core_price_gbp", "Core Plan (£/mo)"],
            ["pro_price_gbp", "Pro Plan (£/mo)"],
            ["elite_price_gbp", "Elite Plan (£/mo)"],
            ["topup_5_price_gbp", "5 Checks Top-Up (£)"],
            ["topup_15_price_gbp", "15 Checks Top-Up (£)"],
            ["topup_50_price_gbp", "50 Checks Top-Up (£)"],
            ["hibernation_1_price_gbp", "Hibernation 1 Line (£/mo)"],
            ["hibernation_2_price_gbp", "Hibernation 2 Lines (£/mo)"],
            ["hibernation_5_price_gbp", "Hibernation 5 Lines (£/mo)"],
        ].map(([field, label]) => (<div key={field}>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
                  <input type="number" step="0.01" value={settings[field]} onChange={(e) => setSettings((prev) => ({ ...prev, [field]: Number(e.target.value) }))} className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm text-[#111827] font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-[#111827]"/>
                </div>))}
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-[24px] p-6 space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-[#111827]">Landing Page Copy Controls</h2>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Headline</label>
              <input type="text" value={settings.hero_headline} onChange={(e) => setSettings((prev) => ({ ...prev, hero_headline: e.target.value }))} className="w-full h-11 px-4 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827]"/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hero Subheadline
              </label>
              <textarea rows={3} value={settings.hero_subheadline} onChange={(e) => setSettings((prev) => ({ ...prev, hero_subheadline: e.target.value }))} className="w-full p-4 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827]"/>
            </div>
          </section>

          <button type="submit" disabled={saving} className="w-full min-h-[50px] rounded-full bg-[#111827] hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition shadow-xs">
            <Save className="w-4 h-4"/>
            <span>{saving ? "Saving & Syncing Paddle..." : "Save Rates & Sync Paddle"}</span>
          </button>
        </form>
      </main>
    </div>);
}
