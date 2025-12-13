"use client";

import { useCallback, useMemo, useState } from "react";

export type ToastTone = "success" | "info" | "warning" | "danger";

export type Toast = {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
};

const toneStyles: Record<ToastTone, string> = {
  success: "bg-emerald-600",
  info: "bg-indigo-600",
  warning: "bg-amber-500",
  danger: "bg-rose-600",
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (toast: Omit<Toast, "id"> & { duration?: number }) => {
      const id = crypto.randomUUID();
      const entry: Toast = { ...toast, id };
      setToasts((prev) => [...prev, entry]);
      if (toast.duration !== 0) {
        const timeout = setTimeout(() => dismiss(id), toast.duration ?? 3200);
        return () => clearTimeout(timeout);
      }
      return undefined;
    },
    [dismiss],
  );

  const api = useMemo(
    () => ({
      toasts,
      show,
      dismiss,
      toneStyles,
    }),
    [dismiss, show, toasts],
  );

  return api;
}
