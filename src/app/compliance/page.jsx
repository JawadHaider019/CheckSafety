"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Award,
  ArrowRight,
  Download,
  EyeOff,
  Cpu,
  Clock,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { COMPANY_NAME, PRIMARY_DOMAIN } from "@/lib/domains";

const SAFETY_CLAUSES = [
  {
    code: "Clause 4.1",
    title: "Audio & Communication Privacy",
    requirement: "Dedicated two-way escalation without exposing worker private telephone SIM identity.",
    implementation: "Virtual Twilio proxy lines completely mask the lone worker's real mobile number during client outreach, WhatsApp exchanges, and emergency relays.",
    status: "Compliant",
  },
  {
    code: "Clause 4.3",
    title: "Covert & Coercion Safeguards",
    requirement: "Discreet mechanisms enabling activation under direct threat or visual monitoring.",
    implementation: "Triple-tap covert battery shutdown screen appears dead while cloud timers run; secret Duress Code mimics normal checkout while broadcasting emergency GPS.",
    status: "Compliant",
  },
  {
    code: "Clause 5.1",
    title: "Automated Timed Session Sentinel",
    requirement: "Persistent cloud countdowns that independently escalate when a worker fails to safe-check.",
    implementation: "Timers run on central London server infrastructure. If the user phone battery dies or internet drops, alerts automatically fire upon expiry.",
    status: "Compliant",
  },
  {
    code: "Clause 5.4",
    title: "Low-Bandwidth & Off-Grid Fallback",
    requirement: "Transmission resilience over degraded or dead 4G/5G mobile data coverage.",
    implementation: "1-bar SMS satellite fallback channels allow worker to send 'SAFE' or 'SOS' codes directly over basic cellular signaling without Wi-Fi or data packets.",
    status: "Compliant",
  },
  {
    code: "Clause 6.2",
    title: "Pre-Engagement Identity Verification",
    requirement: "Proactive duty-of-care verification before lone workers enter unmonitored locations.",
    implementation: "Single-use Veriff 3D selfie & photo ID clearance link. Raw identity purged within 60s while HMAC hash cross-checks the community threat registry.",
    status: "Compliant",
  },
];

const COMPARISON_ROWS = [
  {
    feature: "Client Biometric KYC Before Meeting",
    checksafe: true,
    hardwarePendant: false,
    consumerApps: false,
    note: "Checksafe verifies 3D identity before keys or private addresses are released.",
  },
  {
    feature: "Zero Personal SIM Phone Masking",
    checksafe: true,
    hardwarePendant: false,
    consumerApps: false,
    note: "Dedicated virtual proxy keeps personal WhatsApp and mobile numbers 100% private.",
  },
  {
    feature: "Covert Coercion Disguise (Fake Low Battery)",
    checksafe: true,
    hardwarePendant: false,
    consumerApps: false,
    note: "Displays a realistic unresponsive black screen while transmitting background coordinates.",
  },
  {
    feature: "Independent Cloud Countdown (Zero Battery Dependency)",
    checksafe: true,
    hardwarePendant: true,
    consumerApps: false,
    note: "Timers execute in the cloud; if phone is seized or broken, escalation fires on schedule.",
  },
  {
    feature: "1-Bar Cellular SMS Fallback (Basements / Off-Grid)",
    checksafe: true,
    hardwarePendant: false,
    consumerApps: false,
    note: "Commands work over basic SMS signaling even with zero 4G/5G internet data.",
  },
  {
    feature: "No Bulky Hardware to Charge or Forget",
    checksafe: true,
    hardwarePendant: false,
    consumerApps: true,
    note: "Progressive Web App (PWA) on worker's existing smartphone with zero App Store friction.",
  },
];

