"use client";

import { Badge, Button, ImageViewer } from "@/components/ui";
import { FavoriteToggle } from "@/components/favorites/FavoriteToggle";
import { formatPriceLabel, useBookCopy } from "./hooks/useBookCopy";
import { Book } from "@/types/book";

type BookListCardProps = {
  book: Book;
};

export function BookListCard({ book }: BookListCardProps) {
  const { t, title, author, description, conditionLabel, categoryLabel, genreLabels, inventoryLabel } =
    useBookCopy(book);


  return (
    <article className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md md:flex-row md:items-start">
      <div className="relative w-full overflow-hidden rounded-xl bg-slate-50 md:w-35">
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
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{author}</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {categoryLabel && <Badge tone="neutral">{categoryLabel}</Badge>}
              {genreLabels?.slice(0, 4).map((genre, index) => (
                <Badge key={`${book._id}-list-${index}`} tone="neutral">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm font-semibold text-slate-800">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
              {formatPriceLabel(book.price, t.common.askPrice)}
            </span>
            {inventoryLabel && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
                {inventoryLabel}
              </span>
            )}
            {book.condition && (
              <Badge tone="info" className="bg-slate-900 text-slate-100">
                {conditionLabel}
              </Badge>
            )}
          </div>
        </div> 

        <p className="line-clamp-3 text-sm text-slate-700">{description}</p>

        <div className="flex flex-wrap items-center gap-3">
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
          {genreLabels?.slice(4, 10).map((genre, index) => (
            <Badge key={`${book._id}-list-extra-${index}`} tone="neutral" className="bg-slate-50">
              {genre}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
