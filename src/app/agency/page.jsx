"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Users, UserPlus, UserX, X, Loader2, CheckCircle2, AlertTriangle, Shield, Info, Mail, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/ToastProvider";
import { AppHeader, SectionLabel, Sheet, SheetHeader } from "@/components/ui/AppShell";
import { DEFAULT_APP_SETTINGS } from "@/lib/types";

const MIN_SEATS = 5;
const SEAT_PRICE_GBP = DEFAULT_APP_SETTINGS.agency_seat_price_gbp;

const INITIAL_SEATS = [
  { id: "seat-1", email: "sarah.jones@agencyexample.co.uk", name: "Sarah Jones", status: "ACTIVE", invitedAt: "2026-11-01T09:00:00Z" },
  { id: "seat-2", email: "tom.harris@agencyexample.co.uk", name: "Tom Harris", status: "ACTIVE", invitedAt: "2026-11-01T09:05:00Z" },
  { id: "seat-3", email: "priya.sharma@agencyexample.co.uk", name: "Priya Sharma", status: "ACTIVE", invitedAt: "2026-11-05T14:20:00Z" },
  { id: "seat-4", email: "daniel.white@agencyexample.co.uk", name: "Daniel White", status: "PENDING", invitedAt: "2026-11-18T10:15:00Z" },
  { id: "seat-5", email: "claire.murphy@agencyexample.co.uk", name: "Claire Murphy", status: "PENDING", invitedAt: "2026-11-20T16:45:00Z" },
];

