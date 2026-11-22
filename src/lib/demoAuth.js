"use client";
import { useSyncExternalStore } from "react";

// Frontend-only demo login. Replace with Supabase Auth when the backend is connected.
export const DEMO_USER = { email: "user@gmail.com", password: "user" };

const KEY = "cs-demo-session";
const SIGNOUT_KEY = "cs-demo-signed-out";
const listeners = new Set();

function notify() {
  listeners.forEach((l) => l());
}

function subscribe(cb) {
  listeners.add(cb);
  const onStorage = (e) => {
    if (e.key === KEY || e.key === SIGNOUT_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function read() {
  try {
    const existing = localStorage.getItem(KEY);
    if (existing) return existing;
    if (sessionStorage.getItem(SIGNOUT_KEY) === "1") return null;
    const defaultSession = JSON.stringify({ email: DEMO_USER.email });
    localStorage.setItem(KEY, defaultSession);
    return defaultSession;
  } catch {
    return JSON.stringify({ email: DEMO_USER.email });
  }
}

function write(value) {
  try {
    if (value) {
      sessionStorage.removeItem(SIGNOUT_KEY);
      localStorage.setItem(KEY, value);
    } else {
      sessionStorage.setItem(SIGNOUT_KEY, "1");
      localStorage.removeItem(KEY);
    }
  } catch {}
  notify();
}

export function signIn(email, password) {
  const ok = email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password;
  if (ok) write(JSON.stringify({ email: DEMO_USER.email }));
  return ok;
}

export function startSession(email) {
  write(JSON.stringify({ email: email.trim().toLowerCase() }));
}

export function signOut() {
  write(null);
}

export function safeNext(next, fallback = "/dashboard") {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : fallback;
}

export function isLoggedIn() {
  return !!read();
}

export function useIsLoggedIn() {
  return useSyncExternalStore(subscribe, isLoggedIn, () => false);
}

export function useSession() {
  const raw = useSyncExternalStore(subscribe, read, () => undefined);
  if (raw === undefined) return { status: "loading", user: null };
  if (!raw) return { status: "out", user: null };
  try {
    return { status: "in", user: JSON.parse(raw) };
  } catch {
    return { status: "out", user: null };
  }
}
