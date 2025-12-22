"use client";

import { ReactNode, KeyboardEvent } from "react";
import Image from "next/image";

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackLabel?: string | null;
  icon?: ReactNode;
  onClick?: () => void;
  actionLabel?: string;
  ariaLabel?: string;
};

export default function ImageViewer({
  src,
  alt,
  className,
  imgClassName,
  fallbackLabel = "Image coming soon",
  icon,
  onClick,
  actionLabel,
  ariaLabel,
}: Props) {
  const iconNode =
    icon ?? (
      <span className="text-xl" role="img" aria-hidden>
        📕
      </span>
    );

  const isInteractive = Boolean(onClick);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={[
        "group relative h-full w-full overflow-hidden rounded-xl bg-linear-to-br from-slate-100 via-white to-slate-200",
        isInteractive
          ? "cursor-zoom-in ring-offset-2 transition hover:ring-2 hover:ring-indigo-500 focus-visible:outline focus-visible:outline-indigo-500 focus-visible:outline-offset-2"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? ariaLabel ?? alt : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={["h-full w-full object-cover", imgClassName]
            .filter(Boolean)
            .join(" ")}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-indigo-50 via-white to-amber-50">
          <div className="flex flex-col items-center gap-2 text-center text-slate-500">
            <span className="flex h-12 w-10 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white shadow-inner">
              {iconNode}
            </span>
            {fallbackLabel && (
              <p className="text-xs font-semibold uppercase tracking-wide">
                {fallbackLabel}
              </p>
            )}
          </div>
        </div>
      )}

      {isInteractive && (
        <div className="pointer-events-none absolute inset-0 flex items-end justify-end bg-linear-to-t from-slate-900/20 via-transparent to-transparent p-3 opacity-0 transition duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          <div className="flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-lg backdrop-blur">
            <span aria-hidden>🔍</span>
            <span>{actionLabel ?? "View"}</span>
          </div>
        </div>
      )}
    </div>
  );
}
