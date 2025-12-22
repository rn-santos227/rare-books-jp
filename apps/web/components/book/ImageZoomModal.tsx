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
