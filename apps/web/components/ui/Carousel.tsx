"use client";

import clsx from "clsx";
import { ReactNode, useRef } from "react";

import { Button } from "./Button";

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
      <path
        d="M14.5 18.5 8.5 12l6-6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
      <path
        d="m9.5 5.5 6 6.5-6 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CarouselProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  alignment?: "start" | "center" | "end";
};

export function Carousel({ children, className, ariaLabel, alignment = "start" }: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };


  return (
    <div className={clsx("relative", className)}>
      <div
        className={clsx(
          "no-scrollbar flex gap-3 overflow-x-auto scroll-smooth pr-10 py-6",
          {
            "justify-start": alignment === "start",
            "justify-center": alignment === "center",
            "justify-end": alignment === "end",
          },
        )}
        ref={scrollContainerRef}
        role="region"
        aria-label={ariaLabel}
      >
        {children}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-slate-50 via-slate-50/70 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-slate-50 via-slate-50/70 to-transparent" />

      <div className="absolute inset-y-0 left-2 flex items-center">
        <Button
          type="button"
          variant="secondary"
          className="pointer-events-auto rounded-full bg-white/5 px-2 py-2 shadow-lg ring-1 ring-white/20 hover:bg-white/10"
          aria-label="Scroll left"
          onClick={() => scrollBy("left")}
        >
          <ChevronLeftIcon />
        </Button>
      </div>

      <div className="absolute inset-y-0 right-4 flex items-center">
        <Button
          type="button"
          variant="secondary"
          className="pointer-events-auto rounded-full bg-white/5 px-2 py-2 shadow-lg ring-1 ring-white/20 hover:bg-white/10"
          aria-label="Scroll right"
          onClick={() => scrollBy("right")}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
}

export default Carousel;