const ACCESS_RULES = [
  { can: true, label: "Invite new staff seats" },
  { can: true, label: "Revoke staff seats" },
  { can: true, label: "See seat count & billing" },
  { can: false, label: "Staff session logs or timers" },
  { can: false, label: "Staff client vaults" },
  { can: false, label: "Staff safe or duress codes" },
];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function initials(name) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AgencyAdminPage() {
  const { showToast } = useToast();
  const [seats, setSeats] = useState(INITIAL_SEATS);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [revokeTarget, setRevokeTarget] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviting, setInviting] = useState(false);
  const [revoking, setRevoking] = useState(false);

  const activeSeats = seats.filter((s) => s.status === "ACTIVE").length;
  const pendingSeats = seats.length - activeSeats;
  const totalSeats = seats.length;
  const monthlyTotal = totalSeats * SEAT_PRICE_GBP;
  const canRevoke = totalSeats > MIN_SEATS;

  async function handleInvite(e) {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInviting(true);
    await new Promise((r) => setTimeout(r, 800));
    const email = inviteEmail.trim().toLowerCase();
    setSeats((prev) => [
      ...prev,
      { id: `seat-${Date.now()}`, email, name: inviteName.trim() || email.split("@")[0], status: "PENDING", invitedAt: new Date().toISOString() },
    ]);
    setInviting(false);
    setShowInviteModal(false);
    setInviteEmail("");
    setInviteName("");
    showToast(`Invite sent to ${email}`, "success");
  }

  async function handleRevoke() {
    if (!revokeTarget) return;
    setRevoking(true);
    await new Promise((r) => setTimeout(r, 700));
    setSeats((prev) => prev.filter((s) => s.id !== revokeTarget.id));
    setRevoking(false);
    showToast(`Seat revoked for ${revokeTarget.email}`, "success");
    setRevokeTarget(null);
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] pb-16 overflow-x-clip">
      <AppHeader maxWidth="max-w-3xl">
        <Link
          href="/dashboard"
          className="cs-press h-9 px-3 rounded-full bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">My console</span>
          <span className="sm:hidden">Console</span>
        </Link>
        <button
          type="button"
          onClick={() => setShowInviteModal(true)}
          className="cs-press h-9 px-4 rounded-full bg-[#0B2545] hover:bg-[#123461] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-[0_6px_16px_-6px_rgba(11,37,69,0.6)]"
        >
          <UserPlus className="w-3.5 h-3.5 text-[#00E08C]" />
          Invite
        </button>
      </AppHeader>

      <main className="w-full max-w-3xl mx-auto px-4 pt-6 sm:pt-8 space-y-4 sm:space-y-5">
        <div className="cs-rise">
          <SectionLabel>Agency admin</SectionLabel>
          <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">Team seats</h1>
          <p className="mt-1.5 text-sm text-slate-500">Bulk plan · £{SEAT_PRICE_GBP} per seat per month · minimum {MIN_SEATS} seats</p>
        </div>

        <div className="cs-rise cs-d1 p-4 rounded-[20px] bg-white border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
          <span className="w-8 h-8 rounded-xl bg-[#0B2545] flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-[#00E08C]" />
          </span>
          <p className="leading-relaxed">
            <strong className="text-[#0B2545]">Privacy-locked view.</strong> You can invite and revoke seats only. Staff session logs and client
            vaults are never visible to agency admins.
          </p>
        </div>

        <section className="cs-rise cs-d2 grid sm:grid-cols-[1.1fr_1fr] gap-4">
          <div className="navy-grid text-white rounded-[28px] p-6 flex flex-col justify-between min-h-[180px]">
            <div className="flex items-center justify-between">
              <SectionLabel index="01">Billing</SectionLabel>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#00E08C]/15 text-[#00E08C]">ACTIVE</span>
            </div>
            <div>
              <p className="text-xs text-slate-300">Monthly total</p>
              <p className="mt-1 text-5xl font-black tabular-nums tracking-tight">
                £{monthlyTotal.toLocaleString()}
                <span className="text-base font-semibold text-slate-400">/mo</span>
              </p>
              <p className="mt-2 text-xs text-slate-300 tabular-nums">
                {totalSeats} seats × £{SEAT_PRICE_GBP}
              </p>
            </div>
          </div>

          <div className="app-card rounded-[28px] p-6 grid grid-cols-3 sm:grid-cols-1 gap-3 sm:gap-0 sm:divide-y sm:divide-slate-100">
            {[
              { label: "Active", value: activeSeats, dot: "bg-[#16A34A]" },
              { label: "Pending invite", value: pendingSeats, dot: "bg-amber-500" },
              { label: "Total seats", value: totalSeats, dot: "bg-[#0B2545]" },
            ].map(({ label, value, dot }) => (
              <div key={label} className="sm:py-3 first:sm:pt-0 last:sm:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-500 order-2 sm:order-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${dot} hidden sm:inline-block`} />
                  {label}
                </span>
                <span className="text-2xl sm:text-xl font-black tabular-nums text-[#0B2545] order-1 sm:order-2">{value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="cs-rise cs-d3 app-card rounded-[28px] p-5 sm:p-6">
          <div className="flex items-end justify-between gap-3 mb-4">
            <div>
              <SectionLabel index="02">Staff roster</SectionLabel>
              <h2 className="mt-1 text-2xl font-extrabold text-[#0B2545] tracking-tight">Seats</h2>
            </div>
            <button
              type="button"
              onClick={() => setShowInviteModal(true)}
              className="cs-press h-10 px-4 rounded-full border border-slate-200 bg-white hover:border-slate-300 text-xs font-bold text-[#0B2545] flex items-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Add seat
            </button>
          </div>

          {!canRevoke && (
            <div className="mb-4 flex items-start gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-500">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
              At the {MIN_SEATS}-seat minimum. Add a seat before revoking one.
            </div>
          )}

          {seats.length === 0 ? (
            <div className="py-10 text-center">
              <Users className="w-10 h-10 text-slate-200 mx-auto" />
              <p className="mt-2 text-sm font-semibold text-slate-400">No seats yet</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {seats.map((seat, i) => (
                <li
                  key={seat.id}
                  className="cs-rise flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                  style={{ animationDelay: `${Math.min(i, 6) * 50}ms` }}
                >
                  <span
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 ${
                      seat.status === "ACTIVE" ? "bg-[#0B2545] text-[#00E08C]" : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {initials(seat.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-[#111827] truncate">{seat.name}</p>
                      <span
                        className={`shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          seat.status === "ACTIVE" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {seat.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{seat.email}</p>
                  </div>
                  <span className="hidden sm:block text-[11px] text-slate-400 shrink-0">{formatDate(seat.invitedAt)}</span>
                  <button
                    type="button"
                    onClick={() => setRevokeTarget(seat)}
                    disabled={!canRevoke}
                    aria-label={`Revoke seat for ${seat.name}`}
                    title={canRevoke ? "Revoke seat" : `Minimum ${MIN_SEATS} seats`}
                    className="cs-press w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-red-50 hover:border-red-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <UserX className="w-4 h-4 text-[#DC2626]" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="cs-rise cs-d4 app-card rounded-[28px] p-5 sm:p-6">
          <SectionLabel index="03">Access rules</SectionLabel>
          <h2 className="mt-1 mb-4 text-2xl font-extrabold text-[#0B2545] tracking-tight">What you can see</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ACCESS_RULES.map(({ can, label }) => (
              <div
                key={label}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border ${
                  can ? "bg-emerald-50/60 border-emerald-100" : "bg-slate-50 border-slate-100"
                }`}
              >
                {can ? <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16A34A]" /> : <X className="w-4 h-4 shrink-0 text-slate-400" />}
                <span className={`text-xs font-semibold ${can ? "text-[#111827]" : "text-slate-500 line-through decoration-slate-300"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Sheet open={showInviteModal} onClose={() => setShowInviteModal(false)} labelledBy="invite-title">
        <SheetHeader
          id="invite-title"
          eyebrow="New seat"
          title="Invite a staff member"
          subtitle={`Adds £${SEAT_PRICE_GBP}/month to your bill. Their sessions and vault stay private to them.`}
          icon={UserPlus}
          onClose={() => setShowInviteModal(false)}
        />
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="invite-name">
              Full name <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <input
              id="invite-name"
              type="text"
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              placeholder="e.g. Sarah Jones"
              className="cs-input"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="invite-email">
              Work email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="invite-email"
                type="email"
                required
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="worker@agency.co.uk"
                className="cs-input pl-10"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={inviting || !inviteEmail.trim()}
            className="cs-press w-full min-h-[52px] rounded-full bg-[#0B2545] hover:bg-[#123461] disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            {inviting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4 text-[#00E08C]" />}
            {inviting ? "Sending invite…" : "Send invite"}
          </button>
        </form>
      </Sheet>

      <Sheet open={!!revokeTarget} onClose={() => setRevokeTarget(null)} labelledBy="revoke-title">
        <SheetHeader
          id="revoke-title"
          eyebrow="Revoke access"
          title={`Remove ${revokeTarget?.name || "seat"}?`}
          subtitle={revokeTarget?.email}
          tone="red"
          icon={UserX}
          onClose={() => setRevokeTarget(null)}
        />
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
          <p className="text-xs text-amber-900 leading-relaxed">
            They lose access immediately and their masked line is released. Their session logs and client vault stay private and are{" "}
            <strong>not</strong> transferred to you.
          </p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setRevokeTarget(null)}
            className="cs-press min-h-[52px] rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold text-slate-700 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleRevoke}
            disabled={revoking}
            className="cs-press min-h-[52px] rounded-full bg-[#DC2626] hover:bg-red-700 disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            {revoking ? <Loader2 className="w-4 h-4 animate-spin" /> : "Revoke seat"}
          </button>
        </div>
      </Sheet>
    </div>
  );
}
