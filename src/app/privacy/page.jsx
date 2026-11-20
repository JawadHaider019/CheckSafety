"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Clock,
  Server,
  FileText,
  CheckCircle2,
  AlertCircle,
  Mail,
  Building,
  ArrowRight,
} from "lucide-react";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { COMPANY_NAME, PRIMARY_DOMAIN } from "@/lib/domains";

const SECTIONS = [
  { id: "controller", title: "1. Data Controller & Scope" },
  { id: "biometrics", title: "2. The 60-Second Biometric Identity Purge" },
  { id: "proxy", title: "3. Ghost Proxy Virtual Lines & SIM Masking" },
  { id: "geolocation", title: "4. Geolocation Encryption & Silent Duress" },
  { id: "retention", title: "5. Data Retention & Global Safety Hash" },
  { id: "rights", title: "6. Your Statutory Rights Under UK GDPR" },
  { id: "dpo", title: "7. Data Protection Officer (DPO) Contact" },
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("controller");

  return (
    <div className="min-h-screen bg-white text-[#111215] flex flex-col font-sans antialiased selection:bg-[#111215] selection:text-white pt-16">
      <SiteHeader activePage="privacy" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-12 sm:pt-20 pb-12 sm:pb-16 bg-gradient-to-b from-slate-50/80 via-white to-white border-b border-slate-100">
          <div className="w-[96%] max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0B2545]/5 border border-[#0B2545]/20 text-[#0B2545] text-xs font-extrabold tracking-wider uppercase mb-4 shadow-2xs">
                <Lock className="w-4 h-4 text-[#00E08C]" />
                <span>Zero-Knowledge Privacy Policy &amp; Biometric Charter</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.08]">
                Privacy by Cryptographic Design,
                <br />
                <span className="text-[#0B2545]">Not Just Policy</span>
              </h1>

              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                How Checksafe Software Ltd. processes biometric screenings, virtualizes phone lines, and enforces the mandatory 60-second raw identity purge under UK GDPR and the Data Protection Act 2018.
              </p>

              <div className="mt-6 flex items-center gap-4 text-xs text-slate-500 font-semibold">
                <span>Last Updated: November 2026</span>
                <span>•</span>
                <span>Version 3.4 (UK Lone-Worker Safety & Biometric Protection)</span>
                <span>•</span>
                <span className="text-emerald-600">UK Data Residency</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section with Sticky Sidebar */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="w-[96%] max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Sticky Sidebar (4 cols) */}
              <div className="hidden lg:block lg:col-span-4 sticky top-24 space-y-2 p-5 bg-slate-50 rounded-3xl border border-slate-200/80">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider px-3 pb-2 border-b border-slate-200/80">
                  Privacy Charter Sections
                </div>
                <nav className="space-y-1">
                  {SECTIONS.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={() => setActiveSection(s.id)}
                      className={`block text-xs font-semibold py-2 px-3 rounded-xl transition ${
                        activeSection === s.id
                          ? "bg-[#0B2545] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                      }`}
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>

                <div className="pt-4 border-t border-slate-200/80">
                  <div className="text-[11px] text-slate-500 leading-relaxed">
                    Have questions regarding our Data Processing Addendum (DPA)?
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2545] hover:text-black mt-2"
                  >
                    <span>Contact DPO Desk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Main Policy Prose (8 cols) */}
              <div className="lg:col-span-8 space-y-12 text-slate-700 leading-relaxed text-sm sm:text-base">
                
                {/* 1. Data Controller */}
                <div id="controller" className="scroll-mt-24 space-y-3.5">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="text-[#00E08C] font-mono text-lg">§1</span>
                    <span>Data Controller &amp; Scope of Protection</span>
                  </h2>
                  <p>
                    This Privacy Policy and Biometric Charter governs the processing of personal data by <strong>{COMPANY_NAME}</strong> (&ldquo;Checksafe&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), registered in England and Wales under company number 14892011, having our registered operations at 100 Leadenhall Street, City of London, EC3A 3BP.
                  </p>
                  <p>
                    Checksafe operates a proprietary lone-worker security ecosystem comprising our progressive web application, emergency dispatch relays, virtual proxy communication channels, and identity verification portals (&ldquo;Services&rdquo;). We act as an independent <strong>Data Controller</strong> for our registered solo workers and agency fleet supervisors, and as a <strong>Data Processor</strong> with respect to third-party clients (such as property viewers, tutoring parents, or domiciliary patients) undergoing pre-appointment identity checks on behalf of a subscriber.
                  </p>
                </div>

                {/* 2. 60-Second Biometric Identity Purge */}
                <div id="biometrics" className="scroll-mt-24 space-y-3.5 pt-8 border-t border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="text-[#00E08C] font-mono text-lg">§2</span>
                    <span>The 60-Second Biometric Identity Purge</span>
                  </h2>
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900 space-y-1">
                    <strong>Zero Raw Biometric Storage Guarantee:</strong>
                    <p>
                      Checksafe never permanently retains raw facial scans, passport imagery, or biometric vectors on our production servers. All identity data is cryptographically destroyed within 60 seconds of automated verification clearance.
                    </p>
                  </div>
                  <p>
                    When an unaccompanied worker initiates a client verification pass, the counterparty receives a secure, unbranded verification link. The verification process is executed through our certified KYC verification partner (<strong>Veriff</strong>). The viewer provides:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li>Government-issued photographic identification (e.g., UK Driving Licence or International Passport);</li>
                    <li>A real-time 3D liveness selfie to prevent spoofing and presentation attacks.</li>
                  </ul>
                  <p>
                    Upon successful liveness clearance, our pipeline computes a one-way cryptographic <strong>HMAC SHA-256 fingerprint</strong> combining the verified date-of-birth and document authority code. This irreversible token is cross-referenced with the Global Safety Hash registry. Once verified, the raw selfie and photo document images are permanently purged from cache within 60 seconds.
                  </p>
                </div>

                {/* 3. Ghost Proxy Virtual Lines */}
                <div id="proxy" className="scroll-mt-24 space-y-3.5 pt-8 border-t border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="text-[#00E08C] font-mono text-lg">§3</span>
                    <span>Ghost Proxy Virtual Lines &amp; SIM Masking</span>
                  </h2>
                  <p>
                    A foundational hazard for lone workers is the exposure of personal mobile numbers to unknown clients, resulting in harassment, stalking, or out-of-hours intrusion. Checksafe integrates virtual telecommunications proxy lines powered by <strong>Twilio UK</strong>:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li><strong>Outbound Masking:</strong> When a worker contacts a viewer via SMS or phone call, the recipient only observes the dedicated virtual Checksafe proxy line;</li>
                    <li><strong>Inbound Filtering:</strong> Inbound calls route through our proxy exchange and can be muted outside designated working appointments;</li>
                    <li><strong>Zero Carrier SIM Logging:</strong> Your actual SIM IMEI, IMSI, and personal WhatsApp identifier are never exposed or recorded in the client-facing transaction.</li>
                  </ul>
                </div>

                {/* 4. Geolocation Minimization */}
                <div id="geolocation" className="scroll-mt-24 space-y-3.5 pt-8 border-t border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="text-[#00E08C] font-mono text-lg">§4</span>
                    <span>Geolocation Minimization &amp; Silent Duress Escalation</span>
                  </h2>
                  <p>
                    We strictly reject permanent, invasive 24/7 worker surveillance. In compliance with the <strong>UK Information Commissioner&apos;s Office (ICO) Employment Practices Code</strong>:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                    <li>
                      <strong>Active Session Window Only:</strong> Location coordinates are captured only during an active timed session (e.g. an estate viewing or home therapy session) initiated by the worker.
                    </li>
                    <li>
                      <strong>Zero Idle Tracking:</strong> When no timer is running, our application does not track, record, or poll background geolocation coordinates.
                    </li>
                    <li>
                      <strong>Custom Secret Duress Protocol:</strong> In the event of duress where an aggressor coerces the worker to unlock or checkout their phone, entering the secret duress PIN displays a benign checkout screen while instantaneously relaying real-time emergency coordinates to the worker&apos;s nominated fleet supervisor or emergency contact.
                    </li>
                  </ul>
                </div>

                {/* 5. Data Retention */}
                <div id="retention" className="scroll-mt-24 space-y-3.5 pt-8 border-t border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="text-[#00E08C] font-mono text-lg">§5</span>
                    <span>Data Retention Periods &amp; Cryptographic Vault</span>
                  </h2>
                  <p>
                    We retain data only for periods strictly necessary to satisfy statutory duty-of-care, health and safety audit trails, and legal defence:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
                      <thead className="bg-slate-100 text-slate-800 font-bold uppercase">
                        <tr>
                          <th className="p-3 border-b border-slate-200">Data Category</th>
                          <th className="p-3 border-b border-slate-200">Retention Horizon</th>
                          <th className="p-3 border-b border-slate-200">Legal Justification</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="p-3 font-semibold text-slate-900">Raw Client Selfies &amp; Passports</td>
                          <td className="p-3 text-emerald-600 font-bold">Purged within 60 Seconds</td>
                          <td className="p-3 text-slate-500">Biometric Minimization Principle</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-slate-900">Session Verification Tokens (Hashed)</td>
                          <td className="p-3">30 Days (Repeat Token: 365 Days)</td>
                          <td className="p-3 text-slate-500">Client Repeat Booking Vault</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-slate-900">Emergency Dispatch &amp; Duress Logs</td>
                          <td className="p-3">3 Years</td>
                          <td className="p-3 text-slate-500">UK HSE &amp; Limitation Act 1980</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-slate-900">Worker Account &amp; Billing Data</td>
                          <td className="p-3">Duration of subscription + 6 years</td>
                          <td className="p-3 text-slate-500">HMRC Statutory Tax Compliance</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 6. Statutory Rights */}
                <div id="rights" className="scroll-mt-24 space-y-3.5 pt-8 border-t border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="text-[#00E08C] font-mono text-lg">§6</span>
                    <span>Your Statutory Rights Under UK GDPR</span>
                  </h2>
                  <p>
                    Under the <strong>UK General Data Protection Regulation (UK GDPR)</strong> and the <strong>Data Protection Act 2018</strong>, both registered workers and external clients retain enforceable rights regarding their data:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li><strong>Right to Erasure (Article 17):</strong> Request deletion of hashed tokens and historical contact records where legal retention mandates have expired;</li>
                    <li><strong>Right to Rectification (Article 16):</strong> Correct inaccurate contact or emergency peer allocation details instantly in the Worker Console;</li>
                    <li><strong>Right to Data Portability (Article 20):</strong> Export session logs and compliance audit trails in machine-readable JSON format;</li>
                    <li><strong>Right to Object (Article 21):</strong> Opt out of non-essential operational notifications or safety bulletins at any time.</li>
                  </ul>
                </div>

                {/* 7. DPO Contact */}
                <div id="dpo" className="scroll-mt-24 space-y-3.5 pt-8 border-t border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="text-[#00E08C] font-mono text-lg">§7</span>
                    <span>Data Protection Officer (DPO) &amp; Supervisory Authority</span>
                  </h2>
                  <p>
                    For inquiries regarding cryptographic verification, data protection agreements (DPAs), or exercising statutory privacy rights:
                  </p>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs sm:text-sm">
                    <div className="font-bold text-slate-900">Data Protection Officer</div>
                    <div>Checksafe Software Ltd.</div>
                    <div>100 Leadenhall Street, City of London, London EC3A 3BP</div>
                    <div>
                      Email:{" "}
                      <a
                        href={`mailto:compliance@${PRIMARY_DOMAIN}`}
                        className="font-mono text-[#0B2545] font-bold hover:underline"
                      >
                        compliance@{PRIMARY_DOMAIN}
                      </a>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    If you believe your personal data has been handled in breach of UK data protection laws, you retain the right to lodge a formal complaint with the <strong>Information Commissioner&apos;s Office (ICO)</strong> at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-900">ico.org.uk</a>.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
