export const COMPANY_NAME = "CheckSafe Software Ltd";
export const BRAND_NAME = "CheckSafe";
export const PRIMARY_DOMAIN = "checksafeapp.com";
export const VERIFY_DOMAIN = "cs-idgate.com";

/**
 * Generates a single-use Client ID Verification URL on the unbranded secondary domain (cs-idgate.com).
 */
export function buildVerifyUrl(verifyToken) {
  const base =
    process.env.NEXT_PUBLIC_VERIFY_BASE_URL ?? `https://${VERIFY_DOMAIN}`;
  return `${base.replace(/\/$/, "")}/verify/${verifyToken}`;
}

export function isVerifyDomainHost(hostHeader) {
  if (!hostHeader) return false;
  const hostname = hostHeader.split(":")[0].toLowerCase().trim();
  return hostname === VERIFY_DOMAIN || hostname.endsWith(`.${VERIFY_DOMAIN}`);
}

export function isAllowedOnVerifyDomain(pathname) {
  if (pathname.startsWith("/verify/")) return true;
  if (pathname.startsWith("/_next/")) return true;
  if (pathname === "/favicon.ico") return true;
  return false;
}
