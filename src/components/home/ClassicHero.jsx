import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroCard } from "./HeroCard";
import { Accent, Eyebrow, H2 } from "@/components/marketing/Marketing";

const HERO_IMAGE = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80";

const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=75",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=75",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=75",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=75",
];

function Fillet({ className }) {
  return (
    <svg className={`absolute w-7 h-7 text-white fill-current pointer-events-none ${className}`} viewBox="0 0 28 28" aria-hidden="true">
      <path d="M0 28 Q 28 28 28 0 L 28 28 Z" />
    </svg>
  );
}

export function ClassicHero() {
  return (
    <section className="hero-pin sticky top-16 mt-16 z-10 w-full h-(--hero-h) flex justify-center items-start overflow-hidden bg-white px-2.5 sm:px-3 lg:px-4 pt-1 pb-2">
      <HeroCard className="hero-scroll-card w-full h-full relative rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] overflow-hidden bg-[#0B2545] flex items-center justify-center sm:justify-start shadow-sm">
        <div aria-hidden="true" className="hero-scroll-bg absolute -inset-6 sm:-inset-16 pointer-events-none overflow-hidden">
          <div className="hero-bg-in w-full h-full">
            <div className="hero-mouse-bg w-full h-full">
              <div className="hero-ambient relative w-full h-full">
                <Image
                  src={HERO_IMAGE}
                  alt=""
                  fill
                  preload
                  fetchPriority="high"
                  sizes="100vw"
                  className="object-cover object-[72%_center] sm:object-right lg:object-[right_-2rem_center]"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute -top-72 -left-72 w-[900px] h-[900px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(closest-side, rgba(0,224,140,0.12), rgba(0,224,140,0))" }}
        />
        <div aria-hidden="true" className="absolute inset-0 w-full lg:w-[65%] bg-linear-to-r from-[#0B2545]/90 via-[#0B2545]/50 to-transparent pointer-events-none" />

        <div className="hero-scroll-content relative z-10 w-full">
          <div className="hero-mouse-fg w-full px-5 py-6 sm:p-10 lg:p-14 xl:p-16 min-[125rem]:p-24 flex flex-col items-center text-center sm:items-start sm:text-left justify-center max-w-2xl min-[125rem]:max-w-4xl text-white">
            <div className="mk-hero-in mb-4">
              <Eyebrow dark>UK lone-worker safety</Eyebrow>
            </div>

            <h1 className={`${H2} mk-hero-text min-[125rem]:text-[92px] text-white`}>
              Protecting Your
              <br />
              <Accent dark>Next Meeting.</Accent>
            </h1>

            <p className="mk-hero-in cs-d3 mt-3.5 sm:mt-5 text-sm sm:text-base lg:text-lg min-[125rem]:text-2xl text-white/90 max-w-md sm:max-w-lg min-[125rem]:max-w-2xl leading-relaxed font-normal">
              Where Solo Workers Meet Clients with Absolute Peace of Mind. Bank-grade biometric KYC before you meet, ghost proxy numbers, and
              automated cloud timers.
            </p>

            <div className="mk-hero-in cs-d5 mt-6 sm:mt-10 w-full sm:w-auto grid grid-cols-2 sm:flex sm:flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white text-[#111827] hover:bg-slate-100 text-[13px] sm:text-base font-bold transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <span>Start Protection</span>
                <ArrowUpRight className="w-4 h-4 text-[#111827] shrink-0" />
              </Link>
              <a
                href="#journey"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-4 sm:px-6 py-3.5 sm:py-4 rounded-full bg-[#00E08C] hover:bg-[#00f298] text-[#0B2545] text-[13px] sm:text-base font-bold transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <span className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#0B2545]/15 text-[#0B2545] flex items-center justify-center text-[9px] sm:text-[10px] shrink-0">
                  ▶
                </span>
                <span>How It Works</span>
              </a>
            </div>

            <div className="mk-hero-in cs-d6 sm:hidden mt-5 inline-flex items-center justify-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">
              <div className="flex -space-x-1.5 overflow-hidden">
                {AVATARS.slice(0, 3).map((src) => (
                  <img key={src} src={src} alt="" width={22} height={22} decoding="async" className="inline-block h-5.5 w-5.5 rounded-full ring-1 ring-white object-cover" />
                ))}
              </div>
              <div className="text-[11px] font-bold text-white leading-tight">
                <span>No app download</span>
                <span className="text-[#00E08C] ml-1.5">• Lone Worker Protection</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mk-hero-in cs-d6 hidden sm:flex absolute bottom-0 right-0 bg-white rounded-tl-[32px] sm:rounded-tl-[44px] pt-4 pl-6 pb-3 pr-6 sm:pt-5 sm:pl-8 sm:pb-4 sm:pr-8 items-center gap-3.5 z-20">
          <Fillet className="-top-7 right-0" />
          <Fillet className="-left-7 bottom-0" />
          <div className="flex -space-x-2.5 overflow-hidden">
            {AVATARS.map((src) => (
              <img key={src} src={src} alt="" width={36} height={36} decoding="async" className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover" />
            ))}
          </div>
          <div className="text-left">
            <div className="text-xs sm:text-sm font-bold text-[#111827]">Lone Worker Protection</div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#00E08C] animate-pulse" />
              <span>Independent UK Lone-Worker Sentinel</span>
            </div>
          </div>
        </div>
      </HeroCard>
    </section>
  );
}
