"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/demoAuth";

const AUTH_PATHS = ["/login", "/signup"];

// While signed in, links to sign-in or sign-up pages go to the dashboard instead.
// Plan buttons (/signup?plan=…) open the dashboard's Change plan sheet for that plan,
// so a signed-in user never creates a second account.
export function AuthLinks() {
  const router = useRouter();

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!anchor || !isLoggedIn()) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || !AUTH_PATHS.includes(url.pathname)) return;
      e.preventDefault();
      const plan = url.pathname === "/signup" ? url.searchParams.get("plan") : null;
      router.push(plan ? `/dashboard?plan=${encodeURIComponent(plan)}` : "/dashboard");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
