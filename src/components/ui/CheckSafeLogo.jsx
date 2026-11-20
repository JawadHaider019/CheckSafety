import React from "react";

export function CheckSafeIcon({
  className = "w-8 h-8",
  darkSurface = false,
}) {
  const src = darkSurface
    ? "/checksafe-shield-white.png"
    : "/checksafe-shield.png";

  return (
    <img
      src={src}
      alt="Checksafe Shield"
      className={`${className} object-contain inline-block shrink-0`}
      loading="eager"
    />
  );
}

export function CheckSafeLogo({
  showTagline = false,
  darkSurface = false,
  iconOnly = false,
  size = "md",
  className = "",
}) {
  const iconHeight =
    size === "xl"
      ? "h-11 w-11"
      : size === "lg"
        ? "h-9 w-9"
        : size === "sm"
          ? "h-7 w-7"
          : "h-8 w-8";

  const textSize =
    size === "xl"
      ? "text-3xl"
      : size === "lg"
        ? "text-2xl"
        : size === "sm"
          ? "text-lg sm:text-xl"
          : "text-xl sm:text-2xl";

  const src = darkSurface
    ? "/checksafe-shield-white.png"
    : "/checksafe-shield.png";

  if (iconOnly) {
    return (
      <CheckSafeIcon className={`${iconHeight} ${className}`} darkSurface={darkSurface} />
    );
  }

  return (
    <div className={`inline-flex flex-col ${showTagline ? "items-start" : "items-center"} ${className}`}>
      <div className="inline-flex items-center gap-2.5">
        <img
          src={src}
          alt="Checksafe"
          className={`${iconHeight} object-contain shrink-0`}
          loading="eager"
        />
        <span className={`font-black tracking-tight ${textSize} ${darkSurface ? "text-white" : "text-[#0B2545]"}`}>
          Check<span className="text-[#00E08C]">safe</span>
        </span>
      </div>

      {showTagline && (
        <div className="mt-2 flex items-center gap-2 text-[9px] sm:text-[10px] font-extrabold tracking-[0.14em] uppercase">
          <span className={`h-px w-5 ${darkSurface ? "bg-white/30" : "bg-slate-300"}`} />
          <span className={darkSurface ? "text-slate-300 font-semibold" : "text-slate-600 font-semibold"}>
            CLIENT SCREENING • MASKED NUMBERS • SOLO WORKER SAFETY
          </span>
          <span className={`h-px w-5 ${darkSurface ? "bg-white/30" : "bg-slate-300"}`} />
        </div>
      )}
    </div>
  );
}

