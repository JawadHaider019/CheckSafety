"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  BatteryLow,
  Plus,
  Phone,
  MessageSquareWarning,
  Flag,
  RotateCcw,
  Loader2,
  AlertTriangle,
  Copy,
  PauseCircle,
  Timer,
  Shield,
  CreditCard,
  Smartphone,
  Clock,
  CheckCircle2,
  Lock,
  Undo2,
  Users,
  ArrowRight,
  Fingerprint,
  Link2,
  BellRing,
  LogOut,
} from "lucide-react";
import { useToast } from "@/components/ui/ToastProvider";
import { AppHeader, SectionLabel, Sheet, SheetHeader } from "@/components/ui/AppShell";
import { buildVerifyUrl } from "@/lib/domains";
import { HibernationModal } from "@/components/modals/HibernationModal";
import { DEFAULT_APP_SETTINGS } from "@/lib/types";
import { COUNTRY_LIST, SUPPORTED_COUNTRIES, COUNTRY_FLAGS } from "@/lib/countries";
import { useClientValue, useSearchString } from "@/lib/useClientSnapshot";
import { RequireAuth } from "@/components/ui/RequireAuth";
import { signOut } from "@/lib/demoAuth";

function readGreeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

const ACCOUNT = { plan: "Pro", isAgencyAdmin: true };
const GRACE_WINDOW_SECS = 300;
const REPORT_CATEGORIES = ["Severe Safety / Conduct Breach", "Non-Payment / Fraud", "Minor Late Cancellation"];

const INITIAL_PROXY_NUMBERS = [
  { id: "proxy-1", User_ID: "demo-user", Twilio_Number: "+44 7700 900412", Country_Code: "GB", Assigned_Order: 1, Status: "ACTIVE" },
  { id: "proxy-2", User_ID: "demo-user", Twilio_Number: "+44 7700 900889", Country_Code: "GB", Assigned_Order: 2, Status: "ACTIVE" },
];

const INITIAL_VAULT = [
  {
    id: "tok-1",
    Client_Alias_Name: "Kensington Flat Viewing — J.M.",
    SHA256_Fingerprint: "fp_9f8a2c11d4e7",
    Global_Verify_Status: "ACTIVE",
    Link_Used_Status: "USED",
    reportLocked: false,
  },
  {
    id: "tok-2",
    Client_Alias_Name: "Soho Evening Viewing — K.T.",
    SHA256_Fingerprint: "fp_7c31b804e9d2",
    Global_Verify_Status: "FLAGGED / HIGH RISK",
    Link_Used_Status: "USED",
    reportCategory: "Severe Safety / Conduct Breach",
    reportLocked: false,
  },
  {
    id: "tok-3",
    Client_Alias_Name: "Chelsea A-Level Tuition — R.S.",
    SHA256_Fingerprint: "",
    Global_Verify_Status: "PENDING",
    Link_Used_Status: "UNUSED",
    reportLocked: false,
  },
];

function formatClock(totalSecs) {
  const h = Math.floor(totalSecs / 3600);
  const m = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, "0");
  const s = String(totalSecs % 60).padStart(2, "0");
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
}

function formatDurationLabel(mins) {
  if (!mins || mins < 15) return "Min 15m";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}

