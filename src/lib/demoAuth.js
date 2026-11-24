"use client";
import { useSyncExternalStore } from "react";

// Frontend-only demo login. Replace with Supabase Auth when the backend is connected.
export const DEMO_USER = { email: "user@gmail.com", password: "user" };

const KEY = "cs-demo-session";
const listeners = new Set();

function notify() {
  listeners.forEach((l) => l());
}

function subscribe(cb) {
  listeners.add(cb);
  const onStorage = (e) => {
    if (e.key === KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

// Signed out by default: a session exists only after signIn() or startSession().
function read() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function write(value) {
  try {
    if (value) localStorage.setItem(KEY, value);
    else localStorage.removeItem(KEY);
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
