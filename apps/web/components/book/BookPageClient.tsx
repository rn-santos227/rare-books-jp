"use client";

import Link from "next/link";

import { BookReviewSection } from "@/components/book/BookReviewSection";
import { GeneralHeaderLayout } from "@/components/layouts/GeneralHeaderLayout";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import ImageViewer from "@/components/ui/ImageViewer";
import { Book } from "@/types/book";
import { Review } from "@/types/review";

function formatPrice(price?: number | null) {
  if (!price && price !== 0) return "Contact for price";
  return `¥${price.toLocaleString()}`;
}

function InventoryBadge({ inventory }: { inventory?: number | null }) {
  if (inventory === undefined || inventory === null) return null;

  const tone = inventory > 5 ? "success" : "warning";
  const label = inventory > 0 ? `${inventory} in stock` : "Out of stock";

  return (
    <Badge tone={tone} className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide">
      {label}
    </Badge>
  );
}

function DetailsList({ label, value }: { label: string; value?: string | number | null }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
      <span className="font-medium text-slate-600">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}

type BookPageClientProps = {
  book: Book;
  reviews: Review[];
};


