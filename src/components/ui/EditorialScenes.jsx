import React from "react";

/**
 * Rotating circular security seal stamp badge
 */
export function RotatingSecurityStamp({
  className = "w-28 h-28",
  text = "CHECKSAFETY VERIFIED • BS 8484 ALIGNED • ZERO KNOWLEDGE • ",
}) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full animate-spin-slow origin-center select-none"
        aria-hidden="true"
      >
        <path
          id="securityStampCircle"
          d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          fill="none"
        />
        <text className="text-[11px] font-bold uppercase tracking-[0.24em] fill-slate-800">
          <textPath xlinkHref="#securityStampCircle" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      {/* Center Icon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-10 h-10 rounded-full bg-[#111215] text-white flex items-center justify-center shadow-sm">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-emerald-400"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * Scene 1: Luxury Architectural Real Estate Viewing (Nord / Poperty style)
 */
export function RealEstateViewingScene({ className = "" }) {
  return (
    <div
      className={`relative w-full h-full min-h-[280px] rounded-2xl overflow-hidden bg-gradient-to-tr from-[#1A1C23] via-[#2D3139] to-[#454B57] text-white p-6 flex flex-col justify-between ${className}`}
    >
      {/* Background Architectural Geometry SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="archGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Modernist Villa Cantilever & Vaulted Glass Lines */}
        <polygon points="100,50 700,50 650,450 50,450" fill="url(#archGrad)" />
        <line x1="250" y1="50" x2="220" y2="450" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="450" y1="50" x2="420" y2="450" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="50" y1="300" x2="650" y2="300" stroke="#FFFFFF" strokeWidth="1.5" />
        <rect x="270" y="120" width="160" height="260" rx="8" fill="#FFFFFF" fillOpacity="0.08" />
      </svg>

      {/* Top Floating Badge Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-white/90 border border-white/15">
          Prime Property Viewing
        </span>
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-black/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Client Biometrically Cleared
        </span>
      </div>

      {/* Center Content Lockup */}
      <div className="relative z-10 mt-auto pt-12">
        <div className="text-[11px] font-mono uppercase tracking-widest text-slate-300">
          Unaccompanied Lone Agent Session
        </div>
        <div className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
          Kensington Penthouse Appointment
        </div>
        <p className="text-xs text-slate-300/80 mt-1 max-w-sm">
          Prospective buyer passed 3D biometric liveness before key release. Real mobile phone number
          hidden behind Ghost Proxy.
        </p>
      </div>

      {/* Bottom Floating Metric Bar */}
      <div className="relative z-10 mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-white/70 font-mono">
        <span>Gate: cs-idgate.com</span>
        <span className="text-emerald-400 font-semibold">Cloud Sentinel: 00:32:15</span>
      </div>
    </div>
  );
}

/**
 * Scene 2: Healthcare & Domiciliary Clinical Care (Steevlp & Cargo Panda style)
 */
export function HealthcareCareScene({ className = "" }) {
  return (
    <div
      className={`relative w-full h-full min-h-[280px] rounded-2xl overflow-hidden bg-gradient-to-tr from-[#0F2642] via-[#1E3A5F] to-[#2B527E] text-white p-6 flex flex-col justify-between ${className}`}
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="650" cy="150" r="180" fill="#10B981" fillOpacity="0.15" />
        <path
          d="M 50,300 Q 200,100 400,300 T 750,300"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <rect x="80" y="100" width="220" height="300" rx="16" fill="#FFFFFF" fillOpacity="0.05" />
      </svg>

      <div className="relative z-10 flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-white/90 border border-white/15">
          Domiciliary Care
        </span>
        <span className="text-xs text-emerald-300 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-400/30">
          Two-Stage Duress Armed
        </span>
      </div>

      <div className="relative z-10 mt-auto pt-12">
        <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-200">
          NHS & Private Care Practice
        </div>
        <div className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
          Independent Clinical Consultation
        </div>
        <p className="text-xs text-slate-200/80 mt-1 max-w-sm">
          Silent duress PIN (9999) simulates smooth checkout while quietly dispatching GPS coordinates
          to emergency on-call clinicians.
        </p>
      </div>

      <div className="relative z-10 mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-white/70 font-mono">
        <span>Voice Check-in: 1-Tap</span>
        <span className="text-emerald-300 font-semibold">1% Battery Beacon Ready</span>
      </div>
    </div>
  );
}

/**
 * Scene 3: Structural Survey & Site Inspection (Nord / Steevlp style)
 */
export function SurveyInspectionScene({ className = "" }) {
  return (
    <div
      className={`relative w-full h-full min-h-[280px] rounded-2xl overflow-hidden bg-gradient-to-tr from-[#18191D] via-[#2A2B33] to-[#3E404C] text-white p-6 flex flex-col justify-between ${className}`}
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 600"
      >
        <defs>
          <pattern id="surveyGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#surveyGrid)" />
        <polygon points="150,450 350,150 550,450" fill="none" stroke="#10B981" strokeWidth="3" />
      </svg>

      <div className="relative z-10 flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-white/90 border border-white/15">
          Engineering & Survey
        </span>
        <span className="text-xs text-amber-300 font-semibold bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-400/30">
          1-Bar SMS Satellite Fallback
        </span>
      </div>

      <div className="relative z-10 mt-auto pt-12">
        <div className="text-[11px] font-mono uppercase tracking-widest text-slate-300">
          RICS Certified Field Protocols
        </div>
        <div className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
          Vacant Commercial Appraisal
        </div>
        <p className="text-xs text-slate-300/80 mt-1 max-w-sm">
          Basement & dead-zone safety: countdown persists in London cloud even when phone loses 4G/5G
          cellular data.
        </p>
      </div>

      <div className="relative z-10 mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-white/70 font-mono">
        <span>Cell Fallback: SMS Active</span>
        <span className="text-emerald-400 font-semibold">UK-GDPR eu-west-2</span>
      </div>
    </div>
  );
}