export default function CompliancePage() {
  const [downloadRequested, setDownloadRequested] = useState(false);
  const [workEmail, setWorkEmail] = useState("");

  function handleDpaRequest(e) {
    e.preventDefault();
    setDownloadRequested(true);
  }

  return (
    <div className="min-h-screen bg-white text-[#111215] flex flex-col font-sans antialiased selection:bg-[#111215] selection:text-white pt-16">
      <SiteHeader activePage="compliance" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-12 sm:pt-20 pb-12 sm:pb-16 bg-gradient-to-b from-slate-50/80 via-white to-white border-b border-slate-100">
          <div className="w-[96%] max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0B2545]/5 border border-[#0B2545]/20 text-[#0B2545] text-xs font-extrabold tracking-wider uppercase mb-4 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#00E08C]" />
                <span>UK Lone Worker Safeguarding · HSE Duty of Care & Guidance</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.08]">
                Lone Worker Safety Compliance &amp;
                <br />
                <span className="text-[#0B2545]">Security Architecture</span>
              </h1>

              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                How Checksafe satisfies the Health and Safety at Work etc. Act 1974, Suzy Lamplugh Trust unaccompanied guidelines, and zero-knowledge cryptographic privacy for UK employers and solo workers.
              </p>

              {/* Fast Facts Grid */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-200/80">
                <div>
                  <div className="text-2xl font-black text-[#0B2545]">HSE / BS</div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">Aligned Standard</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0B2545]">60-Second</div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">Biometric Purge</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0B2545]">Zero-SIM</div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">Proxy Virtualization</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0B2545]">100% UK</div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">Data Residency (London)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Employer Legal Duty of Care */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="w-[96%] max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
                  <Scale className="w-3.5 h-3.5 text-[#00E08C]" />
                  <span>Statutory Responsibilities</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  UK Employers Bear Non-Delegable Duty of Care for Solo Personnel
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Under the <strong>Health and Safety at Work etc. Act 1974</strong> and the <strong>Management of Health and Safety at Work Regulations 1999</strong>, employers must identify lone-working hazards and take active, preventative measures to reduce risk before employees attend off-site appointments.
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Relying solely on informal WhatsApp messages, missed-call check-ins, or post-incident reporting exposes directors to acute liability under the <strong>Corporate Manslaughter and Corporate Homicide Act 2007</strong>. Checksafe creates an auditable, pre-emptive compliance safeguard that proves proactive duty of care.
                </p>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Suzy Lamplugh Trust Alignment</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Follows estate agency guidelines: verify viewer identity before releasing keys, keep personal numbers masked, and maintain live countdowns.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Evidentiary Dispatch Trails</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Cryptographic audit logs timestamp check-ins, biometrically cleared viewer records, and emergency alerts ready for Police and insurer submission.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Zero Worker Victim Blaming</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Eliminates awkwardness of asking for ID in person. The system mandates digital KYC automatically before any appointment is formally booked.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Central Agency Fleet Desk</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Supervisors monitor live session statuses, trigger instant peer check-ins, and receive emergency coordinates without infringing on worker off-duty privacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Safety Standards Breakdown */}
        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200/60">
          <div className="w-[96%] max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2545]/5 text-[#0B2545] text-xs font-bold uppercase tracking-wider mb-3">
                <Award className="w-3.5 h-3.5 text-[#00E08C]" />
                <span>Technical Specifications</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Lone Worker Safeguarding Standards & Architecture
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Checksafe addresses each core requirement of the British Standard for lone-worker devices, applications, and alarm monitoring services.
              </p>
            </div>

            <div className="space-y-4">
              {SAFETY_CLAUSES.map((clause, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-[#0B2545] bg-[#0B2545]/10 px-2 py-0.5 rounded-md">
                        {clause.code}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        {clause.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      <strong>Standard Mandate:</strong> {clause.requirement}
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      <strong>Checksafe Architecture:</strong> {clause.implementation}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200 w-fit">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{clause.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Comprehensive Comparison Table */}
        <section className="py-14 sm:py-20 bg-white border-t border-slate-100">
          <div className="w-[96%] max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Comparison: Hardware Pendants vs Consumer Apps vs Checksafe
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Why modern UK lone-worker fleets are migrating away from expensive hardware fobs and ad-hoc consumer chat apps.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b-2 border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    <th className="py-4 px-4">Safety Capability</th>
                    <th className="py-4 px-4 bg-[#0B2545]/5 text-[#0B2545] rounded-t-xl">
                      Checksafe PWA
                    </th>
                    <th className="py-4 px-4 text-slate-500">Hardware Pendants</th>
                    <th className="py-4 px-4 text-slate-500">Consumer WhatsApp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-4 font-semibold text-slate-900">
                        {row.feature}
                        <div className="text-[11px] font-normal text-slate-400 mt-0.5">
                          {row.note}
                        </div>
                      </td>
                      <td className="py-4 px-4 bg-[#0B2545]/5 font-bold text-[#0B2545]">
                        <span className="inline-flex items-center gap-1.5 text-emerald-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Included</span>
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-500">
                        {row.hardwarePendant ? (
                          <span className="text-emerald-600">Yes</span>
                        ) : (
                          <span className="text-slate-400">✕ None</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-slate-500">
                        {row.consumerApps ? (
                          <span className="text-emerald-600">Yes</span>
                        ) : (
                          <span className="text-slate-400">✕ None</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 4: Request DPA & Compliance Pack CTA */}
        <section className="py-16 sm:py-24 bg-gradient-to-r from-[#0B2545] via-[#07192F] to-[#02050A] text-white">
          <div className="w-[96%] max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#00E08C] text-xs font-bold uppercase tracking-wider">
                  <FileCheck className="w-4 h-4" />
                  <span>Enterprise Security Pack</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Download Safety Architecture &amp; DPA Addendum
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Receive our official Data Processing Agreement (DPA), cryptographic proof whitepaper, Veriff biometric audit certificate, and emergency protocol documentation for your corporate safety committee.
                </p>
              </div>

              <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/15">
                {downloadRequested ? (
                  <div className="text-center py-4 space-y-2 animate-in fade-in duration-200">
                    <CheckCircle2 className="w-10 h-10 text-[#00E08C] mx-auto" />
                    <h4 className="text-lg font-bold">Pack Dispatched</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      The safety architecture specification and Data Processing Addendum have been sent to <strong>{workEmail}</strong>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleDpaRequest} className="space-y-3.5">
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Work Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="compliance.officer@firm.co.uk"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-hidden focus:border-[#00E08C] transition"
                    />
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-[#00E08C] hover:bg-[#00f298] text-[#0B2545] font-bold text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer hover:scale-[1.01]"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Compliance Pack (PDF)</span>
                    </button>
                    <div className="text-[11px] text-slate-400 text-center">
                      No spam. Formal compliance documentation for UK safety leads.
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
