"use client";

import { Badge, Button, ImageViewer } from "@/components/ui";
import { FavoriteToggle } from "@/components/favorites/FavoriteToggle";
import { formatPriceLabel, useBookCopy } from "./hooks/useBookCopy";
import { Book } from "@/types/book";

type BookPanelCardProps = {
  book: Book;
};

export function BookPanelCard({ book }: BookPanelCardProps) {
  const { t, title, author, description, conditionLabel, categoryLabel, genreLabels, inventoryLabel } =
    useBookCopy(book);

  return (
    <article className="grid gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md md:grid-cols-[220px,1fr]">
      <div className="relative overflow-hidden rounded-xl bg-slate-50">
        <div className="aspect-3/4">
          <ImageViewer
            src={book.imageUrl}
            alt={title}
            fallbackLabel={t.common.coverFallback}
            className="h-full w-full"
            imgClassName="object-cover"
          />
        </div>
        <div className="absolute right-3 top-3">
          <FavoriteToggle book={book} size="sm" />
        </div>
        <div className="absolute inset-x-0 bottom-3 flex flex-wrap items-center justify-between gap-2 px-3 text-xs font-semibold text-white drop-shadow">
          <span className="rounded-full bg-linear-to-r from-[#111827] to-[#1f2937] px-3 py-1">
            {formatPriceLabel(book.price, t.common.askPrice)}
          </span>
          {inventoryLabel && (
            <span className="rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white shadow-sm ring-1 ring-white/20">
              {inventoryLabel}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{author}</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {categoryLabel && <Badge tone="neutral">{categoryLabel}</Badge>}
              {genreLabels?.slice(0, 5).map((genre, index) => (
                <Badge key={`${book._id}-panel-genre-${index}`} tone="neutral">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm font-semibold text-slate-800">
            {book.condition && (
              <Badge tone="info" className="bg-slate-900 text-slate-100">
                {conditionLabel}
              </Badge>
            )}
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
              {formatPriceLabel(book.price, t.common.askPrice)}
            </span>
          </div>
        </div>

        <p className="line-clamp-4 text-sm leading-relaxed text-slate-700">{description}</p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center">
          <div className="rounded-xl bg-slate-50 p-3 text-xs font-semibold text-slate-600">
            <span className="block text-[11px] uppercase tracking-wide text-slate-400">{t.book.category}</span>
            {categoryLabel || t.common.loading}
          </div>
          <div className="rounded-xl bg-slate-50 p-3 text-xs font-semibold text-slate-600">
            <span className="block text-[11px] uppercase tracking-wide text-slate-400">{t.book.condition}</span>
            {book.condition ? conditionLabel : t.common.loading}
          </div>
          <div className="rounded-xl bg-slate-50 p-3 text-xs font-semibold text-slate-600">
            <span className="block text-[11px] uppercase tracking-wide text-slate-400">{t.book.inventory}</span>
            {inventoryLabel ?? t.book.inventoryUnknown}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2 text-xs text-slate-500">
            {genreLabels?.slice(5, 10).map((genre, index) => (
              <Badge key={`${book._id}-panel-extra-${index}`} tone="neutral">
                {genre}
              </Badge>
            ))}
          </div>
          <Button
            variant="secondary"
            href={book.slug ? `/books/${book.slug}` : "#"}
            aria-disabled={!book.slug}
            onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
              if (!book.slug) {
                event.preventDefault();
              }
            }}
          >
            {t.common.viewDetails}
          </Button>
        </div>
      </div>
    </article>
  );
}
