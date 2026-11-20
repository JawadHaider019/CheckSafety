"use client";
import React from "react";
import Link from "next/link";
import { CheckSafeLogo } from "@/components/ui/CheckSafeLogo";
import { COMPANY_NAME } from "@/lib/domains";

export function SiteFooter() {
  return (
    <footer className="section-defer bg-white text-[#111215] pt-12 sm:pt-16 pb-16 sm:pb-24 border-t border-slate-100">
      <div className="w-[96%] max-w-[1800px] mx-auto px-4 sm:px-6">
        {/* Minimalist Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start justify-between">
          {/* Left Column: Brand Logo + Motto */}
          <div className="md:col-span-4 space-y-3.5">
            <Link href="/" aria-label="Checksafe Home">
              <CheckSafeLogo darkSurface={false} size="sm" />
            </Link>
            <p className="text-xs text-slate-500 max-w-[240px] leading-relaxed font-normal">
              Make your complicated lone-worker safety more simple.
            </p>
            <div className="pt-2 text-[11px] text-slate-400">
              © 2026 {COMPANY_NAME}. All rights reserved.
            </div>
          </div>

          {/* Right Link Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Features Column */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-900">Features</div>
              <ul className="space-y-2.5 text-xs text-slate-500 font-normal">
                <li>
                  <Link href="/#interactive-demo" className="hover:text-slate-900 transition">
                    Biometric Pass
                  </Link>
                </li>
                <li>
                  <Link href="/#failsafes" className="hover:text-slate-900 transition">
                    Ghost Number
                  </Link>
                </li>
                <li>
                  <Link href="/#failsafes" className="hover:text-slate-900 transition">
                    Cloud Sentinel
                  </Link>
                </li>
                <li>
                  <Link href="/#protocol" className="hover:text-slate-900 transition">
                    Silent Duress
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-slate-900 transition">
                    Live Console
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sectors Column */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-900">Sectors</div>
              <ul className="space-y-2.5 text-xs text-slate-500 font-normal">
                <li>
                  <Link href="/#sectors" className="hover:text-slate-900 transition">
                    Real Estate
                  </Link>
                </li>
                <li>
                  <Link href="/#sectors" className="hover:text-slate-900 transition">
                    Healthcare
                  </Link>
                </li>
                <li>
                  <Link href="/#sectors" className="hover:text-slate-900 transition">
                    Surveying
                  </Link>
                </li>
                <li>
                  <Link href="/#sectors" className="hover:text-slate-900 transition">
                    Solo Retail &amp; Night Work
                  </Link>
                </li>
              </ul>
            </div>

            {/* Standards & Trust Column */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-900">Trust &amp; Standards</div>
              <ul className="space-y-2.5 text-xs text-slate-500 font-normal">
                <li>
                  <Link href="/#journey" className="hover:text-slate-900 transition">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="hover:text-slate-900 transition">
                    Safety Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="hover:text-slate-900 transition">
                    Suzy Lamplugh Trust
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-slate-900 transition">
                    Help &amp; FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-900">Legal</div>
              <ul className="space-y-2.5 text-xs text-slate-500 font-normal">
                <li>
                  <Link href="/privacy" className="hover:text-slate-900 transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-slate-900 transition">
                    Biometric Charter
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="hover:text-slate-900 transition">
                    Security Architecture
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-slate-900 transition">
                    Contact Security Team
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
