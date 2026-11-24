import React from "react";

export const CHECKSAFE_TAGLINE = ["Client screening", "Masked numbers", "Solo worker safety"];

export function CheckSafeIcon({ className = "w-8 h-8", darkSurface = false }) {
  const src = darkSurface ? "/checksafe-shield-white.png" : "/checksafe-shield.png";
  return (
    <img
      src={src}
      alt="CheckSafe"
      className={`${className} object-contain inline-block shrink-0`}
      loading="eager"
    />
  );
}

const SIZES = {
  // icon, wordmark, tagline (phone → wider screens)
  sm: { icon: "h-9 w-9 sm:h-10 sm:w-10", name: "text-[19px] sm:text-[21px]", tag: "text-[8px]" },
  md: { icon: "h-11 w-11", name: "text-[23px] sm:text-2xl", tag: "text-[8px] sm:text-[9px]" },
  lg: { icon: "h-12 w-12", name: "text-[26px]", tag: "text-[9px]" },
  xl: { icon: "h-14 w-14", name: "text-3xl", tag: "text-[10px]" },
};

/**
 * Logo lockup: shield, "CheckSafe" (Check navy, Safe green) and the tagline underneath.
 * On phones the tagline stacks one item per line so it stays legible next to header buttons.
 */
export function CheckSafeLogo({
  showTagline = true,
  darkSurface = false,
  iconOnly = false,
  size = "md",
  className = "",
}) {
  const s = SIZES[size] || SIZES.md;

  if (iconOnly) {
    return <CheckSafeIcon className={`${s.icon} ${className}`} darkSurface={darkSurface} />;
  }

  return (
    <span className={`inline-flex items-center gap-2 sm:gap-2.5 min-w-0 font-sans normal-case ${className}`}>
      <CheckSafeIcon className={s.icon} darkSurface={darkSurface} />
      <span className="flex flex-col min-w-0">
        <span
          className={`${s.name} font-extrabold tracking-[-0.03em] leading-none ${
            darkSurface ? "text-white" : "text-[#0B2545]"
          }`}
        >
          Check<span className="text-[#00E08C]">Safe</span>
        </span>
        {showTagline && (
          <span
            className={`${s.tag} mt-[0.45em] font-semibold uppercase tracking-[0.1em] leading-[1.35] sm:leading-[1.45] ${
              darkSurface ? "text-slate-300" : "text-[#0B2545]/80"
            }`}
          >
            <span className="sr-only">{CHECKSAFE_TAGLINE.join(", ")}</span>
            {/* Phones: one item per line. Wider screens: one line with • separators. */}
            <span aria-hidden="true" className="block sm:whitespace-nowrap">
              {CHECKSAFE_TAGLINE.map((t, i) => (
                <React.Fragment key={t}>
                  {i > 0 && <span className="hidden sm:inline mx-[0.45em]">•</span>}
                  <span className="block sm:inline whitespace-nowrap">{t}</span>
                </React.Fragment>
              ))}
            </span>
          </span>
        )}
      </span>
    </span>
  );
}
