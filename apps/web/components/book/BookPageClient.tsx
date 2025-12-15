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

export function BookPageClient({ book, reviews }: BookPageClientProps) {
  const heroImage = book.imageUrl ?? book.gallery?.[0];

  return (
    <PageLayout
      backgroundTone="plain"
      header={
        <GeneralHeaderLayout>
          <div className="flex items-center justify-between gap-4">
            <div className="text-lg font-semibold text-white">The Rare Books JP</div>
            <Link href="/" className="text-sm font-semibold text-indigo-100 transition hover:text-white">
              ← Back to catalog
            </Link>
          </div>
        </GeneralHeaderLayout>
      }
      footer={<SiteFooter />}
      contentPadding="px-6 py-12"
      contentGap="gap-12"
    >
      <div className="grid items-start gap-10 lg:grid-cols-[1fr,0.9fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl bg-slate-100 shadow-sm ring-1 ring-slate-200">
            <div className="aspect-3/4">
              <ImageViewer
                src={heroImage}
                alt={book.title}
                fallbackLabel="Cover coming soon"
                className="h-full"
                imgClassName="object-contain"
              />
            </div>
          </div>

          {book.gallery && book.gallery.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {book.gallery.slice(1, 4).map((url) => (
                <div key={url} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="aspect-3/4">
                    <ImageViewer src={url} alt={`${book.title} preview`} className="h-full" imgClassName="object-cover" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>     
      </div>
      <BookReviewSection bookId={book._id} reviews={reviews} />
    </PageLayout>
  )
}
