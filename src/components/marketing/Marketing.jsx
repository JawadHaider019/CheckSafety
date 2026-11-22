import Image from "next/image";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";

export const WRAP = "max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10";
export const H2 = "text-[clamp(2.25rem,5vw,4.25rem)] font-semibold tracking-[-0.035em] leading-[1.02] text-balance";
export const H2_SM = "text-[clamp(1.875rem,3.6vw,3rem)] font-semibold tracking-[-0.03em] leading-[1.05] text-balance";

export function Eyebrow({ children, dark = false }) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-[11px] font-mono font-semibold tracking-[0.2em] uppercase ${
        dark ? "text-[#00E08C]" : "text-emerald-700"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dark ? "bg-[#00E08C]" : "bg-emerald-600"}`} />
      {children}
    </p>
  );
}

export function Accent({ children, dark = false }) {
  return <span className={`mk-accent font-serif italic font-normal ${dark ? "text-[#00E08C]" : ""}`}>{children}</span>;
}

export function PageHero({ eyebrow, title, accent, lead, image, imagePosition = "center", children }) {
  return (
    <section className="pt-[76px] sm:pt-[84px] px-2.5 sm:px-4 lg:px-6">
      <div className={`relative overflow-hidden rounded-[28px] sm:rounded-[40px] text-white ${image ? "bg-[#07182E]" : "navy-grid"}`}>
        {image && (
          <>
            <div aria-hidden="true" className="hero-bg-in absolute inset-0">
              <Image
                src={image}
                alt=""
                fill
                preload
                fetchPriority="high"
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: imagePosition }}
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-r from-[#07182E]/95 via-[#0B2545]/85 to-[#0B2545]/70 sm:via-[#0B2545]/75 sm:to-[#0B2545]/25"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-black/30" />
          </>
        )}
        <div
          aria-hidden="true"
          className="absolute -right-64 -bottom-72 w-[760px] h-[760px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(0,224,140,0.14), rgba(0,224,140,0))" }}
        />
        <div className={`${WRAP} relative py-16 sm:py-24 lg:py-28`}>
          <div className="mk-hero-in">
            <Eyebrow dark>{eyebrow}</Eyebrow>
          </div>
          <h1 className="mk-hero-text mt-5 max-w-[16ch] text-[clamp(2.5rem,6vw,5.25rem)] font-semibold tracking-[-0.04em] leading-[1.0] text-balance">
            {title} <Accent dark>{accent}</Accent>
          </h1>
          {lead && (
            <p className="mk-hero-in cs-d3 mt-6 max-w-[58ch] text-base sm:text-lg text-slate-300 leading-relaxed">{lead}</p>
          )}
          {children && <div className="mk-hero-in cs-d5 mt-10">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function MarketingPage({ active, children }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-[#0B2545] focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader activePage={active} />
      <main id="main" className="bg-white text-[#0B2545] overflow-x-clip">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
