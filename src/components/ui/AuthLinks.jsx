"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/demoAuth";

const AUTH_PATHS = ["/login", "/signup"];

// While signed in, every link to sign-in or sign-up pages goes to the dashboard instead.
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
      router.push("/dashboard");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
