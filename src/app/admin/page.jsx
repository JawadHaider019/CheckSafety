"use client";
import React, { useMemo, useState } from "react";
import { Loader2, Lock, LogOut, Info, RefreshCw, ArrowRight, Users, Moon, Building2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { CheckSafeLogo } from "@/components/ui/CheckSafeLogo";
import { useToast } from "@/components/ui/ToastProvider";
import { AppHeader, SectionLabel, Sheet, SheetHeader } from "@/components/ui/AppShell";
import { DEFAULT_APP_SETTINGS } from "@/lib/types";

const MOCK_COUNTS = { core: 0, pro: 0, elite: 0, hibernation: 0, agencySeats: 0 };

const PRICE_GROUPS = [
  {
    title: "Subscription plans",
    unit: "/mo",
    fields: [
      ["core_price_gbp", "Core", "1 masked line"],
      ["pro_price_gbp", "Pro", "2 masked lines"],
      ["elite_price_gbp", "Elite", "5 masked lines"],
    ],
  },
  {
    title: "ID check top-ups",
    unit: "",
    fields: [
      ["topup_5_price_gbp", "5 checks", "one-off"],
      ["topup_15_price_gbp", "15 checks", "one-off"],
      ["topup_50_price_gbp", "50 checks", "one-off"],
    ],
  },
  {
    title: "Hibernation Mode",
    unit: "/mo",
    fields: [
      ["hibernation_1_price_gbp", "Keep 1 number", "tier 0"],
      ["hibernation_2_price_gbp", "Keep 2 numbers", "tier 0"],
      ["hibernation_5_price_gbp", "Keep 5 numbers", "tier 0"],
    ],
  },
  {
    title: "Agency plan",
    unit: "/seat/mo",
    fields: [["agency_seat_price_gbp", "Per staff seat", "minimum 5 seats"]],
  },
];

function OwnerGate({ onAuthed }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    onAuthed();
  }

  return (
    <div className="min-h-screen navy-grid flex flex-col items-center justify-center px-4 py-12">
      <div className="cs-rise mb-8">
        <CheckSafeLogo darkSurface size="md" />
      </div>
      <div className="cs-rise cs-d1 w-full max-w-[400px] bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
        <span className="w-11 h-11 rounded-2xl bg-[#0B2545] flex items-center justify-center">
          <Lock className="w-5 h-5 text-[#00E08C]" />
        </span>
        <p className="mt-5 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-emerald-700">Restricted</p>
        <h1 className="mt-1 text-2xl font-extrabold text-[#0B2545] tracking-tight">Owner admin</h1>
        <p className="mt-1 text-sm text-slate-500">Sign in with the owner account to manage prices and copy.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="owner-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Owner email
            </label>
            <input
              id="owner-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="cs-input"
            />
          </div>
          <div>
            <label htmlFor="owner-password" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="owner-password"
                type={show ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="cs-input pr-12"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? "Hide password" : "Show password"}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="cs-press w-full min-h-[52px] rounded-full bg-[#0B2545] hover:bg-[#123461] disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4 text-[#00E08C]" />}
            {loading ? "Verifying…" : "Sign in securely"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function OwnerAdminPage() {
  const { showToast } = useToast();
  const [authed, setAuthed] = useState(false);
  const [saved, setSaved] = useState(DEFAULT_APP_SETTINGS);
  const [settings, setSettings] = useState(DEFAULT_APP_SETTINGS);
  const [migrateExisting, setMigrateExisting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const changedKeys = useMemo(() => Object.keys(settings).filter((k) => settings[k] !== saved[k]), [settings, saved]);
  const priceChanged = changedKeys.some((k) => k.endsWith("_gbp"));
  const totalUsers = Object.values(MOCK_COUNTS).reduce((a, b) => a + b, 0);

  function update(field, value) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    if (changedKeys.some((k) => k.endsWith("_gbp") && !(settings[k] > 0))) {
      showToast("Every price must be greater than £0.", "error");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setSaved(settings);
    setSaving(false);
    setMigrateExisting(false);
    showToast(
      priceChanged
        ? migrateExisting
          ? "Prices synced with Paddle. Existing subscribers moved to new prices."
          : "Prices synced with Paddle for new customers."
        : "Landing page copy updated.",
      "success"
    );
  }

  if (!authed) return <OwnerGate onAuthed={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] pb-32">
      <AppHeader maxWidth="max-w-5xl">
        <span className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-[#0B2545] text-white text-[11px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00E08C]" />
          Owner
        </span>
        <button
          type="button"
          onClick={() => setShowSignOutModal(true)}
          className="cs-press h-9 px-3 rounded-full bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign out
        </button>
      </AppHeader>

      <main className="max-w-5xl mx-auto px-4 pt-6 sm:pt-10 space-y-5">
        <div className="cs-rise">
          <SectionLabel>Owner admin panel</SectionLabel>
          <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">Control panel</h1>
        </div>

        <section className="cs-rise cs-d1 grid lg:grid-cols-[1fr_2fr] gap-4">
          <div className="navy-grid text-white rounded-[28px] p-6 flex flex-col justify-between min-h-[170px]">
            <SectionLabel index="01">Active users</SectionLabel>
            <div>
              <p className="text-6xl font-black tabular-nums tracking-tight">{totalUsers}</p>
              <p className="mt-1 text-xs text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-[#00E08C]" />
                Counts only · no personal data
              </p>
            </div>
          </div>
          <div className="app-card rounded-[28px] p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { label: "Core", value: MOCK_COUNTS.core, icon: Users },
              { label: "Pro", value: MOCK_COUNTS.pro, icon: Users },
              { label: "Elite", value: MOCK_COUNTS.elite, icon: Users },
              { label: "Hibernation", value: MOCK_COUNTS.hibernation, icon: Moon },
              { label: "Agency seats", value: MOCK_COUNTS.agencySeats, icon: Building2 },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="p-4 rounded-2xl bg-[#F9FAFB] border border-slate-100 flex flex-col justify-between min-h-[104px]">
                <Icon className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-3xl font-black tabular-nums text-[#0B2545]">{value}</p>
                  <p className="text-[11px] text-slate-500">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cs-rise cs-d2 app-card rounded-[28px] p-5 sm:p-6">
          <SectionLabel index="02">Pricing · synced with Paddle</SectionLabel>
          <h2 className="mt-1 text-2xl font-extrabold text-[#0B2545] tracking-tight">Prices</h2>

          <div className="mt-4 p-4 rounded-2xl bg-[#FEF08A]/70 border border-amber-300 flex items-start gap-3">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-800" />
            <p className="text-xs text-amber-950 leading-relaxed">
              <strong>New prices apply to new customers only.</strong> Existing subscribers keep the price they signed up at, unless you
              choose to move them below.
            </p>
          </div>

          <div className="mt-5 grid md:grid-cols-2 gap-4">
            {PRICE_GROUPS.map((group) => (
              <div key={group.title} className="rounded-[22px] border border-slate-100 bg-[#F9FAFB] p-4">
                <p className="text-xs font-bold text-[#0B2545]">{group.title}</p>
                <div className="mt-3 space-y-2">
                  {group.fields.map(([field, label, hint]) => {
                    const changed = settings[field] !== saved[field];
                    return (
                      <div
                        key={field}
                        className={`flex items-center justify-between gap-3 p-2.5 pl-3.5 rounded-2xl bg-white border transition-colors ${
                          changed ? "border-[#16A34A]/50 shadow-[0_0_0_3px_rgba(22,163,74,0.08)]" : "border-slate-200"
                        }`}
                      >
                        <label htmlFor={field} className="min-w-0">
                          <span className="block text-sm font-semibold text-[#111827]">{label}</span>
                          <span className="block text-[11px] text-slate-400">
                            {changed ? <span className="text-emerald-700 font-semibold">was £{saved[field]}</span> : hint}
                          </span>
                        </label>
                        <div className="relative shrink-0">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 pointer-events-none">£</span>
                          <input
                            id={field}
                            type="number"
                            step="0.01"
                            min="0"
                            value={settings[field]}
                            onChange={(e) => update(field, e.target.value === "" ? "" : Number(e.target.value))}
                            className="cs-input !w-[112px] !h-11 pl-7 pr-2 font-mono font-bold tabular-nums text-right"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                {group.unit && <p className="mt-2 text-[10px] text-slate-400 text-right">GBP {group.unit}</p>}
              </div>
            ))}
          </div>

          <label className="mt-5 flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-white cursor-pointer">
            <span className="relative mt-0.5 shrink-0">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={migrateExisting}
                onChange={(e) => setMigrateExisting(e.target.checked)}
              />
              <span className="block w-10 h-6 rounded-full bg-slate-200 peer-checked:bg-[#DC2626] transition-colors" />
              <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
            </span>
            <span>
              <span className="block text-sm font-bold text-[#111827]">Also move existing subscribers to the new prices</span>
              <span className="block text-xs text-slate-500 mt-0.5 leading-relaxed">
                Off by default. When on, current subscribers are billed the new price from their next renewal.
              </span>
            </span>
          </label>
        </section>

        <section className="cs-rise cs-d3 app-card rounded-[28px] p-5 sm:p-6">
          <SectionLabel index="03">Landing page</SectionLabel>
          <h2 className="mt-1 text-2xl font-extrabold text-[#0B2545] tracking-tight">Hero copy</h2>
          <div className="mt-5 grid lg:grid-cols-2 gap-5">
            <div className="space-y-4">
              <div>
                <label htmlFor="hero-headline" className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  Headline
                  <span className="font-mono text-slate-400">{settings.hero_headline.length}</span>
                </label>
                <textarea
                  id="hero-headline"
                  rows={2}
                  value={settings.hero_headline}
                  onChange={(e) => update("hero_headline", e.target.value)}
                  className="cs-input !h-auto py-3 resize-none"
                />
              </div>
              <div>
                <label htmlFor="hero-sub" className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  Subheadline
                  <span className="font-mono text-slate-400">{settings.hero_subheadline.length}</span>
                </label>
                <textarea
                  id="hero-sub"
                  rows={4}
                  value={settings.hero_subheadline}
                  onChange={(e) => update("hero_subheadline", e.target.value)}
                  className="cs-input !h-auto py-3 resize-none"
                />
              </div>
            </div>
            <div className="rounded-[22px] border border-slate-200 bg-white overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 h-9 border-b border-slate-100 bg-slate-50">
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="ml-2 text-[10px] font-mono text-slate-400">Live preview</span>
              </div>
              <div className="p-6">
                <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-emerald-700">Lone-worker safety</p>
                <p className="mt-2 text-2xl font-extrabold text-[#0B2545] tracking-tight leading-tight break-words">
                  {settings.hero_headline || "Headline"}
                </p>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed break-words">{settings.hero_subheadline || "Subheadline"}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#0B2545] text-white text-xs font-bold">
                  Start protection <ArrowRight className="w-3.5 h-3.5 text-[#00E08C]" />
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div
        className={`fixed bottom-0 left-0 right-0 z-30 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          changedKeys.length ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-5xl mx-auto rounded-[24px] bg-[#0B2545] text-white p-3 pl-5 flex items-center justify-between gap-3 shadow-[0_24px_60px_-20px_rgba(11,37,69,0.7)]">
          <p className="text-xs sm:text-sm font-semibold min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-[#00E08C] mr-2 cs-blink" />
            {changedKeys.length} unsaved {changedKeys.length === 1 ? "change" : "changes"}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSettings(saved)}
              className="cs-press h-11 px-4 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="cs-press h-11 px-5 rounded-full bg-[#00E08C] hover:bg-[#00C97D] text-[#0B2545] text-xs font-extrabold flex items-center gap-1.5 cursor-pointer disabled:opacity-70"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              {priceChanged ? "Save & sync Paddle" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <Sheet open={showSignOutModal} onClose={() => setShowSignOutModal(false)} labelledBy="owner-signout-title">
        <SheetHeader
          id="owner-signout-title"
          eyebrow="Owner admin"
          title="Sign out of owner panel?"
          subtitle="Any unsaved price or landing copy changes will be discarded."
          icon={LogOut}
          onClose={() => setShowSignOutModal(false)}
        />
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => {
              setShowSignOutModal(false);
              setAuthed(false);
              showToast("Signed out of owner admin.", "info");
            }}
            className="cs-press w-full min-h-[52px] rounded-full bg-[#0B2545] hover:bg-[#123461] text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-[#00E08C]" />
            <span>Confirm sign out</span>
          </button>
          <button
            type="button"
            onClick={() => setShowSignOutModal(false)}
            className="cs-press w-full min-h-[48px] rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            Stay signed in
          </button>
        </div>
      </Sheet>
    </div>
  );
}
