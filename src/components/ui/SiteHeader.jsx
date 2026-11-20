"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ArrowUpRight,
  Menu,
  X,
  Briefcase,
  ShieldCheck,
  Cpu,
  Layers,
  PhoneCall,
  FileText,
} from "lucide-react";
import { CheckSafeLogo, CheckSafeIcon } from "@/components/ui/CheckSafeLogo";
import { COUNTRY_LIST } from "@/lib/countries";

const COUNTRY_FLAGS = {
  GB: "🇬🇧",
  IE: "🇮🇪",
  US: "🇺🇸",
  CA: "🇨🇦",
  AU: "🇦🇺",
  NZ: "🇳🇿",
  DE: "🇩🇪",
};

export const SITE_SERVICES = [
  {
    id: "property",
    idx: 0,
    brandName: "Property Safety",
    label: "Estate & Viewings",
    desc: "Biometric client screening & ghost proxy lines for property viewings",
    href: "/#sectors",
  },
  {
    id: "tuition",
    idx: 1,
    brandName: "Private Tuition & Solo Tutoring",
    label: "Tuition Safety",
    desc: "Parent identity screening pass & automated cloud countdown timers",
    href: "/#sectors",
  },
  {
    id: "wellness",
    idx: 2,
    brandName: "Clinical & Care Visits",
    label: "Healthcare Protection",
    desc: "Secret duress protocols & covert battery blackout screen protection",
    href: "/#sectors",
  },
  {
    id: "independent",
    idx: 3,
    brandName: "Fieldwork & Surveying",
    label: "Site Inspections",
    desc: "1-bar SMS satellite fallback for off-grid lone workers and basements",
    href: "/#sectors",
  },
];

