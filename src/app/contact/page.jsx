"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  Users,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { COMPANY_NAME, PRIMARY_DOMAIN } from "@/lib/domains";

const FAQ_ITEMS = [
  {
    q: "How quickly can an agency fleet of 20–100 workers be onboarded?",
    a: "Within 15 minutes. Checksafe operates as a progressive zero-install web app (PWA). Your agency administrator simply inputs a roster CSV or invites team members via SMS/email; workers tap a single magic link on their phone and are instantly protected without App Store delays.",
  },
  {
    q: "Do clients or property viewers have to download an app to verify?",
    a: "Never. Unvetted clients receive an encrypted, unbranded SMS or WhatsApp link from your virtual proxy number. They complete the 3D biometric selfie and photo ID scan directly in their phone browser in under 60 seconds.",
  },
  {
    q: "How does Checksafe comply with UK lone-worker legislation?",
    a: "Checksafe is engineered around UK lone-worker safeguarding principles and HSE duty-of-care recommendations, supporting compliance under the Health and Safety at Work etc. Act 1974 with auditable verification trails and automated silent escalations.",
  },
  {
    q: "Can solo practitioners use Checksafe without an employer or fleet?",
    a: "Yes. Our Solo Starter plan is designed specifically for independent estate agents, private tutors, clinical psychologists, and home therapists. You can nominate a personal peer, spouse, or supervisor to receive emergency dispatch notifications.",
  },
  {
    q: "What happens if a worker has zero cellular internet in a basement or remote site?",
    a: "Cloud countdown timers run securely on our London cloud infrastructure. If a worker doesn't enter their safe PIN before time expires, dispatch alerts trigger automatically even if their phone has gone offline. Additionally, our 1-bar cellular SMS fallback allows sending 'SAFE' or 'SOS' without data.",
  },
];

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState("fleet"); // "fleet" | "support"
  const [fleetForm, setFleetForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    fleetSize: "10-25",
    sector: "Estate Agency & Surveying",
    message: "",
  });
  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    priority: "standard",
    topic: "Twilio Proxy & Masked Numbers",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  function handleFleetSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleSupportSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-white text-[#111215] flex flex-col font-sans antialiased selection:bg-[#111215] selection:text-white pt-16">
      <SiteHeader activePage="contact" />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-12 sm:pt-20 pb-12 sm:pb-16 bg-gradient-to-b from-slate-50/80 via-white to-white border-b border-slate-100">
          <div className="w-[96%] max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0B2545]/5 border border-[#0B2545]/20 text-[#0B2545] text-xs font-extrabold tracking-wider uppercase mb-4 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#00E08C] animate-pulse" />
                <span>UK Operations HQ · London Dispatch Desk</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.08]">
                Speak With Our Lone Worker
                <br />
                <span className="text-[#0B2545]">Security Specialists</span>
              </h1>

              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                Whether deploying duty-of-care protection for a nationwide estate fleet or seeking guidance on lone-worker duty of care and zero-knowledge safeguards, our London advisory desk is at your disposal.
              </p>
            </div>
          </div>
        </section>

        {/* Form & Direct Contact Cards Section */}
        <section className="py-12 sm:py-18 bg-white">
          <div className="w-[96%] max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Left Column (8 cols): Interactive Form */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-lg">
                {/* Tab Switcher */}
                <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl mb-8">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("fleet");
                      setSubmitted(false);
                    }}
                    className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeTab === "fleet"
                        ? "bg-white text-[#0B2545] shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Building2 className="w-4 h-4 text-[#00E08C]" />
                      <span>Book Fleet Demo</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("support");
                      setSubmitted(false);
                    }}
                    className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeTab === "support"
                        ? "bg-white text-[#0B2545] shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <PhoneCall className="w-4 h-4 text-[#00E08C]" />
                      <span>General &amp; Worker Support</span>
                    </span>
                  </button>
                </div>

                {submitted ? (
                  <div className="py-12 px-6 text-center animate-in fade-in zoom-in-95 duration-200">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Inquiry Received
                    </h3>
                    <p className="mt-2 text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you. A senior Checksafe security advisor will contact you within <strong>15 minutes</strong> during operating hours with tailored fleet deployment guidelines.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : activeTab === "fleet" ? (
                  <form onSubmit={handleFleetSubmit} className="space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fleetForm.name}
                          onChange={(e) => setFleetForm({ ...fleetForm, name: e.target.value })}
                          placeholder="e.g. Richard Davenport"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#0B2545] focus:outline-hidden transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={fleetForm.email}
                          onChange={(e) => setFleetForm({ ...fleetForm, email: e.target.value })}
                          placeholder="sarah.jenkins@surveyor.co.uk"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#0B2545] focus:outline-hidden transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Company / Organization *
                        </label>
                        <input
                          type="text"
                          required
                          value={fleetForm.company}
                          onChange={(e) => setFleetForm({ ...fleetForm, company: e.target.value })}
                          placeholder="Savills, Knight Frank, etc."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#0B2545] focus:outline-hidden transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Direct Contact Phone
                        </label>
                        <input
                          type="tel"
                          value={fleetForm.phone}
                          onChange={(e) => setFleetForm({ ...fleetForm, phone: e.target.value })}
                          placeholder="+44 20 7946 0000"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#0B2545] focus:outline-hidden transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Fleet Size
                        </label>
                        <select
                          value={fleetForm.fleetSize}
                          onChange={(e) => setFleetForm({ ...fleetForm, fleetSize: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#0B2545] focus:outline-hidden transition cursor-pointer"
                        >
                          <option value="5-10">5–10 Solo Workers</option>
                          <option value="11-25">11–25 Solo Workers</option>
                          <option value="26-50">26–50 Solo Workers</option>
                          <option value="51-150">51–150 Solo Workers</option>
                          <option value="150+">150+ Enterprise Seats</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Primary Operating Sector
                        </label>
                        <select
                          value={fleetForm.sector}
                          onChange={(e) => setFleetForm({ ...fleetForm, sector: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#0B2545] focus:outline-hidden transition cursor-pointer"
                        >
                          <option value="Estate Agency & Surveying">Estate Agency &amp; Property</option>
                          <option value="Healthcare & NHS Outreach">Clinical &amp; Domiciliary Healthcare</option>
                          <option value="Private Tutoring & Mentorship">Private Tuition &amp; Academic</option>
                          <option value="Industrial Inspections">Engineering &amp; Site Audits</option>
                          <option value="Legal & Process Serving">Legal Enforcement &amp; Process</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Specific Safety Objectives or Integration Requirements
                      </label>
                      <textarea
                        rows={3}
                        value={fleetForm.message}
                        onChange={(e) => setFleetForm({ ...fleetForm, message: e.target.value })}
                        placeholder="Tell us about your team's lone-working hazards, existing protocols, or target deployment date..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#0B2545] focus:outline-hidden transition"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#0B2545] hover:bg-[#111827] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                      <span>Request Enterprise Fleet Consultation</span>
                      <ArrowRight className="w-4 h-4 text-[#00E08C]" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSupportSubmit} className="space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={supportForm.name}
                          onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                          placeholder="Sarah Jenkins"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#0B2545] focus:outline-hidden transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={supportForm.email}
                          onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                          placeholder="sarah@surveyingpractice.co.uk"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#0B2545] focus:outline-hidden transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Priority Level
                        </label>
                        <select
                          value={supportForm.priority}
                          onChange={(e) => setSupportForm({ ...supportForm, priority: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#0B2545] focus:outline-hidden transition cursor-pointer"
                        >
                          <option value="standard">Standard Inquiry (within 2 hours)</option>
                          <option value="urgent">Urgent Operational Support (&lt; 15 mins)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Support Category
                        </label>
                        <select
                          value={supportForm.topic}
                          onChange={(e) => setSupportForm({ ...supportForm, topic: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#0B2545] focus:outline-hidden transition cursor-pointer"
                        >
                          <option value="Twilio Proxy & Masked Numbers">Ghost Proxy Virtual SIM Setup</option>
                          <option value="Biometric Verification Link">Veriff Client Screening Issue</option>
                          <option value="Safe PIN & Duress Reset">Secret Safe PIN / Duress Reset</option>
                          <option value="Billing & Invoicing">Billing, Seats &amp; VAT Invoice</option>
                          <option value="General Safety Advice">General Safety Compliance</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        How can we assist you? *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={supportForm.message}
                        onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                        placeholder="Please describe what you are experiencing or require assistance with..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#0B2545] focus:outline-hidden transition"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#0B2545] hover:bg-[#111827] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                      <span>Dispatch Support Ticket</span>
                      <ArrowRight className="w-4 h-4 text-[#00E08C]" />
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column (5 cols): Direct Contacts & Operating Details */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* London Operations HQ Card */}
                <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/80">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#0B2545] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin className="w-5 h-5 text-[#00E08C]" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        London Operations HQ
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Checksafe Software Ltd.
                        <br />
                        100 Leadenhall Street, City of London
                        <br />
                        London, EC3A 3BP, United Kingdom
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Phone Dispatch Card */}
                <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/80">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#0B2545] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <PhoneCall className="w-5 h-5 text-[#00E08C]" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        Direct Advisory Desk
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        UK Freephone &amp; Fleet Line:
                      </p>
                      <div className="text-sm font-bold text-[#0B2545] mt-0.5">
                        +44 20 7946 0920
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold mt-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Mon–Fri: 08:00 – 19:00 GMT (Emergency ARC 24/7)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dedicated Security & DPO Contact */}
                <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/80">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#0B2545] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <ShieldCheck className="w-5 h-5 text-[#00E08C]" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        Security &amp; Data Protection Officer
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        For cryptographic audit, Veriff purge verification &amp; legal inquiries:
                      </p>
                      <div className="text-xs font-mono font-bold text-slate-800 mt-1">
                        compliance@{PRIMARY_DOMAIN}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instant Live Worker Trial CTA */}
                <div className="rounded-3xl p-6 sm:p-7 bg-[#0B2545] text-white">
                  <h4 className="text-lg font-bold">
                    Need Immediate Solo Protection?
                  </h4>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    Solo estate agents, tutors, and therapists can activate individual protection instantly with our contract-free monthly pass.
                  </p>
                  <Link
                    href="/signup"
                    className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#00E08C] hover:bg-[#00f298] text-[#0B2545] text-xs font-bold transition shadow-sm"
                  >
                    <span>Start Protection in 60s</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Accordion */}
        <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-100">
          <div className="w-[96%] max-w-[1000px] mx-auto px-4 sm:px-6">
            <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Inquiries
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Clear, transparent operational answers for safety officers and solo workers.
              </p>
            </div>

            <div className="space-y-3.5">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition"
                    >
                      <span className="text-sm sm:text-base font-bold text-slate-900">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-slate-900" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
