"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

const ToastContext = createContext({
  showToast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, variant = "info") => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-2), { id, message, variant }]);
      setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[390px] flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map((toast) => {
          const styles =
            toast.variant === "success"
              ? "bg-[#0B2545] text-white border-[#00E08C]/40"
              : toast.variant === "error"
              ? "bg-[#DC2626] text-white border-[#991B1B]"
              : "bg-[#0B2545] text-white border-white/10";

          const Icon =
            toast.variant === "success"
              ? CheckCircle2
              : toast.variant === "error"
              ? AlertTriangle
              : Info;

          return (
            <div
              key={toast.id}
              className={`cs-toast pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-[0_20px_40px_-15px_rgba(11,37,69,0.5)] text-sm font-medium ${styles}`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${toast.variant === "success" ? "text-[#00E08C]" : ""}`} />
              <span className="flex-1 leading-snug">{toast.message}</span>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
                className="p-1 opacity-70 hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
