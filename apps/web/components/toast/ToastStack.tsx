"use client";

import { Toast, ToastTone } from "./hooks/useToast";

type ToastStackProps = {
  toasts: Toast[];
  dismiss: (id: string) => void;
  toneStyles: Record<ToastTone, string>;
};

export function ToastStack({ toasts, dismiss, toneStyles }: ToastStackProps) {
  return (
    <div className="fixed right-4 top-4 z-50 flex w-80 flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${toneStyles[toast.tone]} flex flex-col gap-1 rounded-xl px-4 py-3 text-white shadow-lg shadow-gray-900/20`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.description ? (
                <p className="text-xs text-white/80">{toast.description}</p>
              ) : null}
            </div>
            <button
              aria-label="Dismiss notification"
              className="rounded-full p-1 text-xs hover:bg-white/10"
              onClick={() => dismiss(toast.id)}
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
