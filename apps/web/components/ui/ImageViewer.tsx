"use client";

import { ReactNode } from "react";
import Image from "next/image";

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackLabel?: string | null;
  icon?: ReactNode;
};

export default function ImageViewer({
  src,
  alt,
  className,
  imgClassName,
  fallbackLabel = "Image coming soon",
  icon,
}: Props) {
  const iconNode =
    icon ?? (
      <span className="text-xl" role="img" aria-hidden>
        📕
      </span>
    );

  return (
    <div
      className={[
        "relative h-full w-full overflow-hidden rounded-xl bg-linear-to-br from-slate-100 via-white to-slate-200",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
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
    </div>
  );
}
