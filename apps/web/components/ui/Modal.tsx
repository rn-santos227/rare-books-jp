"use client";

import { ReactNode, useEffect, useId } from "react";
import { createPortal } from "react-dom";

import clsx from "clsx";

type ModalSize = "sm" | "md" | "lg";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
};

const sizeStyles: Record<ModalSize, string> = {
  sm: "max-w-xl",
  md: "max-w-2xl",
  lg: "max-w-4xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10 sm:px-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="modal-overlay absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        className={clsx(
          "modal-content relative w-full rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200",
          "overflow-hidden border border-white/40",
          sizeStyles[size],
        )}
      >
        <div className="flex items-start gap-3 border-b border-slate-100 px-6 py-4">
          <div className="flex-1 space-y-1">
            {title && <h2 id={titleId} className="text-lg font-semibold text-slate-900">{title}</h2>}
            {description && (
              <p id={descriptionId} className="text-sm text-slate-600">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            aria-label="Close"
          >
            <span aria-hidden className="text-xl leading-none">&times;</span>
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">{children}</div>

        {footer && <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
