"use client";

import clsx from "clsx";
import { Children, ReactNode, useEffect, useMemo, useState } from "react";

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

type SlideShowProps = {
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
  autoAdvanceMs?: number;
  showIndicators?: boolean;
};

export function SlideShow({
  children,
  ariaLabel,
  className,
  autoAdvanceMs = 8000,
  showIndicators = true,
}: SlideShowProps) {
  const slides = useMemo(() => Children.toArray(children), [children]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const clampedActiveIndex = slides.length ? Math.min(activeIndex, slides.length - 1) : 0;

  useEffect(() => {
    if (slides.length <= 1 || autoAdvanceMs <= 0 || isPaused) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, autoAdvanceMs);

    return () => window.clearInterval(timer);
  }, [slides.length, autoAdvanceMs, isPaused]);

  const move = (direction: "previous" | "next") => {
    if (slides.length === 0) return;

    setActiveIndex((index) => {
      if (direction === "previous") {
        return (index - 1 + slides.length) % slides.length;
      }
      return (index + 1) % slides.length;
    });
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div
      className={clsx("relative", className)}
      role="region"
      aria-label={ariaLabel}
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${clampedActiveIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full">
              <div
                className={clsx("h-full", {
                  "pointer-events-none opacity-0": clampedActiveIndex !== index,
                  "opacity-100": clampedActiveIndex === index,
                })}
                aria-hidden={clampedActiveIndex !== index}
              >
                {slide}
              </div>
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
            <Button
              type="button"
              variant="secondary"
              className="pointer-events-auto rounded-full bg-white/10 px-3 py-2 text-white shadow-lg ring-1 ring-white/25 hover:bg-white/20"
              aria-label="Previous slide"
              onClick={() => move("previous")}
            >
              <ChevronLeftIcon />
            </Button>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <Button
              type="button"
              variant="secondary"
              className="pointer-events-auto rounded-full bg-white/10 px-3 py-2 text-white shadow-lg ring-1 ring-white/25 hover:bg-white/20"
              aria-label="Next slide"
              onClick={() => move("next")}
            >
              <ChevronRightIcon />
            </Button>
          </div>

          {showIndicators ? (
            <div className="mt-4 flex justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={clsx(
                    "h-2.5 w-2.5 rounded-full border border-white/30 transition",
                    clampedActiveIndex === index
                      ? "bg-white shadow-[0_0_0_3px_rgba(255,255,255,0.25)]"
                      : "bg-white/30",
                  )}
                />
              ))}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

export default SlideShow;
