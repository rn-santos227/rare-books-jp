"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { Modal } from "@/components/ui";

type ImageZoomModalProps = {
  open: boolean;
  imageUrl?: string | null;
  alt: string;
  title: string;
  helperText: string;
  zoomLabel: string;
  zoomInLabel: string;
  zoomOutLabel: string;
  resetLabel: string;
  onClose: () => void;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

export function ImageZoomModal({
  open,
  imageUrl,
  alt,
  title,
  helperText,
  zoomLabel,
  zoomInLabel,
  zoomOutLabel,
  resetLabel,
  onClose,
}: ImageZoomModalProps) {
  const [zoom, setZoom] = useState(1.1);
  const handleZoomChange = (value: number) => {
    const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
    setZoom(Number(clamped.toFixed(2)));
  };

  const zoomControlsDisabled = useMemo(
    () => ({
      out: zoom <= MIN_ZOOM,
      in: zoom >= MAX_ZOOM,
    }),
    [zoom],
  );

  return (
    <Modal open={open} onClose={onClose} title={title} size="lg">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
          <p className="text-sm text-slate-600">{helperText}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{zoomLabel}</span>
            <button
              type="button"
              onClick={() => handleZoomChange(zoom - ZOOM_STEP)}
              disabled={zoomControlsDisabled.out}
              className="h-9 w-9 rounded-full border border-slate-200 bg-white text-lg font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700 disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-300"
              aria-label={zoomOutLabel}
            >
              –
            </button>
            <input
              type="range"
              min={MIN_ZOOM}
              max={MAX_ZOOM}
              step={ZOOM_STEP}
              value={zoom}
              onChange={(event) => handleZoomChange(Number(event.target.value))}
              aria-label={zoomLabel}
              className="h-1 w-32 cursor-pointer appearance-none rounded-full bg-slate-200 accent-indigo-600"
            />
            <button
              type="button"
              onClick={() => handleZoomChange(zoom + ZOOM_STEP)}
              disabled={zoomControlsDisabled.in}
              className="h-9 w-9 rounded-full border border-slate-200 bg-white text-lg font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700 disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-300"
              aria-label={zoomInLabel}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => handleZoomChange(1.1)}
              className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700"
            >
              {resetLabel}
            </button>
          </div>


        </div>
      </div>
    </Modal>
  );
}
