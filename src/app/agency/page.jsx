"use client";
import React, { useState } from "react";
import Link from "next/link";
import { UserPlus, UserMinus, Lock } from "lucide-react";
import { CheckSafetyLogo } from "@/components/ui/CheckSafetyLogo";
import { useToast } from "@/components/ui/ToastProvider";
import { DEFAULT_APP_SETTINGS } from "@/lib/types";
const MIN_SEATS = 5;
export default function AgencyAdminPage() {
    const { showToast } = useToast();
    const seatPrice = DEFAULT_APP_SETTINGS.agency_seat_price_gbp;
    const [seats, setSeats] = useState([
        { id: "s-1", email: "sarah.ellis@agency.co.uk", status: "ACTIVE", proxyNumber: "+44 7700 900101" },
        { id: "s-2", email: "james.patel@agency.co.uk", status: "ACTIVE", proxyNumber: "+44 7700 900102" },
        { id: "s-3", email: "claire.wu@agency.co.uk", status: "ACTIVE", proxyNumber: "+44 7700 900103" },
        { id: "s-4", email: "tom.hughes@agency.co.uk", status: "INVITED", proxyNumber: "Pending" },
        { id: "s-5", email: "priya.nair@agency.co.uk", status: "ACTIVE", proxyNumber: "+44 7700 900105" },
    ]);
    const [inviteEmail, setInviteEmail] = useState("");
    function handleInvite(e) {
        e.preventDefault();
        if (!inviteEmail.trim())
            return;
        setSeats((prev) => [
            ...prev,
            {
                id: `s-${Date.now()}`,
                email: inviteEmail.trim(),
                status: "INVITED",
                proxyNumber: "Assigned on join",
            },
        ]);
        setInviteEmail("");
        showToast("Staff seat invitation sent.", "success");
    }
    function handleRevoke(id) {
        if (seats.length <= MIN_SEATS) {
            showToast(`Bulk agency plan requires a minimum of ${MIN_SEATS} seats.`, "error");
            return;
        }
        setSeats((prev) => prev.filter((s) => s.id !== id));
        showToast("Staff seat revoked and proxy line scheduled for release.", "info");
    }
    const billedSeats = Math.max(seats.length, MIN_SEATS);
    return (<div className="min-h-screen bg-[#F8F7F5] text-[#111215] pb-16">
      <header className="editorial-glass sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center">
            <CheckSafetyLogo darkSurface={false} size="sm"/>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-semibold">Agency Fleet Desk</span>
            <Link href="/dashboard" className="text-xs font-semibold text-[#111215] hover:bg-slate-100 px-3.5 py-1.5 rounded-full border border-black/[0.08] transition shadow-2xs">
              Worker view
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-8 space-y-5">
        {/* Privacy Guarantee Banner */}
        <div className="rounded-[32px] bg-[#0D0F14] text-white p-6 sm:p-8 flex items-start gap-4 shadow-sm">
          <Lock className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5"/>
          <div>
            <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-emerald-400">
              /01 Multi-Seat Management
            </div>
            <h1 className="text-xl sm:text-2xl font-bold mt-1">Agency Seat Manager</h1>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Invite and revoke staff seats on the bulk plan (£{seatPrice}/seat/month, minimum{" "}
              {MIN_SEATS} seats). Each seat includes 1 dedicated proxy line.{" "}
              <strong className="text-white">
                Agency administrators have zero visibility into staff session logs or client vaults.
              </strong>
            </p>
          </div>
        </div>

        {/* Billing Summary */}
        <div className="editorial-card rounded-[24px] p-5 flex items-center justify-between bg-white">
          <div>
            <p className="text-xs font-medium text-slate-500">Active &amp; Invited Seats</p>
            <p className="text-2xl font-bold tabular-nums text-[#111215] mt-0.5">{seats.length} seats</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-slate-500">Monthly Total</p>
            <p className="text-2xl font-bold tabular-nums text-emerald-700 mt-0.5">
              £{billedSeats * seatPrice}
            </p>
          </div>
        </div>

        {/* Invite Form */}
        <form onSubmit={handleInvite} className="editorial-card rounded-[24px] p-4 flex flex-col sm:flex-row gap-2.5 bg-white">
          <input type="email" required value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="colleague@agency.co.uk" className="flex-1 h-12 px-4 rounded-xl border border-black/[0.08] bg-[#F8F7F5] text-sm text-[#111215] focus:outline-hidden"/>
          <button type="submit" className="min-h-[48px] px-6 rounded-full bg-[#111215] hover:bg-black text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer shrink-0 transition shadow-xs hover:scale-[1.01]">
            <UserPlus className="w-4 h-4"/>
            <span>Invite Staff Seat</span>
          </button>
        </form>

        {/* Seats List */}
        <div className="bg-white border border-slate-200 rounded-[20px] divide-y divide-slate-100 overflow-hidden shadow-xs">
          {seats.map((seat) => (<div key={seat.id} className="p-4 sm:p-5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#111827] truncate">{seat.email}</p>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  <span className={seat.status === "ACTIVE" ? "text-emerald-700 font-semibold" : "text-amber-700 font-semibold"}>
                    {seat.status}
                  </span>{" "}
                  · {seat.proxyNumber}
                </p>
              </div>
              <button type="button" onClick={() => handleRevoke(seat.id)} className="min-h-[38px] px-4 rounded-full border border-red-200 text-[#DC2626] hover:bg-red-50 text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 cursor-pointer transition">
                <UserMinus className="w-3.5 h-3.5"/>
                <span>Revoke</span>
              </button>
            </div>))}
        </div>
      </main>
    </div>);
}
