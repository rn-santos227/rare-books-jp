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

function DetailsList({
  label,
  value,
  className,
}: {
  label: string;
  value?: string | number | null;
  className?: string;
}) {
  if (!value && value !== 0) return null;
  return (
    <div
      className={["flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm", className]
        .filter(Boolean)
        .join(" ")}
    >
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
  const heroAlt = book.coverAlt ?? book.title;

  return (
    <PageLayout
      backgroundTone="plain"
      header={
        <GeneralHeaderLayout>
          <div className="flex items-center justify-between gap-4">
            <div className="text-lg font-semibold text-white">The Rare Books JP</div>
            <Link href="/catalog" className="text-sm font-semibold text-indigo-100 transition hover:text-white">
              Back to Catalog
            </Link>
          </div>
        </GeneralHeaderLayout>
      }
      footer={<SiteFooter />}
      contentPadding="px-6 py-12"
      contentGap="gap-12"
    >
      <div className="flex flex-col gap-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="font-semibold text-indigo-700 hover:text-indigo-800">
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <Link href="/catalog" className="font-semibold text-indigo-700 hover:text-indigo-800">
            Books
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-500">{book.title}</span>
        </nav>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(360px,420px)_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-50 shadow-sm ring-1 ring-slate-200 p-3">
              <div className="aspect-3/4 max-h-128">
                <ImageViewer
                  src={heroImage}
                  alt={heroAlt}
                  fallbackLabel="Cover coming soon"
                  className="h-full"
                  imgClassName="object-contain"
                />
              </div>
            </div>

            {book.gallery && book.gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {book.gallery.slice(0, 3).map((url, index) => (
                  <div key={url} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="aspect-3/4">
                      <ImageViewer
                        src={url}
                        alt={`${book.title} preview ${index + 1}`}
                        className="h-full"
                        imgClassName="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-wrap items-center gap-3">
                {book.condition && <Badge tone="info">{book.condition.replace("_", " ")}</Badge>}
                <InventoryBadge inventory={book.inventory} />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-slate-900">{book.title}</h1>
                <p className="text-lg text-slate-600">{book.author ?? "Unknown author"}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-500">Price</p>
                  <p className="text-2xl font-bold text-slate-900">{formatPrice(book.price)}</p>
                </div>
                <Button className="px-6">Add to cart</Button>
              </div>

              <p className="text-base leading-relaxed text-slate-700">
                {book.description || "A detailed description from the curator will be added soon."}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <DetailsList className="sm:col-span-2" label="Category" value={book.category?.name} />
                <DetailsList
                  label="Genre"
                  value={book.genres?.map((genre) => genre.name).join(", ")}
                  className="sm:col-span-2"
                />
                <DetailsList label="Condition" value={book.condition?.replace("_", " ")} />
                <DetailsList label="Inventory" value={book.inventory ?? "N/A"} />
              </div>

              {book.featured && (
                <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 ring-1 ring-amber-100">
                  Featured pick from our collection
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BookReviewSection bookId={book._id} reviews={reviews} />
    </PageLayout>
  )
}
