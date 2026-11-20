"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MapPin, BatteryLow, Plus, Phone, MessageSquareWarning, Flag, RotateCcw, Loader2, AlertTriangle, Copy, PauseCircle, Timer, Shield, CreditCard, Smartphone, Clock, X, } from "lucide-react";
import { useToast } from "@/components/ui/ToastProvider";
import { CheckSafetyLogo } from "@/components/ui/CheckSafetyLogo";
import { buildVerifyUrl } from "@/lib/domains";
import { HibernationModal } from "@/components/modals/HibernationModal";
import { DEFAULT_APP_SETTINGS, } from "@/lib/types";
const INITIAL_PROXY_NUMBERS = [
    {
        id: "proxy-1",
        User_ID: "demo-user",
        Twilio_Number: "+44 7700 900412",
        Country_Code: "GB",
        Assigned_Order: 1,
        Status: "ACTIVE",
    },
    {
        id: "proxy-2",
        User_ID: "demo-user",
        Twilio_Number: "+44 7700 900889",
        Country_Code: "GB",
        Assigned_Order: 2,
        Status: "ACTIVE",
    },
];
const INITIAL_VAULT = [
    {
        id: "tok-1",
        Provider_ID: "demo-user",
        Client_Alias_Name: "Kensington Flat Viewing — J.M.",
        Client_Phone_Hashed: "demo-hash-1",
        SHA256_Fingerprint: "fp_9f8a2c11d4e7",
        Global_Verify_Status: "ACTIVE",
        Link_Used_Status: "USED",
        created_at: "2026-11-18T10:15:00Z",
    },
    {
        id: "tok-2",
        Provider_ID: "demo-user",
        Client_Alias_Name: "Chelsea A-Level Tuition — R.S.",
        Client_Phone_Hashed: "demo-hash-2",
        SHA256_Fingerprint: "fp_4b12e900a1c3",
        Global_Verify_Status: "PENDING",
        Link_Used_Status: "UNUSED",
        created_at: "2026-11-19T08:30:00Z",
    },
];
export default function WorkerDashboardPage() {
    const { showToast } = useToast();
    const [settings, setSettings] = useState(DEFAULT_APP_SETTINGS);
    const [activeTab, setActiveTab] = useState("timer");
    // Worker state
    const [billingStatus, setBillingStatus] = useState("ACTIVE");
    const [tokens, setTokens] = useState(3);
    const [proxyNumbers, setProxyNumbers] = useState(INITIAL_PROXY_NUMBERS);
    const [selectedProxy, setSelectedProxy] = useState(INITIAL_PROXY_NUMBERS[0].Twilio_Number);
    const [vault, setVault] = useState(INITIAL_VAULT);
    // Safety Timer state
    const [selectedClientId, setSelectedClientId] = useState("");
    const [address, setAddress] = useState("");
    const [locating, setLocating] = useState(false);
    const [durationMins, setDurationMins] = useState(60);
    const [totalSessionSecs, setTotalSessionSecs] = useState(3600);
    const [safeCode, setSafeCode] = useState("");
    const [duressCode, setDuressCode] = useState("");
    const [sessionState, setSessionState] = useState("IDLE");
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [codeInput, setCodeInput] = useState("");
    const [startingSession, setStartingSession] = useState(false);
    // Fake low-battery disguise (triple-tap top-left corner)
    const [lowBatteryMode, setLowBatteryMode] = useState(false);
    const tapTimestamps = useRef([]);
    // Modals
    const [showCreateLinkModal, setShowCreateLinkModal] = useState(false);
    const [newAlias, setNewAlias] = useState("");
    const [newClientPhone, setNewClientPhone] = useState("");
    const [generatedVerifyUrl, setGeneratedVerifyUrl] = useState(null);
    const [reportTarget, setReportTarget] = useState(null);
    const [reportCategory, setReportCategory] = useState("Severe Safety / Conduct Breach");
    const [repeatTarget, setRepeatTarget] = useState(null);
    const [repeatPhone, setRepeatPhone] = useState("");
    const [showHibernationModal, setShowHibernationModal] = useState(false);
    const [showSosGuideModal, setShowSosGuideModal] = useState(false);
    const timerSectionRef = useRef(null);
    const vaultSectionRef = useRef(null);
    const creditsSectionRef = useRef(null);
    useEffect(() => {
        fetch("/api/settings")
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
            if (data)
                setSettings(data);
        })
            .catch(() => { });
    }, []);
    // Countdown tick
    useEffect(() => {
        if (sessionState !== "RUNNING")
            return;
        const interval = setInterval(() => {
            setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [sessionState]);
    function jumpToTab(tab) {
        setActiveTab(tab);
        const target = tab === "timer"
            ? timerSectionRef.current
            : tab === "vault"
                ? vaultSectionRef.current
                : creditsSectionRef.current;
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    function handleCornerTap() {
        const now = Date.now();
        tapTimestamps.current = [...tapTimestamps.current.filter((t) => now - t < 700), now];
        if (tapTimestamps.current.length >= 3) {
            tapTimestamps.current = [];
            setLowBatteryMode((prev) => !prev);
        }
    }
    function handleGeolocate() {
        if (!navigator.geolocation) {
            showToast("Geolocation is not supported on this device.", "error");
            return;
        }
        setLocating(true);
        navigator.geolocation.getCurrentPosition((pos) => {
            const coords = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
            setAddress(`GPS: ${coords}`);
            setLocating(false);
            showToast("Current location added to appointment address.", "success");
        }, () => {
            setLocating(false);
            showToast("Location permission denied. Please enter the address manually.", "error");
        }, { enableHighAccuracy: true, timeout: 8000 });
    }
    async function handleStartSession(e) {
        e.preventDefault();
        if (!address.trim()) {
            showToast("Please enter the appointment address.", "error");
            return;
        }
        if (durationMins < 30 || durationMins > 240) {
            showToast("Duration must be between 30 minutes and 4 hours (240 mins).", "error");
            return;
        }
        if (!safeCode.trim() || !duressCode.trim() || safeCode.trim() === duressCode.trim()) {
            showToast("Safe Code and Silent Duress Code must be set and different.", "error");
            return;
        }
        setStartingSession(true);
        try {
            await new Promise((r) => setTimeout(r, 350));
            const secs = durationMins * 60;
            setTotalSessionSecs(secs);
            setSecondsLeft(secs);
            setSessionState("RUNNING");
            showToast(`Safety timer running on ${selectedProxy}.`, "success");
        }
        finally {
            setStartingSession(false);
        }
    }
    function handleExtend15() {
        const maxSecs = 240 * 60;
        setSecondsLeft((prev) => {
            const next = Math.min(prev + 15 * 60, maxSecs);
            setTotalSessionSecs((t) => Math.max(t, next));
            return next;
        });
        showToast("Safety timer extended by 15 minutes.", "info");
    }
    function handleCheckCode(e) {
        e.preventDefault();
        const entered = codeInput.trim();
        if (!entered)
            return;
        if (entered === duressCode.trim()) {
            setSessionState("DURESS");
            setCodeInput("");
            // Confirmation intentionally looks calm/normal so an observer sees nothing unusual
            showToast("Session closed safely.", "success");
            return;
        }
        if (entered === safeCode.trim()) {
            setSessionState("Closed Safely");
            setCodeInput("");
            showToast("Session closed safely. Client number deleted from vault.", "success");
            return;
        }
        showToast("Code not recognised. Check your Safe Code.", "error");
    }
    function handleCreateLink(e) {
        e.preventDefault();
        if (tokens <= 0) {
            showToast("You have 0 verification tokens. Please top up first.", "error");
            return;
        }
        const tokenSlug = Math.random().toString(36).slice(2, 10);
        const newEntry = {
            id: `tok-${Date.now()}`,
            Provider_ID: "demo-user",
            Client_Alias_Name: newAlias.trim() || "New Client",
            Client_Phone_Hashed: `hmac_${newClientPhone.replace(/\D/g, "")}`,
            SHA256_Fingerprint: "",
            Global_Verify_Status: "PENDING",
            Link_Used_Status: "UNUSED",
            created_at: new Date().toISOString(),
        };
        setVault((prev) => [newEntry, ...prev]);
        setGeneratedVerifyUrl(buildVerifyUrl(tokenSlug));
        setNewAlias("");
        setNewClientPhone("");
        showToast("Single-use Client ID link created.", "success");
    }
    function handleTopUp(amount, price) {
        setTokens((prev) => prev + amount);
        showToast(`Added ${amount} verification checks (£${price}).`, "success");
    }
    function handleRepeatVerify(e) {
        e.preventDefault();
        if (!repeatTarget)
            return;
        if (repeatPhone.replace(/\D/g, "").length < 7) {
            showToast("Number does not match stored client hash. A fresh ID check is required.", "error");
            return;
        }
        setSelectedClientId(repeatTarget.id);
        setRepeatTarget(null);
        setRepeatPhone("");
        jumpToTab("timer");
        showToast("Client number verified (£0). Ready to start masked safety session.", "success");
    }
    function handleReportSubmit(e) {
        e.preventDefault();
        if (!reportTarget)
            return;
        setVault((prev) => prev.map((item) => item.id === reportTarget.id
            ? { ...item, Global_Verify_Status: "FLAGGED / HIGH RISK" }
            : item));
        showToast(`Report logged under "${reportCategory}".`, "info");
        setReportTarget(null);
    }
    const activeLines = proxyNumbers.filter((n) => n.Status === "ACTIVE");
    const verifiedClients = vault.filter((c) => c.Global_Verify_Status === "ACTIVE");
    const minsDisplay = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const secsDisplay = String(secondsLeft % 60).padStart(2, "0");
    const progressPct = totalSessionSecs > 0 ? Math.min(100, Math.round((secondsLeft / totalSessionSecs) * 100)) : 0;
    return (<div className="min-h-screen bg-[#F9FAFB] text-[#111827] pb-24">
      {/* Triple-tap top-left invisible trigger for fake low-battery screen */}
      <button type="button" onClick={handleCornerTap} aria-label="Discreet screen toggle" className="fixed top-0 left-0 w-14 h-14 z-40 opacity-0"/>

      {/* Fake Low-Battery Overlay */}
      {lowBatteryMode && (<div onClick={handleCornerTap} className="fixed inset-0 z-50 bg-black text-white flex flex-col items-center justify-center select-none">
          <BatteryLow className="w-16 h-16 text-[#DC2626] animate-pulse"/>
          <p className="mt-3 text-sm font-medium text-neutral-400">Battery critically low (1%)</p>
          <p className="mt-1 text-xs text-neutral-600">Triple-tap top-left to return</p>
        </div>)}

      {/* Top Header (Icon + text-only logo, no tagline) */}
      <header className="bg-[#111827] text-white sticky top-0 z-30">
        <div className="max-w-[390px] mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" aria-label="CheckSafety home" className="inline-flex items-center">
            <CheckSafetyLogo darkSurface size="sm"/>
          </Link>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setShowSosGuideModal(true)} className="px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-semibold text-slate-200 hover:bg-white/20 cursor-pointer">
              Add SOS Icon
            </button>
            <Link href="/sos/demo-sos-token" className="px-3 py-1 rounded-full bg-[#DC2626] text-white text-xs font-bold">
              SOS
            </Link>
            <button type="button" onClick={() => setBillingStatus((prev) => prev === "GRACE_PERIOD" ? "ACTIVE" : "GRACE_PERIOD")} className="px-2 py-1 rounded-full bg-white/10 text-[10px] text-slate-300 cursor-pointer" title="Toggle Grace Banner preview">
              {billingStatus === "GRACE_PERIOD" ? "Grace" : "Active"}
            </button>
          </div>
        </div>
      </header>

      {/* 390px Mobile-First Column */}
      <main className="max-w-[390px] mx-auto px-4 pt-4 space-y-4">
        {/* Grace Banner: hidden and collapsed by default; shown only when GRACE_PERIOD */}
        {billingStatus === "GRACE_PERIOD" && (<div className="bg-[#FEF08A] border border-amber-400 text-[#713F12] rounded-[20px] p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5"/>
            <div className="text-xs leading-relaxed">
              <strong className="block text-sm font-bold">Payment failed — 7-day grace period</strong>
              Your safety timers still work. Update your card within 7 days to avoid moving to
              £{settings.hibernation_1_price_gbp}/month Hibernation Mode.
            </div>
          </div>)}

        {/* 1. P0 Priority: Safety Countdown Panel */}
        <section ref={timerSectionRef} className="bg-white border border-slate-200 rounded-[24px] p-5 shadow-xs scroll-mt-16">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-base font-bold text-[#111827]">Safety Countdown</h1>
            <span aria-live="polite" className={`text-[11px] font-semibold px-3 py-1 rounded-full ${sessionState === "RUNNING"
            ? "bg-emerald-100 text-emerald-800"
            : sessionState === "DURESS"
                ? "bg-red-100 text-[#DC2626]"
                : "bg-slate-100 text-slate-600"}`}>
              {sessionState === "DURESS" ? "Closed Safely" : sessionState}
            </span>
          </div>

          {sessionState === "RUNNING" ? (<div className="space-y-4">
              <div className="bg-[#111827] text-white rounded-[20px] p-5 text-center space-y-2">
                <p className="text-xs text-slate-400">Time remaining</p>
                <p className="text-4xl font-bold font-mono tabular-nums">
                  {minsDisplay}:{secsDisplay}
                </p>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#16A34A] transition-all duration-500" style={{ width: `${progressPct}%` }}/>
                </div>
                <p className="text-xs text-slate-300 truncate pt-1">{address}</p>
                <p className="text-[11px] text-emerald-400">Masked line: {selectedProxy}</p>
                <button type="button" onClick={handleExtend15} className="mt-1 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold cursor-pointer">
                  <Clock className="w-3.5 h-3.5"/>
                  <span>Extend +15m</span>
                </button>
              </div>

              <form onSubmit={handleCheckCode} className="space-y-3">
                <div>
                  <label htmlFor="active-code" className="block text-xs font-medium text-slate-700 mb-1">
                    Enter Safe Code to close (or Silent Duress Code)
                  </label>
                  <input id="active-code" type="password" inputMode="numeric" value={codeInput} onChange={(e) => setCodeInput(e.target.value)} placeholder="Enter code" className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm focus:outline-none focus:ring-2 focus:ring-[#111827]"/>
                </div>
                <button type="submit" className="w-full min-h-[48px] rounded-full bg-[#16A34A] hover:bg-emerald-700 text-white font-semibold text-sm transition cursor-pointer">
                  Confirm Code
                </button>
              </form>

              <a href={`sms:${selectedProxy.replace(/\s+/g, "")}?body=SOS`} className="w-full min-h-[48px] rounded-full bg-[#DC2626] hover:bg-red-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition">
                <MessageSquareWarning className="w-4 h-4"/>
                <span>SOS by SMS</span>
              </a>
            </div>) : (<form onSubmit={handleStartSession} className="space-y-3.5">
              {verifiedClients.length > 0 && (<div>
                  <label htmlFor="vault-client-select" className="block text-xs font-medium text-slate-700 mb-1">
                    Verified client (optional)
                  </label>
                  <select id="vault-client-select" value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)} className="w-full h-12 px-3.5 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm focus:outline-none focus:ring-2 focus:ring-[#111827]">
                    <option value="">General appointment (no vault link)</option>
                    {verifiedClients.map((c) => (<option key={c.id} value={c.id}>
                        {c.Client_Alias_Name}
                      </option>))}
                  </select>
                </div>)}

              <div>
                <label htmlFor="appt-address" className="block text-xs font-medium text-slate-700 mb-1">
                  Appointment address (sent in emergency SMS)
                </label>
                <div className="flex gap-2">
                  <input id="appt-address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Flat 4, 22 Baker Street, NW1 6XE" className="flex-1 min-w-0 h-12 px-3.5 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm focus:outline-none focus:ring-2 focus:ring-[#111827]"/>
                  <button type="button" onClick={handleGeolocate} disabled={locating} aria-label="Use current GPS location" className="min-h-[48px] px-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shrink-0 cursor-pointer">
                    {locating ? (<Loader2 className="w-4 h-4 animate-spin"/>) : (<MapPin className="w-4 h-4"/>)}
                  </button>
                </div>
              </div>

              <div>
                <span className="block text-xs font-medium text-slate-700 mb-1.5">
                  Duration (30 mins – 4 hours)
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[30, 60, 90].map((m) => (<button key={m} type="button" onClick={() => setDurationMins(m)} className={`min-h-[44px] rounded-full text-xs font-semibold border transition cursor-pointer ${durationMins === m
                    ? "bg-[#111827] text-white border-[#111827]"
                    : "bg-[#F9FAFB] text-slate-700 border-slate-200"}`}>
                      {m}m
                    </button>))}
                  <input type="number" min={30} max={240} aria-label="Custom minutes" value={durationMins} onChange={(e) => setDurationMins(Number(e.target.value))} className="h-[44px] px-2 rounded-full border border-slate-300 bg-[#F9FAFB] text-xs text-center font-semibold tabular-nums"/>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label htmlFor="safe-code" className="block text-xs font-medium text-slate-700 mb-1">
                    Safe Code
                  </label>
                  <input id="safe-code" type="password" inputMode="numeric" value={safeCode} onChange={(e) => setSafeCode(e.target.value)} placeholder="e.g. 1234" className="w-full h-12 px-3 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm focus:outline-none focus:ring-2 focus:ring-[#111827]"/>
                </div>
                <div>
                  <label htmlFor="duress-code" className="block text-xs font-medium text-slate-700 mb-1">
                    Silent Duress Code
                  </label>
                  <input id="duress-code" type="password" inputMode="numeric" value={duressCode} onChange={(e) => setDuressCode(e.target.value)} placeholder="e.g. 9999" className="w-full h-12 px-3 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm focus:outline-none focus:ring-2 focus:ring-[#111827]"/>
                </div>
              </div>

              {activeLines.length === 0 ? (<div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  No active proxy lines (Hibernation or Paused). Reactivate a plan to mask calls.
                </div>) : (activeLines.length > 1 && (<div>
                    <label htmlFor="proxy-select" className="block text-xs font-medium text-slate-700 mb-1">
                      Masked proxy number for this session
                    </label>
                    <select id="proxy-select" value={selectedProxy} onChange={(e) => setSelectedProxy(e.target.value)} className="w-full h-12 px-3 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#111827]">
                      {activeLines.map((n) => (<option key={n.id} value={n.Twilio_Number}>
                          {n.Twilio_Number} (Line #{n.Assigned_Order})
                        </option>))}
                    </select>
                  </div>))}

              <button type="submit" disabled={startingSession} className="w-full min-h-[48px] rounded-full bg-[#16A34A] hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer">
                {startingSession ? (<Loader2 className="w-4 h-4 animate-spin"/>) : (<Phone className="w-4 h-4"/>)}
                <span>START SAFETY TIMER &amp; MASK LINE</span>
              </button>

              <a href={`sms:${selectedProxy.replace(/\s+/g, "")}?body=SOS`} className="w-full min-h-[48px] rounded-full border border-[#DC2626] text-[#DC2626] hover:bg-red-50 font-semibold text-sm flex items-center justify-center gap-2 transition">
                <MessageSquareWarning className="w-4 h-4"/>
                <span>SOS by SMS</span>
              </a>
            </form>)}
        </section>

        {/* 2. Trusted Client Vault */}
        <section ref={vaultSectionRef} className="bg-white border border-slate-200 rounded-[24px] p-5 shadow-xs scroll-mt-16">
          <h2 className="text-base font-bold text-[#111827]">Trusted Client Vault</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Zero-knowledge hashes only. Repeat verified clients at £0.
          </p>

          {vault.length === 0 ? (<div className="mt-4 p-5 rounded-2xl bg-[#F3F7F4] text-center space-y-2">
              <p className="text-sm font-semibold text-[#111827]">No verified clients yet</p>
              <p className="text-xs text-slate-600">
                Generate a single-use ID link below before your next first-time appointment.
              </p>
            </div>) : (<div className="mt-3 space-y-2.5">
              {vault.map((client) => (<div key={client.id} className="p-3.5 rounded-2xl border border-slate-200 bg-[#F9FAFB] space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#111827] truncate">
                        {client.Client_Alias_Name}
                      </p>
                      <p className="text-[11px] font-mono text-slate-500">
                        {client.SHA256_Fingerprint || "Awaiting scan"}
                      </p>
                    </div>
                    <span className={`shrink-0 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${client.Global_Verify_Status === "ACTIVE"
                    ? "bg-emerald-100 text-emerald-800"
                    : client.Global_Verify_Status === "FLAGGED / HIGH RISK"
                        ? "bg-red-100 text-[#DC2626]"
                        : "bg-slate-200 text-slate-700"}`}>
                      {client.Global_Verify_Status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setRepeatTarget(client)} className="min-h-[44px] px-2.5 rounded-full bg-white border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-[#111827] inline-flex items-center justify-center gap-1.5 cursor-pointer">
                      <RotateCcw className="w-3.5 h-3.5"/>
                      <span>Repeat (£0)</span>
                    </button>
                    <button type="button" onClick={() => setReportTarget(client)} className="min-h-[44px] px-2.5 rounded-full bg-white border border-red-200 hover:bg-red-50 text-xs font-semibold text-[#DC2626] inline-flex items-center justify-center gap-1.5 cursor-pointer">
                      <Flag className="w-3.5 h-3.5"/>
                      <span>Report Issue</span>
                    </button>
                  </div>
                </div>))}
            </div>)}
        </section>

        {/* 3. Checks & Top-ups Card */}
        <section ref={creditsSectionRef} className="bg-white border border-slate-200 rounded-[24px] p-5 shadow-xs scroll-mt-16">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-slate-500">Verification tokens</p>
              <p className="text-3xl font-bold tabular-nums tracking-tight text-[#111827] mt-0.5">
                {tokens}
              </p>
            </div>
            <button type="button" disabled={tokens === 0} onClick={() => {
            setGeneratedVerifyUrl(null);
            setShowCreateLinkModal(true);
        }} className="min-h-[48px] px-4 rounded-full bg-[#111827] hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer">
              <Plus className="w-4 h-4"/>
              <span>Generate Client ID Link</span>
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <p className="text-xs font-medium text-slate-500 mb-2">Top up ID checks</p>
            <div className="grid grid-cols-3 gap-2">
              <button type="button" onClick={() => handleTopUp(5, settings.topup_5_price_gbp)} className="min-h-[48px] px-2 py-2 rounded-2xl border border-slate-200 bg-[#F3F7F4] hover:bg-slate-200/70 text-center transition cursor-pointer">
                <div className="text-xs font-bold text-[#111827]">5 Checks</div>
                <div className="text-xs text-slate-600 tabular-nums">
                  £{settings.topup_5_price_gbp}
                </div>
              </button>
              <button type="button" onClick={() => handleTopUp(15, settings.topup_15_price_gbp)} className="min-h-[48px] px-2 py-2 rounded-2xl border border-slate-200 bg-[#F3F7F4] hover:bg-slate-200/70 text-center transition cursor-pointer">
                <div className="text-xs font-bold text-[#111827]">15 Checks</div>
                <div className="text-xs text-slate-600 tabular-nums">
                  £{settings.topup_15_price_gbp}
                </div>
              </button>
              <button type="button" onClick={() => handleTopUp(50, settings.topup_50_price_gbp)} className="min-h-[48px] px-2 py-2 rounded-2xl border border-slate-200 bg-[#F3F7F4] hover:bg-slate-200/70 text-center transition cursor-pointer">
                <div className="text-xs font-bold text-[#111827]">50 Checks</div>
                <div className="text-xs text-slate-600 tabular-nums">
                  £{settings.topup_50_price_gbp}
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Subscription Footer Action */}
        <section className="pt-2 pb-4 text-center">
          <button type="button" onClick={() => setShowHibernationModal(true)} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#DC2626] py-2 px-3 cursor-pointer">
            <PauseCircle className="w-4 h-4"/>
            <span>Cancel Subscription</span>
          </button>
        </section>
      </main>

      {/* Sticky 390px Bottom PWA Tab Bar */}
      <nav aria-label="Dashboard sections" className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur border-t border-slate-200">
        <div className="max-w-[390px] mx-auto px-4 h-16 grid grid-cols-3 gap-2 items-center">
          <button type="button" onClick={() => jumpToTab("timer")} className={`min-h-[44px] rounded-full flex flex-col items-center justify-center text-[11px] font-semibold cursor-pointer ${activeTab === "timer" ? "bg-[#111827] text-white" : "text-slate-600"}`}>
            <Timer className="w-4 h-4"/>
            <span>Timer</span>
          </button>
          <button type="button" onClick={() => jumpToTab("vault")} className={`min-h-[44px] rounded-full flex flex-col items-center justify-center text-[11px] font-semibold cursor-pointer ${activeTab === "vault" ? "bg-[#111827] text-white" : "text-slate-600"}`}>
            <Shield className="w-4 h-4"/>
            <span>Vault</span>
          </button>
          <button type="button" onClick={() => jumpToTab("credits")} className={`min-h-[44px] rounded-full flex flex-col items-center justify-center text-[11px] font-semibold cursor-pointer ${activeTab === "credits" ? "bg-[#111827] text-white" : "text-slate-600"}`}>
            <CreditCard className="w-4 h-4"/>
            <span>Credits ({tokens})</span>
          </button>
        </div>
      </nav>

      {/* Add SOS Shortcut Guide Modal */}
      {showSosGuideModal && (<div role="dialog" aria-modal="true" className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[390px] bg-white rounded-t-2xl sm:rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#16A34A]"/>
                <h2 className="text-base font-bold">Add SOS to Home Screen</h2>
              </div>
              <button type="button" onClick={() => setShowSosGuideModal(false)} aria-label="Close" className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5"/>
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your private SOS page works <strong>without logging in</strong>, even from an iPhone
              Home Screen shortcut.
            </p>
            <div className="p-3.5 rounded-2xl bg-[#F3F7F4] text-xs space-y-1.5 text-slate-700">
              <p>
                <strong>iPhone (Safari):</strong> Open your SOS page, tap{" "}
                <strong>Share</strong>, then choose <strong>Add to Home Screen</strong>.
              </p>
              <p>
                <strong>Android (Chrome):</strong> Open your SOS page, tap the{" "}
                <strong>⋮ menu</strong>, then choose <strong>Install app / Add to Home screen</strong>.
              </p>
            </div>
            <Link href="/sos/demo-sos-token" className="w-full min-h-[48px] rounded-full bg-[#DC2626] text-white font-semibold text-sm flex items-center justify-center">
              Open Private SOS Page
            </Link>
          </div>
        </div>)}

      {/* Generate Client ID Link Modal */}
      {showCreateLinkModal && (<div role="dialog" aria-modal="true" className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[390px] bg-white rounded-t-2xl sm:rounded-2xl p-5">
            <h2 className="text-base font-bold text-[#111827]">Generate Client ID Link</h2>
            <p className="text-xs text-slate-600 mt-1">
              Enter your client&apos;s mobile number. It is encrypted in the vault and hashed with
              HMAC-SHA256—never stored in readable form.
            </p>
            {generatedVerifyUrl ? (<div className="mt-4 space-y-3">
                <div className="p-3 rounded-xl bg-[#F9FAFB] border border-slate-200 text-xs font-mono break-all">
                  {generatedVerifyUrl}
                </div>
                <button type="button" onClick={() => {
                    navigator.clipboard?.writeText(generatedVerifyUrl);
                    showToast("Verification link copied.", "success");
                }} className="w-full min-h-[48px] rounded-full bg-[#16A34A] text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer">
                  <Copy className="w-4 h-4"/>
                  <span>Copy Single-Use Link</span>
                </button>
                <button type="button" onClick={() => setShowCreateLinkModal(false)} className="w-full min-h-[44px] rounded-full text-xs font-medium text-slate-600 cursor-pointer">
                  Done
                </button>
              </div>) : (<form onSubmit={handleCreateLink} className="mt-4 space-y-3">
                <input type="text" required value={newAlias} onChange={(e) => setNewAlias(e.target.value)} placeholder="Client alias (e.g. Flat 2 Viewing)" className="w-full h-12 px-3.5 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm"/>
                <input type="tel" required value={newClientPhone} onChange={(e) => setNewClientPhone(e.target.value)} placeholder="Client mobile (+44 7700 900123)" className="w-full h-12 px-3.5 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm"/>
                <button type="submit" className="w-full min-h-[48px] rounded-full bg-[#111827] text-white font-semibold text-sm cursor-pointer">
                  Create Link (Uses 1 token on approval)
                </button>
                <button type="button" onClick={() => setShowCreateLinkModal(false)} className="w-full min-h-[44px] rounded-full text-xs font-medium text-slate-600 cursor-pointer">
                  Cancel
                </button>
              </form>)}
          </div>
        </div>)}

      {/* Repeat Session (£0) Phone Hash Verification Modal */}
      {repeatTarget && (<div role="dialog" aria-modal="true" className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[390px] bg-white rounded-t-2xl sm:rounded-2xl p-5">
            <h2 className="text-base font-bold text-[#111827]">Repeat Session (£0)</h2>
            <p className="text-xs text-slate-600 mt-1">
              Re-enter the mobile number for <strong>{repeatTarget.Client_Alias_Name}</strong> to
              confirm it matches the stored hash.
            </p>
            <form onSubmit={handleRepeatVerify} className="mt-4 space-y-3">
              <input type="tel" required value={repeatPhone} onChange={(e) => setRepeatPhone(e.target.value)} placeholder="+44 7700 900123" className="w-full h-12 px-3.5 rounded-xl border border-slate-300 bg-[#F9FAFB] text-sm"/>
              <button type="submit" className="w-full min-h-[48px] rounded-full bg-[#16A34A] text-white font-semibold text-sm cursor-pointer">
                Verify &amp; Start Session (£0)
              </button>
              <button type="button" onClick={() => setRepeatTarget(null)} className="w-full min-h-[44px] rounded-full text-xs font-medium text-slate-600 cursor-pointer">
                Cancel
              </button>
            </form>
          </div>
        </div>)}

      {/* Report Issue Modal */}
      {reportTarget && (<div role="dialog" aria-modal="true" className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[390px] bg-white rounded-t-2xl sm:rounded-2xl p-5">
            <h2 className="text-base font-bold text-[#111827]">Report Issue</h2>
            <p className="text-xs text-slate-600 mt-1">
              Saves the client&apos;s anonymised fingerprint to the server-side{" "}
              <code>Global_Safety_Hash</code> list.
            </p>
            <form onSubmit={handleReportSubmit} className="mt-4 space-y-2.5">
              {[
                "Severe Safety / Conduct Breach",
                "Non-Payment / Fraud",
                "Minor Late Cancellation",
            ].map((cat) => (<label key={cat} className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-medium cursor-pointer ${reportCategory === cat
                    ? "border-[#DC2626] bg-red-50 text-[#111827]"
                    : "border-slate-200 bg-[#F9FAFB] text-slate-700"}`}>
                  <input type="radio" name="reportCategory" checked={reportCategory === cat} onChange={() => setReportCategory(cat)}/>
                  <span>{cat}</span>
                </label>))}
              <button type="submit" className="w-full min-h-[48px] rounded-full bg-[#DC2626] text-white font-semibold text-sm mt-2 cursor-pointer">
                Submit Safety Report
              </button>
              <button type="button" onClick={() => setReportTarget(null)} className="w-full min-h-[44px] rounded-full text-xs font-medium text-slate-600 cursor-pointer">
                Cancel
              </button>
            </form>
          </div>
        </div>)}

      {/* Cancellation / Hibernation Modal */}
      <HibernationModal open={showHibernationModal} onClose={() => setShowHibernationModal(false)} proxyNumbers={proxyNumbers} settings={settings} onConfirmHibernation={async (keptIds, price) => {
            setProxyNumbers((prev) => prev.map((n) => ({
                ...n,
                Status: keptIds.includes(n.id) ? "RESERVED" : "RELEASED",
            })));
            showToast(`Switched to Hibernation Mode (£${price}/month). Kept ${keptIds.length} number(s).`, "success");
        }}/>
    </div>);
}
