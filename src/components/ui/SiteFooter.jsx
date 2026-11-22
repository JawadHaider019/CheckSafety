import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import { CheckSafeLogo } from "@/components/ui/CheckSafeLogo";
import { COMPANY_NAME } from "@/lib/domains";

const COLUMNS = [
  {
    title: "Product",
    links: [
      ["How it works", "/#journey"],
      ["Safety protocol", "/#protocol"],
      ["Safeguards", "/#safeguards"],
      ["Pricing", "/#pricing"],
      ["Worker console", "/dashboard"],
    ],
  },
  {
    title: "Who it's for",
    links: [
      ["Property", "/#sectors"],
      ["Private tuition", "/#sectors"],
      ["Mobile wellness", "/#sectors"],
      ["Independent professionals", "/#sectors"],
      ["Teams & agencies", "/#pricing"],
    ],
  },
  {
    title: "Trust",
    links: [
      ["Zero-knowledge privacy", "/#privacy"],
      ["Compliance", "/compliance"],
      ["Privacy policy", "/privacy"],
      ["FAQ", "/#faq"],
      ["Contact", "/contact"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="navy-gradient text-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 pt-16 sm:pt-24 pb-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-14 sm:pb-20 border-b border-white/10">
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-semibold tracking-[-0.035em] leading-[1.02] max-w-[14ch] text-balance">
            Your next appointment, <span className="font-serif italic font-normal text-[#00E08C]">covered.</span>
          </h2>
          <Link
            href="/#get-started"
            className="cs-press group inline-flex items-center gap-2 h-14 pl-7 pr-5 rounded-full bg-[#00E08C] hover:bg-[#33E8A3] text-[#07182E] text-base font-semibold w-fit"
          >
            Start protection
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="pt-12 grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-6 space-y-4">
            <CheckSafeLogo darkSurface size="sm" />
            <p className="text-sm text-slate-400 max-w-[34ch] leading-relaxed">
              Client checks, masked numbers and automated safety timers for people who work alone.
            </p>
            <p className="inline-flex items-center gap-2 text-xs text-slate-400">
              <Lock className="w-3.5 h-3.5 text-[#00E08C]" />
              Client data is never stored in readable form
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title} className="md:col-span-2 last:col-span-2 md:last:col-span-2">
              <p className="text-xs font-semibold text-white mb-4">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-slate-400">
          <p>© 2026 {COMPANY_NAME}. All rights reserved.</p>
          <p>In an emergency, always call your local emergency number first.</p>
        </div>
      </div>
    </footer>
  );
}
