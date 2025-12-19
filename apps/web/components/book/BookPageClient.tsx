"use client";

import Link from "next/link";

import { BookHeader } from "@/components/book/BookHeader";
import { BookReviewSection } from "@/components/book/BookReviewSection";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";
import { Badge, Carousel, ImageViewer} from "@/components/ui";
import { FavoriteToggle } from "@/components/favorites/FavoriteToggle";
import { OrderInquiryForm } from "@/components/book/OrderInquiryForm";
import { useLanguage, useTranslations } from "@/context/LanguageContext";
import { getConditionLabel, getLocalizedText } from "@/lib/localization";
import { Book } from "@/types/book";
import { Review } from "@/types/review";

function formatPrice(price: number | null | undefined, fallback: string) {
  if (!price && price !== 0) return fallback;
  return `¥${price.toLocaleString()}`;
}

function InventoryBadge({
  inventory,
  inStockLabel,
  outOfStockLabel,
}: {
  inventory?: number | null;
  inStockLabel: (count: number) => string;
  outOfStockLabel: string;
}) {
  if (inventory === undefined || inventory === null) return null;

  const tone = inventory > 5 ? "success" : "warning";
  const label = inventory > 0 ? inStockLabel(inventory) : outOfStockLabel;

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
  const { language } = useLanguage();
  const t = useTranslations();
  const localizedTitle = getLocalizedText(language, book.title, book.titleJa);
  const localizedAuthor = getLocalizedText(language, book.author, book.authorJa);
  const localizedDescription = getLocalizedText(
    language,
    book.description,
    book.descriptionJa,
  ) || t.book.descriptionFallback;
  const localizedCategory = getLocalizedText(language, book.category?.name, book.category?.nameJa);
  const localizedGenres = book.genres?.map((genre) =>
    getLocalizedText(language, genre.name, genre.nameJa),
  );
  const heroImage = book.imageUrl ?? book.gallery?.[0];
  const heroAlt = book.coverAlt ?? localizedTitle;

  return (
    <PageLayout
      backgroundTone="plain"
      header={<BookHeader />}
      footer={<SiteFooter />}
      contentPadding="px-6 py-12"
      contentGap="gap-12"
    >
      <div className="flex flex-col gap-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="font-semibold text-indigo-700 hover:text-indigo-800">
            {t.book.breadcrumbHome}
          </Link>
          <span className="text-slate-400">/</span>
          <Link href="/catalog" className="font-semibold text-indigo-700 hover:text-indigo-800">
            {t.book.breadcrumbBooks}
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-500">{localizedTitle}</span>
        </nav>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(360px,420px)_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-50 shadow-sm ring-1 ring-slate-200 p-3">
              <div className="aspect-3/4 max-h-128">
                <ImageViewer
                  src={heroImage}
                  alt={heroAlt}
                  fallbackLabel={t.common.coverFallback}
                  className="h-full"
                  imgClassName="object-contain"
                />
              </div>
            </div>

            {book.gallery && book.gallery.length > 0 && (
              <Carousel ariaLabel={`${localizedTitle} gallery`} className="-mx-1 px-1">
                {book.gallery.map((url, index) => (
                  <div
                    key={url}
                    className="min-w-30 max-w-45 overflow-hidden rounded-2xl border border-slate-200 bg-white"
                  >

                    <div className="aspect-3/4">
                      <ImageViewer
                        src={url}
                        alt={`${localizedTitle} preview ${index + 1}`}
                        className="h-full"
                        imgClassName="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </Carousel>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-wrap items-center gap-3">
                {book.condition && <Badge tone="info">{getConditionLabel(language, book.condition)}</Badge>}
                <InventoryBadge
                  inventory={book.inventory}
                  inStockLabel={t.book.inventoryInStock}
                  outOfStockLabel={t.book.inventoryOutOfStock}
                />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-slate-900">{localizedTitle}</h1>
                <p className="text-lg text-slate-600">{localizedAuthor || t.common.unknownAuthor}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-500">{t.book.price}</p>
                  <p className="text-2xl font-bold text-slate-900">{formatPrice(book.price, t.book.contactForPrice)}</p>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <FavoriteToggle
                    book={book}
                    size="sm"
                    showLabel
                    activeLabel={t.favoritesMenu.title}
                    inactiveLabel={t.common.favorites}
                  />
                </div>
              </div>

              <p className="text-base leading-relaxed text-slate-700">
                {localizedDescription}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <DetailsList className="sm:col-span-2" label={t.book.category} value={localizedCategory} />
                <DetailsList
                  label={t.book.genre}
                  value={localizedGenres?.join(", ")}
                  className="sm:col-span-2"
                />
                <DetailsList label={t.book.condition} value={getConditionLabel(language, book.condition)} />
                <DetailsList label={t.book.inventory} value={book.inventory ?? t.book.inventoryUnknown} />
              </div>

              {book.featured && (
                <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 ring-1 ring-amber-100">
                  {t.book.featured}
                </div>
              )}
            </div>
            <OrderInquiryForm bookId={book._id} marketplaceUrl={book.marketplaceUrl} />
          </div>
        </div>
      </div>
      <BookReviewSection bookId={book._id} reviews={reviews} />
    </PageLayout>
  );
}