export function SiteHeader({ activePage = "" }) {
  const [country, setCountry] = useState("GB");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      onMouseLeave={() => setServicesOpen(false)}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 transition-all duration-200"
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-16 flex items-center justify-between gap-4">
        {/* Left: Real Checksafe Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" aria-label="Checksafe Home" className="flex items-center hover:opacity-90 transition-opacity">
            <div className="sm:hidden">
              <CheckSafeIcon className="h-8 w-8" />
            </div>
            <div className="hidden sm:block">
              <CheckSafeLogo darkSurface={false} size="sm" />
            </div>
          </Link>
        </div>

        {/* Center: Clean Text Nav Links matching .most reference */}
        <nav className="hidden lg:flex items-center gap-1 lg:gap-2 xl:gap-3 text-[13px] font-semibold text-slate-600">
          {/* 1. Services with Wide Mega-Dropdown */}
          <div
            className="relative h-16 flex items-center"
            onMouseEnter={() => setServicesOpen(true)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              className={`relative h-16 flex items-center gap-1 px-3 transition-colors duration-200 cursor-pointer ${
                activePage === "services" || servicesOpen
                  ? "text-[#0B2545] font-bold"
                  : "text-slate-600 hover:text-[#0B2545]"
              }`}
            >
              <span className="relative inline-block pb-0.5">
                <span>Services</span>
                {activePage === "services" && (
                  <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#00E08C] rounded-full shadow-[0_0_6px_rgba(0,224,140,0.5)]" />
                )}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  servicesOpen ? "rotate-180 text-slate-900" : ""
                }`}
              />
            </button>
          </div>

          {/* 2. How It Works */}
          <Link
            href="/#journey"
            className={`relative h-16 flex items-center px-3 transition-colors duration-200 cursor-pointer ${
              activePage === "journey"
                ? "text-[#0B2545] font-bold"
                : "text-slate-600 hover:text-[#0B2545]"
            }`}
          >
            <span className="relative inline-block pb-0.5">
              <span>How It Works</span>
              {activePage === "journey" && (
                <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#00E08C] rounded-full shadow-[0_0_6px_rgba(0,224,140,0.5)]" />
              )}
            </span>
          </Link>

          {/* 3. Safety Protocol */}
          <Link
            href="/#protocol"
            className={`relative h-16 flex items-center px-3 transition-colors duration-200 cursor-pointer ${
              activePage === "protocol"
                ? "text-[#0B2545] font-bold"
                : "text-slate-600 hover:text-[#0B2545]"
            }`}
          >
            <span className="relative inline-block pb-0.5">
              <span>Protocol</span>
              {activePage === "protocol" && (
                <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#00E08C] rounded-full shadow-[0_0_6px_rgba(0,224,140,0.5)]" />
              )}
            </span>
          </Link>

          {/* 4. Safety Standards */}
          <Link
            href="/compliance"
            className={`relative h-16 flex items-center px-3 transition-colors duration-200 cursor-pointer ${
              activePage === "compliance"
                ? "text-[#0B2545] font-bold"
                : "text-slate-600 hover:text-[#0B2545]"
            }`}
          >
            <span className="relative inline-block pb-0.5">
              <span>Compliance</span>
              {activePage === "compliance" && (
                <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#00E08C] rounded-full shadow-[0_0_6px_rgba(0,224,140,0.5)]" />
              )}
            </span>
          </Link>

          {/* 5. Pricing */}
          <Link
            href="/#pricing"
            className={`relative h-16 flex items-center px-3 transition-colors duration-200 cursor-pointer ${
              activePage === "pricing"
                ? "text-[#0B2545] font-bold"
                : "text-slate-600 hover:text-[#0B2545]"
            }`}
          >
            <span className="relative inline-block pb-0.5">
              <span>Pricing</span>
              {activePage === "pricing" && (
                <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#00E08C] rounded-full shadow-[0_0_6px_rgba(0,224,140,0.5)]" />
              )}
            </span>
          </Link>

          

          {/* 6. Contact Us */}
          <Link
            href="/contact"
            className={`relative h-16 flex items-center px-3 transition-colors duration-200 cursor-pointer ${
              activePage === "contact"
                ? "text-[#0B2545] font-bold"
                : "text-slate-600 hover:text-[#0B2545]"
            }`}
          >
            <span className="relative inline-block pb-0.5">
              <span>Contact Us</span>
              {activePage === "contact" && (
                <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#00E08C] rounded-full shadow-[0_0_6px_rgba(0,224,140,0.5)]" />
              )}
            </span>
          </Link>

          {/* 7. Worker Console */}
          <Link
            href="/dashboard"
            className="relative h-16 hidden xl:flex items-center gap-1.5 px-3 text-slate-600 hover:text-[#0B2545] transition-colors duration-200"
          >
            <span>Worker Console</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
              Live
            </span>
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Country Selector */}
          <div className="relative inline-flex items-center">
            <label htmlFor="country-select-nav" className="sr-only">
              Country
            </label>
            <select
              id="country-select-nav"
              value={country}
              aria-label="Select Operating Jurisdiction"
              onChange={(e) => setCountry(e.target.value)}
              className="appearance-none bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold rounded-full pl-3 pr-7 py-2 cursor-pointer focus:outline-hidden transition"
            >
              {COUNTRY_LIST.map((c) => (
                <option key={c.code} value={c.code} className="text-slate-900 bg-white">
                  {COUNTRY_FLAGS[c.code]} {c.code}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>

          <Link
            href="/login"
            className="text-xs font-semibold text-slate-600 hover:text-[#0B2545] px-2 py-2 transition hidden sm:inline-block"
          >
            Sign in
          </Link>

          <Link
            href={`/signup?country=${country}`}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#0B2545] hover:bg-[#111827] text-white text-xs sm:text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          >
            <span>Start Protection</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#00E08C]" />
          </Link>

          {/* Mobile & Tablet Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Full-Width Dropdown Bar (Attached directly beneath header matching .most reference) */}
      {servicesOpen && (
        <div
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
          className="absolute top-full left-0 right-0 w-full bg-white border-t border-slate-100 border-b border-slate-200/80 shadow-md z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-7 sm:py-8">
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-14">
              {/* Far Left: / products */}
              <div className="shrink-0 lg:w-44 pt-0.5">
                <span className="text-xl font-medium text-slate-900 tracking-tight flex items-center">
                  <span className="text-slate-400 font-light mr-2">/</span>
                  <span>services</span>
                </span>
              </div>

              {/* 4 Horizontal Columns matching reference image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 flex-1">
                {SITE_SERVICES.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setServicesOpen(false)}
                    className="group flex items-start gap-2.5 cursor-pointer"
                  >
                    <span className="inline-block w-2.5 h-2.5 bg-black rounded-[2px] -rotate-12 mt-1 shrink-0 group-hover:bg-[#00E08C] transition-colors" />
                    <div>
                      <div className="text-[14px] font-bold text-slate-900 group-hover:text-[#00E08C] transition-colors tracking-tight leading-tight">
                        {item.brandName}
                      </div>
                      <p className="text-[12px] text-slate-500 group-hover:text-slate-700 mt-1 leading-snug transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/98 backdrop-blur-md px-5 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150 shadow-lg">
          <Link
            href="/#journey"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 text-sm py-2 px-3 rounded-xl font-semibold text-slate-700 hover:text-black hover:bg-slate-50 transition"
          >
            <Layers className="w-4 h-4 text-[#00E08C]" />
            <span>How It Works</span>
          </Link>
          <Link
            href="/#sectors"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 text-sm py-2 px-3 rounded-xl font-semibold text-slate-700 hover:text-black hover:bg-slate-50 transition"
          >
            <Briefcase className="w-4 h-4 text-[#00E08C]" />
            <span>Safety Services</span>
          </Link>
          <Link
            href="/#protocol"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 text-sm py-2 px-3 rounded-xl font-semibold text-slate-700 hover:text-black hover:bg-slate-50 transition"
          >
            <ShieldCheck className="w-4 h-4 text-[#00E08C]" />
            <span>Safety Protocol</span>
          </Link>
          <Link
            href="/compliance"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 text-sm py-2 px-3 rounded-xl font-semibold text-slate-700 hover:text-black hover:bg-slate-50 transition"
          >
            <Cpu className="w-4 h-4 text-[#00E08C]" />
            <span>Safety Standards</span>
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 text-sm py-2 px-3 rounded-xl font-semibold text-slate-700 hover:text-black hover:bg-slate-50 transition"
          >
            <FileText className="w-4 h-4 text-[#00E08C]" />
            <span>Pricing</span>
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 text-sm py-2 px-3 rounded-xl font-semibold text-slate-700 hover:text-black hover:bg-slate-50 transition"
          >
            <PhoneCall className="w-4 h-4 text-[#00E08C]" />
            <span>Contact Us</span>
          </Link>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold text-slate-700 py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              Sign In
            </Link>
            <Link
              href={`/signup?country=${country}`}
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0B2545] px-4 py-2 rounded-full"
            >
              <span>Start Protection</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#00E08C]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
