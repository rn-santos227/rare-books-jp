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

}