function timeOfDay(d) {
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function CountdownRing({ progress, color, children }) {
  const r = 100;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative w-[232px] h-[232px] mx-auto">
      <svg viewBox="0 0 232 232" className="w-full h-full -rotate-90" aria-hidden="true">
        <circle cx="116" cy="116" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <circle
          className="cs-ring-track"
          cx="116"
          cy="116"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
          style={{ filter: `drop-shadow(0 0 8px ${color}66)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}

function StageTracker({ stage }) {
  const steps = ["Timer", "Warning SMS", "5 min grace", "Contact alerted"];
  return (
    <ol className="grid grid-cols-4 gap-1.5" aria-label="Alert stages">
      {steps.map((label, i) => {
        const done = i < stage;
        const active = i === stage;
        return (
          <li key={label} className="min-w-0">
            <span
              className={`block h-1 rounded-full transition-colors duration-500 ${
                done ? "bg-[#00E08C]" : active ? (i >= 1 ? "bg-amber-400" : "bg-white") : "bg-white/15"
              }`}
            />
            <span className={`mt-1.5 block text-[9px] font-semibold truncate ${active ? "text-white" : "text-slate-400"}`}>
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function FieldLabel({ htmlFor, children, aside }) {
  return (
    <div className="flex items-center justify-between mb-1.5">
      <label htmlFor={htmlFor} className="text-xs font-semibold text-slate-700">
        {children}
      </label>
      {aside}
    </div>
  );
}

function PhoneInput({ country, onCountry, value, onChange, label }) {
  return (
    <div className="flex gap-2">
      <select
        aria-label={`${label} country code`}
        value={country}
        onChange={(e) => onCountry(e.target.value)}
        className="cs-input !w-auto !px-2.5 text-xs font-semibold shrink-0 cursor-pointer"
      >
        {COUNTRY_LIST.map((c) => (
          <option key={c.code} value={c.code}>
            {COUNTRY_FLAGS[c.code]} {c.dialCode}
          </option>
        ))}
      </select>
      <input
        type="tel"
        required
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={(SUPPORTED_COUNTRIES[country] || SUPPORTED_COUNTRIES.GB).phonePlaceholder}
        className="cs-input flex-1 min-w-0"
      />
    </div>
  );
}

export default function WorkerDashboardPage() {
  return (
    <RequireAuth>
      <WorkerDashboard />
    </RequireAuth>
  );
}

function WorkerDashboard() {
  const { showToast } = useToast();
  const settings = DEFAULT_APP_SETTINGS;
  const [activeTab, setActiveTab] = useState("timer");
  const [preview, setPreview] = useState({ fast: false, tools: false });

  const [country, setCountry] = useState("GB");
  const [newClientPhoneCountry, setNewClientPhoneCountry] = useState("GB");
  const [repeatPhoneCountry, setRepeatPhoneCountry] = useState("GB");

  const [billingStatus, setBillingStatus] = useState("ACTIVE");
  const [tokens, setTokens] = useState(3);
  const [proxyNumbers, setProxyNumbers] = useState(INITIAL_PROXY_NUMBERS);
  const [selectedProxy, setSelectedProxy] = useState(INITIAL_PROXY_NUMBERS[0].Twilio_Number);
  const [vault, setVault] = useState(INITIAL_VAULT);

  const [selectedClientId, setSelectedClientId] = useState("");
  const [address, setAddress] = useState("");
  const [locating, setLocating] = useState(false);
  const [durationMins, setDurationMins] = useState(60);
  const [customDurationInput, setCustomDurationInput] = useState("60");
  const [totalSessionSecs, setTotalSessionSecs] = useState(3600);
  const [safeCode, setSafeCode] = useState("");
  const [duressCode, setDuressCode] = useState("");
  const [sessionState, setSessionState] = useState("IDLE");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [graceLeft, setGraceLeft] = useState(GRACE_WINDOW_SECS);
  const [sessionEndsAt, setSessionEndsAt] = useState(null);
  const [alertSentAt, setAlertSentAt] = useState(null);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [startingSession, setStartingSession] = useState(false);
  const [checkingCode, setCheckingCode] = useState(false);

  const [lowBatteryMode, setLowBatteryMode] = useState(false);
  const tapTimestamps = useRef([]);

  const [showCreateLinkModal, setShowCreateLinkModal] = useState(false);
  const [newAlias, setNewAlias] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [generatedVerifyUrl, setGeneratedVerifyUrl] = useState(null);
  const [creatingLink, setCreatingLink] = useState(false);

  const [reportTarget, setReportTarget] = useState(null);
  const [reportCategory, setReportCategory] = useState(REPORT_CATEGORIES[0]);
  const [reportConfirmStep, setReportConfirmStep] = useState(false);
  const [undoTimers, setUndoTimers] = useState({ "tok-2": { secondsLeft: 540, previousStatus: "ACTIVE" } });

  const [repeatTarget, setRepeatTarget] = useState(null);
  const [repeatPhone, setRepeatPhone] = useState("");
  const [verifyingRepeat, setVerifyingRepeat] = useState(false);
  const [showHibernationModal, setShowHibernationModal] = useState(false);
  const [showSosGuideModal, setShowSosGuideModal] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [buyingPack, setBuyingPack] = useState(null);

  const timerSectionRef = useRef(null);
  const vaultSectionRef = useRef(null);
  const creditsSectionRef = useRef(null);

  const search = useSearchString();
  const greeting = useClientValue(readGreeting, "Welcome back");
  const [appliedSearch, setAppliedSearch] = useState("");
  if (search !== appliedSearch) {
    setAppliedSearch(search);
    const params = new URLSearchParams(search);
    const urlCountry = params.get("country");
    if (urlCountry && SUPPORTED_COUNTRIES[urlCountry]) {
      setCountry(urlCountry);
      setNewClientPhoneCountry(urlCountry);
      setRepeatPhoneCountry(urlCountry);
    }
    const flags = (params.get("preview") || "").split(",");
    if (flags.includes("grace")) setBillingStatus("GRACE_PERIOD");
    setPreview({ fast: flags.includes("fast"), tools: flags.some(Boolean) });
    if (params.get("cancel") === "1" || flags.includes("cancel") || params.get("modal") === "cancel") {
      setShowHibernationModal(true);
    }
  }

  // Session clock: main countdown, then the 5-minute grace window after the Stage 1 warning
  useEffect(() => {
    if (sessionState !== "RUNNING" && sessionState !== "GRACE") return;
    const step = preview.fast ? 30 : 1;
    const id = setTimeout(() => {
      if (sessionState === "RUNNING") {
        const next = Math.max(0, secondsLeft - step);
        setSecondsLeft(next);
        if (next === 0) {
          setSessionState("GRACE");
          setGraceLeft(GRACE_WINDOW_SECS);
          navigator.vibrate?.([200, 100, 200]);
          showToast("Timer expired. Warning SMS sent to your phone — enter your Safe Code within 5 minutes.", "error");
        }
      } else {
        const next = Math.max(0, graceLeft - step);
        setGraceLeft(next);
        if (next === 0) {
          setSessionState("Expired Crisis");
          setAlertSentAt(new Date());
          showToast("No Safe Code received. Your emergency contact has been alerted.", "error");
        }
      }
    }, 1000);
    return () => clearTimeout(id);
  }, [sessionState, secondsLeft, graceLeft, preview.fast, showToast]);

  // 10-minute undo window for safety reports
  useEffect(() => {
    if (Object.keys(undoTimers).length === 0) return;
    const id = setInterval(() => {
      setUndoTimers((prev) => {
        const next = {};
        const locked = [];
        for (const [cid, info] of Object.entries(prev)) {
          if (info.secondsLeft <= 1) locked.push(cid);
          else next[cid] = { ...info, secondsLeft: info.secondsLeft - 1 };
        }
        if (locked.length) {
          setVault((v) => v.map((item) => (locked.includes(item.id) ? { ...item, reportLocked: true } : item)));
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [undoTimers]);

  // Keep the bottom tab bar in sync with the section on screen
  useEffect(() => {
    const sections = [
      ["timer", timerSectionRef.current],
      ["vault", vaultSectionRef.current],
      ["credits", creditsSectionRef.current],
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const match = sections.find(([, el]) => el === entry.target);
          if (match) setActiveTab(match[0]);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach(([, el]) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function selectPresetDuration(mins) {
    setDurationMins(mins);
    setCustomDurationInput(String(mins));
  }

  function handleCustomDurationChange(val) {
    setCustomDurationInput(val);
    const parsed = parseInt(val, 10);
    if (!Number.isNaN(parsed)) setDurationMins(parsed);
  }

  function handleCustomDurationBlur() {
    const parsed = parseInt(customDurationInput, 10);
    const clamped = Number.isNaN(parsed) ? 15 : Math.min(240, Math.max(15, parsed));
    setDurationMins(clamped);
    setCustomDurationInput(String(clamped));
  }

  function jumpToTab(tab) {
    setActiveTab(tab);
    const target =
      tab === "timer" ? timerSectionRef.current : tab === "vault" ? vaultSectionRef.current : creditsSectionRef.current;
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
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setAddress(`GPS: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
        setLocating(false);
        showToast("Current location added.", "success");
      },
      () => {
        setLocating(false);
        showToast("Location permission denied. Enter the address manually.", "error");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  async function handleStartSession(e) {
    e.preventDefault();
    if (!address.trim()) {
      showToast("Enter the appointment address.", "error");
      return;
    }
    if (durationMins < 15 || durationMins > 240) {
      showToast("Duration must be between 15 minutes and 4 hours.", "error");
      return;
    }
    if (!safeCode.trim() || !duressCode.trim()) {
      showToast("Set both a Safe Code and a Silent Duress Code.", "error");
      return;
    }
    if (safeCode.trim() === duressCode.trim()) {
      showToast("Safe Code and Duress Code must be different.", "error");
      return;
    }
    setStartingSession(true);
    await new Promise((r) => setTimeout(r, 700));
    const secs = durationMins * 60;
    setTotalSessionSecs(secs);
    setSecondsLeft(secs);
    setSessionEndsAt(new Date(Date.now() + secs * 1000));
    setSessionState("RUNNING");
    setStartingSession(false);
    showToast(`Safety timer running · masked line ${selectedProxy}`, "success");
    timerSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleExtend15() {
    const maxSecs = 240 * 60;
    const next = Math.min(secondsLeft + 15 * 60, maxSecs);
    setSecondsLeft(next);
    setTotalSessionSecs((t) => Math.max(t, next));
    setSessionEndsAt(new Date(Date.now() + next * 1000));
    showToast("Timer extended by 15 minutes.", "info");
  }

  async function handleCheckCode(e) {
    e.preventDefault();
    const entered = codeInput.trim();
    if (!entered) return;
    setCheckingCode(true);
    await new Promise((r) => setTimeout(r, 450));
    setCheckingCode(false);
    if (entered === duressCode.trim()) {
      // Silent: the screen must look exactly like a safe close
      setSessionState("DURESS");
      setCodeInput("");
      showToast("Session closed safely.", "success");
      return;
    }
    if (entered === safeCode.trim()) {
      setSessionState("Closed Safely");
      setCodeInput("");
      showToast("Session closed safely.", "success");
      return;
    }
    setCodeError(true);
    setTimeout(() => setCodeError(false), 400);
    showToast("Code not recognised. Try again.", "error");
  }

  function resetSession() {
    setSessionState("IDLE");
    setSecondsLeft(0);
    setGraceLeft(GRACE_WINDOW_SECS);
    setSafeCode("");
    setDuressCode("");
    setCodeInput("");
    setAlertSentAt(null);
  }

  async function handleCreateLink(e) {
    e.preventDefault();
    if (tokens <= 0) {
      showToast("You have 0 ID checks left. Top up first.", "error");
      return;
    }
    setCreatingLink(true);
    await new Promise((r) => setTimeout(r, 700));
    const newEntry = {
      id: `tok-${Date.now()}`,
      Client_Alias_Name: newAlias.trim() || "New Client",
      SHA256_Fingerprint: "",
      Global_Verify_Status: "PENDING",
      Link_Used_Status: "UNUSED",
      reportLocked: false,
    };
    setVault((prev) => [newEntry, ...prev]);
    setGeneratedVerifyUrl(buildVerifyUrl(Math.random().toString(36).slice(2, 10)));
    setNewAlias("");
    setNewClientPhone("");
    setCreatingLink(false);
    showToast("Single-use ID link created.", "success");
  }

  async function handleTopUp(amount, price) {
    setBuyingPack(amount);
    await new Promise((r) => setTimeout(r, 700));
    setTokens((prev) => prev + amount);
    setBuyingPack(null);
    showToast(`Added ${amount} ID checks (£${price}).`, "success");
  }

  async function handleRepeatVerify(e) {
    e.preventDefault();
    if (!repeatTarget) return;
    setVerifyingRepeat(true);
    await new Promise((r) => setTimeout(r, 600));
    setVerifyingRepeat(false);
    if (repeatPhone.replace(/\D/g, "").length < 7) {
      showToast("Number doesn't match the stored hash. A fresh ID check is needed.", "error");
      return;
    }
    setSelectedClientId(repeatTarget.id);
    setRepeatTarget(null);
    setRepeatPhone("");
    jumpToTab("timer");
    showToast("Number matched (£0). Ready to start a masked session.", "success");
  }

  function openReportModal(client) {
    if (client.reportLocked) {
      showToast("This report is permanently locked.", "info");
      return;
    }
    setReportTarget(client);
    setReportCategory(REPORT_CATEGORIES[0]);
    setReportConfirmStep(false);
  }

  function handleReportStepSubmit(e) {
    e.preventDefault();
    if (!reportTarget) return;
    if (!reportConfirmStep) {
      setReportConfirmStep(true);
      return;
    }
    const targetId = reportTarget.id;
    const prevStatus =
      reportTarget.Global_Verify_Status === "FLAGGED / HIGH RISK" ? "ACTIVE" : reportTarget.Global_Verify_Status;
    setVault((prev) =>
      prev.map((item) =>
        item.id === targetId
          ? { ...item, Global_Verify_Status: "FLAGGED / HIGH RISK", reportCategory, reportLocked: false }
          : item
      )
    );
    if (selectedClientId === targetId) setSelectedClientId("");
    setUndoTimers((prev) => ({ ...prev, [targetId]: { secondsLeft: 600, previousStatus: prevStatus } }));
    showToast("Report submitted. You have 10 minutes to undo.", "info");
    setReportTarget(null);
    setReportConfirmStep(false);
  }

  function handleUndoReport(clientId) {
    const info = undoTimers[clientId];
    if (!info) return;
    setVault((prev) =>
      prev.map((item) =>
        item.id === clientId
          ? { ...item, Global_Verify_Status: info.previousStatus || "ACTIVE", reportCategory: undefined, reportLocked: false }
          : item
      )
    );
    setUndoTimers((prev) => {
      const next = { ...prev };
      delete next[clientId];
      return next;
    });
    showToast("Report undone. Client restored.", "success");
  }

  function handleLockReportNow(clientId) {
    setUndoTimers((prev) => {
      const next = { ...prev };
      delete next[clientId];
      return next;
    });
    setVault((prev) => prev.map((item) => (item.id === clientId ? { ...item, reportLocked: true } : item)));
  }

  const countryCfg = SUPPORTED_COUNTRIES[country] || SUPPORTED_COUNTRIES.GB;
  const activeLines = proxyNumbers.filter((n) => n.Status === "ACTIVE");
  const verifiedClients = vault.filter((c) => c.Global_Verify_Status === "ACTIVE");
  const isLive = sessionState === "RUNNING" || sessionState === "GRACE";
  const isClosedSafely = sessionState === "Closed Safely" || sessionState === "DURESS";
  const progress = totalSessionSecs > 0 ? secondsLeft / totalSessionSecs : 0;
  const ringColor = progress > 0.2 ? "#00E08C" : progress > 0.08 ? "#FBBF24" : "#F87171";
  const tabs = [
    { tab: "timer", icon: Timer, label: "Timer" },
    { tab: "vault", icon: Shield, label: "Vault" },
    { tab: "credits", icon: CreditCard, label: "Checks" },
  ];
  const activeTabIndex = tabs.findIndex((t) => t.tab === activeTab);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] pb-28 lg:pb-12 overflow-x-clip">
      <button
        type="button"
        onClick={handleCornerTap}
        aria-label="Discreet screen toggle"
        className="fixed top-0 left-0 w-14 h-14 z-40 opacity-0"
      />

      {lowBatteryMode && (
        <div
          onClick={handleCornerTap}
          className="cs-fade fixed inset-0 z-[60] bg-black text-white flex flex-col items-center justify-center select-none"
        >
          <BatteryLow className="w-16 h-16 text-[#DC2626] animate-pulse" />
          <p className="mt-3 text-sm font-medium text-neutral-400">Battery critically low (1%)</p>
          <p className="mt-1 text-xs text-neutral-600">Connect to power</p>
        </div>
      )}

      <AppHeader maxWidth="max-w-[390px] md:max-w-3xl lg:max-w-[1200px]">
        <button
          type="button"
          onClick={() => setShowSosGuideModal(true)}
          aria-label="Add SOS to home screen"
          className="cs-press h-9 w-9 rounded-full bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
        >
          <Smartphone className="w-4 h-4" />
        </button>
        <Link
          href="/sos/demo-sos-token"
          className="cs-press h-9 px-3.5 rounded-full bg-[#DC2626] hover:bg-red-700 text-white text-xs font-extrabold tracking-wide flex items-center shadow-[0_6px_16px_-6px_rgba(220,38,38,0.7)]"
        >
          SOS
        </Link>
      </AppHeader>

      <main className="max-w-[390px] md:max-w-3xl lg:max-w-[1200px] mx-auto px-4 md:px-6 pt-5 lg:pt-8 grid gap-4 lg:gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-start">
        {billingStatus === "GRACE_PERIOD" && (
          <div className="cs-rise lg:col-span-2 bg-[#FEF08A] border border-amber-300 text-[#713F12] rounded-[22px] p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed min-w-0">
              <strong className="block text-sm font-bold">Payment failed · 7-day grace period</strong>
              Your safety timers still work. Update your card within 7 days to avoid moving to £
              {settings.hibernation_1_price_gbp}/month Hibernation Mode.
              <button
                type="button"
                onClick={() => {
                  setBillingStatus("ACTIVE");
                  showToast("Card updated. Your plan is active again.", "success");
                }}
                className="cs-press mt-2.5 flex items-center gap-1 px-3.5 py-2 rounded-full bg-[#713F12] text-[#FEF08A] text-xs font-bold cursor-pointer"
              >
                Update card <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Account summary */}
        <section className="cs-rise navy-gradient text-white rounded-[28px] p-5 lg:p-7 overflow-hidden lg:col-span-2 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="flex items-start justify-between gap-3 lg:flex-1 lg:items-center">
            <div>
              <p className="text-xs text-slate-300">{greeting}</p>
              <p className="mt-0.5 text-xl lg:text-3xl font-extrabold tracking-tight">{ACCOUNT.plan} plan</p>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide ${
                isLive ? "bg-[#00E08C]/15 text-[#00E08C]" : "bg-white/10 text-slate-200"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-[#00E08C] cs-blink" : "bg-slate-300"}`} />
              {isLive ? "SESSION LIVE" : billingStatus === "GRACE_PERIOD" ? "GRACE PERIOD" : "PROTECTED"}
            </span>
          </div>
          <div className="mt-5 lg:mt-0 grid grid-cols-3 gap-2 lg:gap-3 lg:w-[480px] lg:shrink-0">
            {[
              { label: "Masked lines", value: activeLines.length },
              { label: "ID checks", value: tokens },
              { label: "Verified", value: verifiedClients.length },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-2xl bg-white/[0.07] border border-white/10 px-3 py-2.5 lg:px-4 lg:py-3.5">
                <p className="text-xl lg:text-3xl font-black tabular-nums">{value}</p>
                <p className="text-[10px] text-slate-300 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 1. Safety countdown */}
        <section ref={timerSectionRef} className="cs-rise cs-d1 app-card rounded-[28px] p-5 lg:p-7 scroll-mt-20 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h1 className="text-2xl font-extrabold text-[#0B2545] tracking-tight">Safety Countdown</h1>
            {sessionState === "IDLE" && (
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">Ready</span>
            )}
          </div>

          {sessionState === "RUNNING" && (
            <div className="space-y-4">
              <div className="cs-rise navy-grid text-white rounded-[24px] p-5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="inline-flex items-center gap-1.5 font-bold text-[#00E08C]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E08C] cs-blink" />
                    LIVE
                  </span>
                  <span className="font-mono text-slate-300">{selectedProxy}</span>
                </div>
                <div className="my-3">
                  <CountdownRing progress={progress} color={ringColor}>
                    <p className="text-[10px] font-mono tracking-[0.2em] text-slate-400">REMAINING</p>
                    <p className="text-[44px] leading-none font-black font-mono tabular-nums tracking-tight mt-1.5">
                      {formatClock(secondsLeft)}
                    </p>
                    {sessionEndsAt && <p className="text-[11px] text-slate-400 mt-2">Check in by {timeOfDay(sessionEndsAt)}</p>}
                  </CountdownRing>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 min-w-0">
                  <MapPin className="w-3.5 h-3.5 text-[#00E08C] shrink-0" />
                  <span className="truncate">{address}</span>
                </div>
                <div className="mt-4">
                  <StageTracker stage={0} />
                </div>
                <button
                  type="button"
                  onClick={handleExtend15}
                  className="cs-press mt-4 w-full min-h-[44px] rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5" />
                  Extend +15 min
                </button>
              </div>
            </div>
          )}

          {sessionState === "GRACE" && (
            <div className="cs-rise rounded-[24px] p-5 text-white bg-linear-to-b from-[#7F1D1D] to-[#0B2545]">
              <div className="flex items-center gap-2 text-[11px] font-bold text-amber-300">
                <BellRing className="w-4 h-4 cs-blink" />
                WARNING SMS SENT TO YOUR PHONE
              </div>
              <div className="my-3">
                <CountdownRing progress={graceLeft / GRACE_WINDOW_SECS} color="#F87171">
                  <p className="text-[10px] font-mono tracking-[0.2em] text-red-200">ALERT IN</p>
                  <p className="text-[44px] leading-none font-black font-mono tabular-nums mt-1.5">{formatClock(graceLeft)}</p>
                  <p className="text-[11px] text-red-200 mt-2">Enter your Safe Code now</p>
                </CountdownRing>
              </div>
              <StageTracker stage={2} />
              <p className="mt-4 text-xs text-red-100/90 leading-relaxed">
                If no Safe Code is entered, your emergency contact receives the appointment address.
              </p>
            </div>
          )}

          {isLive && (
            <form onSubmit={handleCheckCode} className="mt-4 space-y-3">
              <div className={codeError ? "cs-shake" : ""}>
                <FieldLabel htmlFor="active-code">Enter your code to check in</FieldLabel>
                <input
                  id="active-code"
                  type="password"
                  inputMode="numeric"
                  autoComplete="off"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="••••"
                  className={`cs-input text-center text-lg tracking-[0.5em] font-bold ${codeError ? "!border-[#DC2626]" : ""}`}
                />
              </div>
              <button
                type="submit"
                disabled={checkingCode || !codeInput}
                className="cs-press w-full min-h-[52px] rounded-full bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-[0_12px_24px_-12px_rgba(22,163,74,0.7)]"
              >
                {checkingCode ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                Confirm code
              </button>
              <a
                href={`sms:${selectedProxy.replace(/\s+/g, "")}?body=SOS`}
                className="cs-press w-full min-h-[52px] rounded-full border-2 border-[#DC2626] text-[#DC2626] hover:bg-red-50 font-bold text-sm flex items-center justify-center gap-2"
              >
                <MessageSquareWarning className="w-4 h-4" />
                SOS by SMS
              </a>
            </form>
          )}

          {isClosedSafely && (
            <div className="text-center py-4">
              <div className="cs-pop mx-auto w-20 h-20 rounded-full bg-[#16A34A] flex items-center justify-center shadow-[0_0_0_10px_rgba(22,163,74,0.12)]">
                <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path className="cs-draw" d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </div>
              <h2 className="cs-rise cs-d2 mt-5 text-xl font-extrabold text-[#0B2545]">Session closed safely</h2>
              <p className="cs-rise cs-d3 mt-1.5 text-sm text-slate-500">Scheduled alerts cancelled. Glad you&apos;re safe.</p>
              <button
                type="button"
                onClick={resetSession}
                className="cs-rise cs-d4 cs-press mt-5 w-full min-h-[52px] rounded-full bg-[#0B2545] hover:bg-[#123461] text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                Start a new session <ArrowRight className="w-4 h-4 text-[#00E08C]" />
              </button>
            </div>
          )}

          {sessionState === "Expired Crisis" && (
            <div className="cs-rise rounded-[24px] bg-red-50 border border-red-200 p-5 text-center">
              <div className="cs-pop mx-auto w-16 h-16 rounded-full bg-[#DC2626] flex items-center justify-center shadow-[0_0_0_10px_rgba(220,38,38,0.12)]">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
              <h2 className="mt-4 text-xl font-extrabold text-[#7F1D1D]">Emergency contact alerted</h2>
              <p className="mt-1.5 text-sm text-red-900/80 leading-relaxed">
                Your appointment address was sent{alertSentAt ? ` at ${timeOfDay(alertSentAt)}` : ""}, with local emergency instructions.
              </p>
              <a
                href={`tel:${countryCfg.emergencyNumber}`}
                className="cs-press mt-5 w-full min-h-[52px] rounded-full bg-[#DC2626] hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call {countryCfg.emergencyNumber}
              </a>
              <button
                type="button"
                onClick={resetSession}
                className="cs-press mt-2 w-full min-h-[48px] rounded-full text-sm font-semibold text-red-900/80 hover:bg-red-100 cursor-pointer"
              >
                I&apos;m safe · start new session
              </button>
            </div>
          )}

          {sessionState === "IDLE" && (
            <form onSubmit={handleStartSession} className="space-y-4">
              {verifiedClients.length > 0 && (
                <div>
                  <FieldLabel htmlFor="vault-client-select">Verified client (optional)</FieldLabel>
                  <select
                    id="vault-client-select"
                    value={selectedClientId}
                    onChange={(e) => setSelectedClientId(e.target.value)}
                    className="cs-input cursor-pointer"
                  >
                    <option value="">General appointment</option>
                    {verifiedClients.map((c) => (
                      <option key={c.id} value={c.id}>
                        ✓ {c.Client_Alias_Name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <FieldLabel htmlFor="appt-address">Appointment address</FieldLabel>
                <div className="flex gap-2">
                  <input
                    id="appt-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat 4, 22 Baker Street, NW1 6XE"
                    className="cs-input flex-1 min-w-0"
                  />
                  <button
                    type="button"
                    onClick={handleGeolocate}
                    disabled={locating}
                    aria-label="Use current location"
                    className="cs-press w-12 h-12 rounded-[14px] bg-[#0B2545] hover:bg-[#123461] text-[#00E08C] flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    {locating ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                  </button>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500">Only sent to your emergency contact if an alert fires.</p>
              </div>

              <div>
                <FieldLabel
                  htmlFor="custom-duration-mins"
                  aside={<span className="text-[11px] font-mono font-bold text-emerald-700">{formatDurationLabel(durationMins)}</span>}
                >
                  Duration
                </FieldLabel>
                <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-slate-100">
                  {[15, 30, 60].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => selectPresetDuration(m)}
                      aria-pressed={durationMins === m}
                      className={`cs-press min-h-[44px] rounded-xl text-xs font-bold cursor-pointer ${
                        durationMins === m ? "bg-[#0B2545] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {m}m
                    </button>
                  ))}
                  <div className="relative">
                    <input
                      id="custom-duration-mins"
                      type="number"
                      min={15}
                      max={240}
                      step={5}
                      aria-label="Custom duration in minutes, 15 to 240"
                      value={customDurationInput}
                      onChange={(e) => handleCustomDurationChange(e.target.value)}
                      onBlur={handleCustomDurationBlur}
                      className={`w-full h-[44px] pl-2 pr-5 rounded-xl text-xs text-center font-bold tabular-nums focus:outline-none focus:ring-2 focus:ring-[#0B2545]/30 ${
                        ![15, 30, 60].includes(durationMins) ? "bg-white text-[#0B2545] shadow-sm" : "bg-transparent text-slate-600"
                      }`}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 pointer-events-none">m</span>
                  </div>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500">Or type any length from 15 minutes to 4 hours.</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <FieldLabel htmlFor="safe-code">Safe Code</FieldLabel>
                  <input
                    id="safe-code"
                    type="password"
                    inputMode="numeric"
                    autoComplete="off"
                    value={safeCode}
                    onChange={(e) => setSafeCode(e.target.value)}
                    placeholder="e.g. 1234"
                    className="cs-input"
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="duress-code">Duress Code</FieldLabel>
                  <input
                    id="duress-code"
                    type="password"
                    inputMode="numeric"
                    autoComplete="off"
                    value={duressCode}
                    onChange={(e) => setDuressCode(e.target.value)}
                    placeholder="Secret"
                    className="cs-input"
                  />
                </div>
              </div>
              <p className="-mt-2 text-[11px] text-slate-500 leading-relaxed">
                The Duress Code looks like a normal check-in on screen but silently alerts your contact.
              </p>

              {activeLines.length === 0 ? (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  No active masked lines. Reactivate a plan to start masked sessions.
                </div>
              ) : (
                activeLines.length > 1 && (
                  <fieldset>
                    <legend className="text-xs font-semibold text-slate-700 mb-1.5">Masked line for this session</legend>
                    <div className="space-y-2">
                      {activeLines.map((n) => {
                        const checked = selectedProxy === n.Twilio_Number;
                        return (
                          <label
                            key={n.id}
                            className={`cs-press flex items-center justify-between gap-3 min-h-[52px] px-4 rounded-2xl border cursor-pointer ${
                              checked ? "border-[#0B2545] bg-[#0B2545]/[0.03]" : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="proxy"
                                className="sr-only"
                                checked={checked}
                                onChange={() => setSelectedProxy(n.Twilio_Number)}
                              />
                              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${checked ? "border-[#0B2545]" : "border-slate-300"}`}>
                                {checked && <span className="w-2 h-2 rounded-full bg-[#0B2545]" />}
                              </span>
                              <span className="text-sm font-mono font-semibold">{n.Twilio_Number}</span>
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400">
                              {n.Assigned_Order === 1 ? "Primary" : `Line ${n.Assigned_Order}`}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                )
              )}

              <button
                type="submit"
                disabled={startingSession || activeLines.length === 0}
                className="cs-press w-full min-h-[56px] rounded-full bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-60 text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-[0_14px_28px_-12px_rgba(22,163,74,0.75)]"
              >
                {startingSession ? <Loader2 className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />}
                {startingSession ? "STARTING…" : "START SAFETY TIMER & MASK LINE"}
              </button>

              <a
                href={`sms:${selectedProxy.replace(/\s+/g, "")}?body=SOS`}
                className="cs-press w-full min-h-[48px] rounded-full border border-red-200 text-[#DC2626] hover:bg-red-50 font-bold text-sm flex items-center justify-center gap-2"
              >
                <MessageSquareWarning className="w-4 h-4" />
                SOS by SMS
              </a>
            </form>
          )}

          {preview.tools && isLive && (
            <button
              type="button"
              onClick={() => (sessionState === "RUNNING" ? setSecondsLeft(0) : setGraceLeft(0))}
              className="mt-3 w-full py-2 rounded-xl border border-dashed border-slate-300 text-[11px] font-mono text-slate-500 cursor-pointer"
            >
              Preview: skip to next stage
            </button>
          )}
        </section>

        <div className="space-y-4 lg:space-y-6 min-w-0">
        {/* 2. Trusted Client Vault */}
        <section ref={vaultSectionRef} className="cs-rise cs-d2 app-card rounded-[28px] p-5 lg:p-7 scroll-mt-20">
          <h2 className="text-2xl font-extrabold text-[#0B2545] tracking-tight">Trusted Client Vault</h2>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
            <Fingerprint className="w-3.5 h-3.5 text-emerald-700" />
            Encrypted fingerprints only · verified clients repeat at £0
          </p>

          {vault.length === 0 ? (
            <div className="mt-4 p-6 rounded-2xl bg-[#F9FAFB] border border-dashed border-slate-200 text-center">
              <Shield className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="mt-2 text-sm font-semibold text-[#111827]">No clients yet</p>
              <p className="text-xs text-slate-500 mt-1">Generate an ID link before your next first-time appointment.</p>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {vault.map((client, i) => {
                const isFlagged = client.Global_Verify_Status === "FLAGGED / HIGH RISK";
                const isVerified = client.Global_Verify_Status === "ACTIVE";
                const undoInfo = undoTimers[client.id];
                return (
                  <li
                    key={client.id}
                    className={`cs-rise p-4 rounded-[20px] border transition-colors ${
                      isFlagged ? "border-red-200 bg-red-50/50" : "border-slate-100 bg-[#F9FAFB]"
                    }`}
                    style={{ animationDelay: `${Math.min(i, 5) * 60}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black shrink-0 ${
                          isFlagged ? "bg-[#DC2626] text-white" : isVerified ? "bg-[#0B2545] text-[#00E08C]" : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {client.Client_Alias_Name.charAt(0)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-[#111827] truncate">{client.Client_Alias_Name}</p>
                        <p className="text-[11px] font-mono text-slate-400 truncate">
                          {client.SHA256_Fingerprint || (client.Link_Used_Status === "UNUSED" ? "Link sent · awaiting scan" : "Scanning…")}
                        </p>
                      </div>
                      {isVerified ? (
                        <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-[#16A34A]" /> Verified
                        </span>
                      ) : isFlagged ? (
                        <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-100 text-[#DC2626] border border-red-300">
                          <AlertTriangle className="w-3 h-3" /> FLAGGED / HIGH RISK
                        </span>
                      ) : (
                        <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-slate-200 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 cs-blink" /> Pending
                        </span>
                      )}
                    </div>

                    {isFlagged && (
                      <div className="mt-3 p-3 rounded-2xl bg-white border border-red-200 text-[11px] text-red-900 leading-snug">
                        <strong className="font-bold block">FLAGGED / HIGH RISK · £0 repeat disabled</strong>
                        Reported for <em>{client.reportCategory || "Safety / Conduct Breach"}</em>.
                      </div>
                    )}

                    {undoInfo && (
                      <div className="mt-3 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-700" />
                            Undo within <span className="font-mono tabular-nums">{formatClock(undoInfo.secondsLeft)}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUndoReport(client.id)}
                            className="cs-press px-3 py-1.5 rounded-full bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 font-bold inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Undo2 className="w-3 h-3" /> Undo
                          </button>
                        </div>
                        {preview.tools && (
                          <button
                            type="button"
                            onClick={() => handleLockReportNow(client.id)}
                            className="mt-2 text-[10px] font-mono text-amber-700 underline cursor-pointer"
                          >
                            Preview: lock now
                          </button>
                        )}
                      </div>
                    )}

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        disabled={isFlagged || !isVerified}
                        onClick={() => setRepeatTarget(client)}
                        className="cs-press min-h-[44px] px-2 rounded-full bg-white border border-slate-200 hover:border-slate-300 disabled:opacity-45 disabled:cursor-not-allowed text-xs font-bold text-[#0B2545] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Repeat (£0)
                      </button>
                      {client.reportLocked ? (
                        <span className="min-h-[44px] px-2 rounded-full bg-slate-100 text-xs font-semibold text-slate-400 inline-flex items-center justify-center gap-1.5">
                          <Lock className="w-3.5 h-3.5" /> Report locked
                        </span>
                      ) : (
                        <button
                          type="button"
                          disabled={!!undoInfo}
                          onClick={() => openReportModal(client)}
                          className="cs-press min-h-[44px] px-2 rounded-full bg-white border border-red-200 hover:bg-red-50 disabled:opacity-45 text-xs font-bold text-[#DC2626] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Flag className="w-3.5 h-3.5" /> Report issue
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* 3. Checks & top-ups */}
        <section ref={creditsSectionRef} className="cs-rise cs-d3 app-card rounded-[28px] p-5 lg:p-7 scroll-mt-20">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0B2545] tracking-tight">ID Checks</h2>
              <p className="text-xs text-slate-500 mt-1">Single-use client verification links</p>
            </div>
            <div className="text-right">
              <p key={tokens} className="cs-pop text-4xl font-black tabular-nums text-[#0B2545] leading-none">
                {tokens}
              </p>
              <p className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">available</p>
            </div>
          </div>

          <button
            type="button"
            disabled={tokens === 0}
            onClick={() => {
              setGeneratedVerifyUrl(null);
              setShowCreateLinkModal(true);
            }}
            className="cs-press mt-4 w-full min-h-[52px] rounded-full bg-[#0B2545] hover:bg-[#123461] disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-[0_12px_24px_-12px_rgba(11,37,69,0.6)] disabled:shadow-none"
          >
            <Link2 className="w-4 h-4" />
            Generate Client ID Link
          </button>
          {tokens === 0 && <p className="mt-2 text-center text-[11px] text-[#DC2626] font-semibold">Top up to generate a new link.</p>}

          <div className="mt-5 pt-5 border-t border-slate-100">
            <SectionLabel tone="slate">Top up</SectionLabel>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { checks: 5, price: settings.topup_5_price_gbp },
                { checks: 15, price: settings.topup_15_price_gbp, popular: true },
                { checks: 50, price: settings.topup_50_price_gbp },
              ].map(({ checks, price, popular }) => (
                <button
                  key={checks}
                  type="button"
                  disabled={buyingPack !== null}
                  onClick={() => handleTopUp(checks, price)}
                  className={`cs-press relative min-h-[84px] px-2 pt-4 pb-3 rounded-2xl border text-center cursor-pointer disabled:cursor-wait ${
                    popular ? "border-[#0B2545] bg-[#0B2545] text-white" : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  {popular && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#00E08C] text-[#0B2545] text-[9px] font-black tracking-wide whitespace-nowrap">
                      POPULAR
                    </span>
                  )}
                  {buyingPack === checks ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto my-3" />
                  ) : (
                    <>
                      <span className={`block text-2xl font-black tabular-nums ${popular ? "" : "text-[#0B2545]"}`}>{checks}</span>
                      <span className={`block text-[10px] font-semibold ${popular ? "text-slate-300" : "text-slate-400"}`}>checks</span>
                      <span className={`block mt-1 text-xs font-bold tabular-nums ${popular ? "text-[#00E08C]" : "text-emerald-700"}`}>£{price}</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
        </div>

        <section className="cs-rise cs-d4 app-card rounded-[24px] p-3.5 sm:p-4 lg:col-span-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {ACCOUNT.isAgencyAdmin ? (
            <Link
              href="/agency"
              className="cs-press min-h-[44px] px-4 rounded-xl bg-[#0B2545] hover:bg-[#123461] text-white text-xs font-bold inline-flex items-center justify-center gap-2 shadow-xs transition"
            >
              <Users className="w-4 h-4 text-[#00E08C] shrink-0" />
              <span>Manage team seats</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00E08C] shrink-0" />
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSignOutModal(true)}
              className="cs-press min-h-[44px] px-4 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 text-xs font-bold text-[#0B2545] inline-flex items-center justify-center gap-1.5 cursor-pointer transition"
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" />
              <span>Sign out</span>
            </button>
            <button
              type="button"
              onClick={() => setShowHibernationModal(true)}
              className="cs-press min-h-[44px] px-4 rounded-xl bg-red-50/70 hover:bg-red-100/80 border border-red-200 text-xs font-bold text-[#DC2626] inline-flex items-center justify-center gap-1.5 cursor-pointer transition"
            >
              <PauseCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Cancel subscription</span>
            </button>
          </div>
        </section>
      </main>

      {/* Bottom tab bar */}
      <nav
        aria-label="Dashboard sections"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-t border-slate-100 pb-[env(safe-area-inset-bottom)]"
      >
        <div className="relative max-w-[390px] mx-auto px-4 h-[68px] grid grid-cols-3 items-center">
          <span
            aria-hidden="true"
            className="absolute top-2.5 bottom-2.5 left-4 w-[calc((100%-2rem)/3)] rounded-2xl bg-[#0B2545] shadow-[0_8px_20px_-8px_rgba(11,37,69,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(${Math.max(0, activeTabIndex) * 100}%)` }}
          />
          {tabs.map(({ tab, icon: Icon, label }) => (
            <button
              key={tab}
              type="button"
              onClick={() => jumpToTab(tab)}
              aria-current={activeTab === tab ? "true" : undefined}
              className={`relative z-10 h-full flex flex-col items-center justify-center gap-0.5 text-[11px] font-bold cursor-pointer transition-colors duration-300 ${
                activeTab === tab ? "text-white" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <span className="relative">
                <Icon className={`w-[18px] h-[18px] ${activeTab === tab ? "text-[#00E08C]" : ""}`} />
                {tab === "timer" && isLive && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-[#00E08C] ring-2 ring-white cs-blink" />
                )}
              </span>
              <span>{tab === "credits" ? `${label} (${tokens})` : label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* SOS home-screen guide */}
      <Sheet open={showSosGuideModal} onClose={() => setShowSosGuideModal(false)} labelledBy="sos-guide-title">
        <SheetHeader
          id="sos-guide-title"
          eyebrow="One-tap SOS"
          title="Add SOS to your home screen"
          subtitle="Your private SOS page works without logging in."
          icon={Smartphone}
          onClose={() => setShowSosGuideModal(false)}
        />
        <ol className="space-y-2.5">
          {[
            ["iPhone (Safari)", "Open your SOS page, tap Share, then Add to Home Screen."],
            ["Android (Chrome)", "Open your SOS page, tap ⋮, then Add to Home screen."],
          ].map(([title, body], i) => (
            <li key={title} className="flex gap-3 p-3.5 rounded-2xl bg-[#F9FAFB] border border-slate-100">
              <span className="w-7 h-7 rounded-full bg-[#0B2545] text-[#00E08C] text-xs font-black flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-bold">{title}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{body}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link
          href="/sos/demo-sos-token"
          className="cs-press mt-5 w-full min-h-[52px] rounded-full bg-[#DC2626] hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center"
        >
          Open my private SOS page
        </Link>
      </Sheet>

      {/* Generate client ID link */}
      <Sheet open={showCreateLinkModal} onClose={() => setShowCreateLinkModal(false)} labelledBy="create-link-title">
        <SheetHeader
          id="create-link-title"
          eyebrow={generatedVerifyUrl ? "Link ready" : "New ID check"}
          title={generatedVerifyUrl ? "Send this link to your client" : "Generate Client ID Link"}
          subtitle={
            generatedVerifyUrl
              ? "It works once. 1 check is used when the client is approved."
              : "Your client's number is encrypted and hashed. It is never stored in readable form."
          }
          icon={Link2}
          onClose={() => setShowCreateLinkModal(false)}
        />
        {generatedVerifyUrl ? (
          <div className="space-y-3">
            <div className="cs-rise p-3.5 rounded-2xl bg-[#F9FAFB] border border-slate-200 text-xs font-mono break-all text-slate-700">
              {generatedVerifyUrl}
            </div>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(generatedVerifyUrl);
                showToast("Link copied.", "success");
              }}
              className="cs-press w-full min-h-[52px] rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              Copy single-use link
            </button>
            <button
              type="button"
              onClick={() => setShowCreateLinkModal(false)}
              className="cs-press w-full min-h-[48px] rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleCreateLink} className="space-y-4">
            <div>
              <FieldLabel htmlFor="link-alias">Client nickname</FieldLabel>
              <input
                id="link-alias"
                type="text"
                required
                value={newAlias}
                onChange={(e) => setNewAlias(e.target.value)}
                placeholder="e.g. Flat 2 Viewing — M.B."
                className="cs-input"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-1.5">Client mobile number</p>
              <PhoneInput
                label="Client mobile number"
                country={newClientPhoneCountry}
                onCountry={setNewClientPhoneCountry}
                value={newClientPhone}
                onChange={setNewClientPhone}
              />
            </div>
            <button
              type="submit"
              disabled={creatingLink}
              className="cs-press w-full min-h-[52px] rounded-full bg-[#0B2545] hover:bg-[#123461] disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {creatingLink ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 text-[#00E08C]" />}
              Create link
            </button>
          </form>
        )}
      </Sheet>

      {/* Repeat session */}
      <Sheet open={!!repeatTarget} onClose={() => setRepeatTarget(null)} labelledBy="repeat-title">
        <SheetHeader
          id="repeat-title"
          eyebrow="Repeat session · £0"
          title={repeatTarget?.Client_Alias_Name || ""}
          subtitle="Re-enter the client's mobile. It must match the stored fingerprint, or a fresh ID check is needed."
          icon={RotateCcw}
          onClose={() => setRepeatTarget(null)}
        />
        <form onSubmit={handleRepeatVerify} className="space-y-4">
          <PhoneInput
            label="Client mobile number"
            country={repeatPhoneCountry}
            onCountry={setRepeatPhoneCountry}
            value={repeatPhone}
            onChange={setRepeatPhone}
          />
          <button
            type="submit"
            disabled={verifyingRepeat}
            className="cs-press w-full min-h-[52px] rounded-full bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            {verifyingRepeat ? <Loader2 className="w-4 h-4 animate-spin" /> : <Fingerprint className="w-4 h-4" />}
            {verifyingRepeat ? "Checking fingerprint…" : "Verify & continue"}
          </button>
        </form>
      </Sheet>

      {/* Report issue */}
      <Sheet open={!!reportTarget} onClose={() => setReportTarget(null)} labelledBy="report-title">
        <SheetHeader
          id="report-title"
          eyebrow={reportConfirmStep ? "Step 2 of 2" : "Step 1 of 2"}
          title={reportConfirmStep ? "Confirm safety report" : "Report an issue"}
          subtitle={reportConfirmStep ? undefined : "Adds the client's anonymous fingerprint to the internal red-flag list."}
          tone="red"
          icon={Flag}
          onClose={() => setReportTarget(null)}
        />
        <form onSubmit={handleReportStepSubmit} className="space-y-3">
          {!reportConfirmStep ? (
            <>
              <div className="space-y-2">
                {REPORT_CATEGORIES.map((cat) => {
                  const checked = reportCategory === cat;
                  return (
                    <label
                      key={cat}
                      className={`cs-press flex items-center gap-3 min-h-[52px] px-4 rounded-2xl border text-sm font-semibold cursor-pointer ${
                        checked ? "border-[#DC2626] bg-red-50 text-[#7F1D1D]" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <input type="radio" name="reportCategory" className="sr-only" checked={checked} onChange={() => setReportCategory(cat)} />
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${checked ? "border-[#DC2626]" : "border-slate-300"}`}>
                        {checked && <span className="w-2 h-2 rounded-full bg-[#DC2626]" />}
                      </span>
                      {cat}
                    </label>
                  );
                })}
              </div>
              <button
                type="submit"
                className="cs-press w-full min-h-[52px] rounded-full bg-[#DC2626] hover:bg-red-700 text-white font-bold text-sm cursor-pointer !mt-5"
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <div className="cs-rise p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-950 space-y-2">
                <p className="font-bold text-sm">{reportTarget?.Client_Alias_Name}</p>
                <p>
                  Category: <strong>{reportCategory}</strong>
                </p>
                <p className="pt-2 border-t border-red-200 leading-relaxed text-red-900/90">
                  The client is marked <strong>FLAGGED / HIGH RISK</strong> and £0 repeats are disabled. You can undo for{" "}
                  <strong>10 minutes</strong>; after that the report is permanently locked.
                </p>
              </div>
              <button
                type="submit"
                className="cs-press w-full min-h-[52px] rounded-full bg-[#DC2626] hover:bg-red-700 text-white font-bold text-sm cursor-pointer"
              >
                Submit report
              </button>
              <button
                type="button"
                onClick={() => setReportConfirmStep(false)}
                className="cs-press w-full min-h-[48px] rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Back
              </button>
            </>
          )}
        </form>
      </Sheet>

      {/* Sign out confirmation */}
      <Sheet open={showSignOutModal} onClose={() => setShowSignOutModal(false)} labelledBy="signout-title">
        <SheetHeader
          id="signout-title"
          eyebrow="Account"
          title="Sign out of Checksafe?"
          subtitle="You will need to sign back in to start new timers or manage your Trusted Client Vault."
          icon={LogOut}
          onClose={() => setShowSignOutModal(false)}
        />
        {isLive && (
          <div className="mb-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5 leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Active timer running ({formatClock(secondsLeft)}):</strong> Your countdown continues in the London cloud even if you sign out, and your private SOS shortcut remains active.
            </span>
          </div>
        )}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => {
              setShowSignOutModal(false);
              signOut();
              showToast("Signed out.", "info");
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

      <HibernationModal
        open={showHibernationModal}
        onClose={() => setShowHibernationModal(false)}
        proxyNumbers={proxyNumbers}
        settings={settings}
        onConfirmHibernation={async (keptIds, price) => {
          setProxyNumbers((prev) => prev.map((n) => ({ ...n, Status: keptIds.includes(n.id) ? "RESERVED" : "RELEASED" })));
          showToast(`Hibernation Mode on (£${price}/month). Kept ${keptIds.length} number(s).`, "success");
        }}
      />
    </div>
  );
}
