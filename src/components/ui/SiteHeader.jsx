"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { signOut, useSession } from "@/lib/demoAuth";
import { CheckSafeLogo, CheckSafeIcon } from "@/components/ui/CheckSafeLogo";
import { useClientValue } from "@/lib/useClientSnapshot";

const readScrolled = () => window.scrollY > 8;
const subscribeScroll = (cb) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};

const NAV = [
  { id: "sectors", label: "Who it's for", href: "/#sectors" },
  { id: "journey", label: "How it works", href: "/#journey" },
  { id: "protocol", label: "Safety protocol", href: "/#protocol" },
  { id: "pricing", label: "Pricing", href: "/#pricing" },
  { id: "compliance", label: "Compliance", href: "/compliance" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export function SiteHeader({ activePage = "" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const signedIn = useSession().status === "in";
  const scrolled = useClientValue(readScrolled, false, subscribeScroll);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.__lenis?.stop();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 border-b ${
        scrolled || menuOpen
          ? "bg-white/95 lg:bg-white/80 lg:backdrop-blur-xl border-slate-200/70 shadow-[0_8px_30px_-20px_rgba(11,37,69,0.25)]"
          : "bg-white border-transparent"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 h-16 flex items-center justify-between gap-4">
        <Link href="/" aria-label="Checksafe home" className="shrink-0 hover:opacity-90 transition-opacity">
          <span className="sm:hidden">
            <CheckSafeIcon className="h-8 w-8" />
          </span>
          <span className="hidden sm:inline-flex">
            <CheckSafeLogo darkSurface={false} size="sm" />
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:flex items-center gap-0.5 text-[13px] font-medium">
          {NAV.map((item) => {
            const active = activePage === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-3 py-2 rounded-full transition-colors ${
                  active ? "text-[#0B2545] font-semibold" : "text-slate-600 hover:text-[#0B2545] hover:bg-slate-100/70"
                }`}
              >
                {item.label}
                {active && <span className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-[#00E08C]" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          {signedIn ? (
            <Link
              href="/dashboard"
              className="cs-press group inline-flex items-center gap-2 h-10 pl-3 pr-4 rounded-full bg-[#0B2545] hover:bg-[#123461] text-white text-[13px] font-semibold shadow-[0_8px_20px_-10px_rgba(11,37,69,0.7)]"
            >
              <LayoutDashboard className="w-4 h-4 text-[#00E08C]" />
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden sm:inline-flex px-3 py-2 text-[13px] font-semibold text-slate-600 hover:text-[#0B2545] transition">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="cs-press group inline-flex items-center gap-1.5 h-10 pl-4 pr-3 rounded-full bg-[#0B2545] hover:bg-[#123461] text-white text-[13px] font-semibold shadow-[0_8px_20px_-10px_rgba(11,37,69,0.7)]"
              >
                <span className="sm:hidden">Get protected</span>
                <span className="hidden sm:inline">Start protection</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#00E08C] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden w-10 h-10 rounded-full hover:bg-slate-100 text-slate-800 flex items-center justify-center cursor-pointer transition"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="cs-fade lg:hidden fixed inset-x-0 top-16 bottom-0 bg-white overflow-y-auto pb-[env(safe-area-inset-bottom)]"
        >
          <nav aria-label="Mobile" className="px-5 pt-4 pb-8 flex flex-col">
            {NAV.map((item, i) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="cs-rise flex items-center justify-between py-4 border-b border-slate-100 text-2xl font-semibold tracking-tight text-[#0B2545]"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                {item.label}
                <ArrowUpRight className="w-5 h-5 text-slate-300" />
              </Link>
            ))}
            <div className="cs-rise cs-d6 mt-8 grid grid-cols-2 gap-3">
              {signedIn ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                      setMenuOpen(false);
                    }}
                    className="cs-press h-12 rounded-full border border-slate-200 flex items-center justify-center gap-1.5 text-sm font-semibold text-[#0B2545] cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="cs-press h-12 rounded-full bg-[#0B2545] text-white flex items-center justify-center gap-1.5 text-sm font-semibold"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#00E08C]" /> Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="cs-press h-12 rounded-full border border-slate-200 flex items-center justify-center text-sm font-semibold text-[#0B2545]"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="cs-press h-12 rounded-full bg-[#0B2545] text-white flex items-center justify-center gap-1.5 text-sm font-semibold"
                  >
                    Start protection <ArrowUpRight className="w-4 h-4 text-[#00E08C]" />
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
