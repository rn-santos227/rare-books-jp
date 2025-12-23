"use client";

import { Badge, Button, ImageViewer } from "@/components/ui";
import { FavoriteToggle } from "@/components/favorites/FavoriteToggle";
import { useBookCopy } from "./hooks/useBookCopy";
import { Book } from "@/types/book";

type BookPanelCardProps = {
  book: Book;
};

export function BookPanelCard({ book }: BookPanelCardProps) {
  const { title, author, description, categoryLabel, genreLabels, inventoryLabel, t } =
    useBookCopy(book);

  return (
    <article className="flex gap-4 rounded-lg bg-white p-3 ring-1 ring-slate-100 hover:shadow-sm">
      <div className="relative w-32 shrink-0 overflow-hidden rounded-md bg-slate-50">
        <div className="aspect-3/4">
          <ImageViewer
            src={book.imageUrl}
            alt={title}
            fallbackLabel={t.common.coverFallback}
            className="h-full w-full"
            imgClassName="object-cover"
          />
        </div>

        <div className="absolute right-1 top-1">
          <FavoriteToggle book={book} size="sm" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              <span className="truncate">
                {inventoryLabel ?? categoryLabel}
              </span>
            </div>

            <h3 className="truncate text-sm font-semibold text-slate-900">
              {title}
            </h3>

            <p className="truncate text-[11px] uppercase tracking-wide text-slate-500">
              {author}
            </p>
          </div>
        </div>

        <div className="flex gap-4 text-xs text-slate-500">
          <p className="line-clamp-3 text-sm text-slate-700">{description}</p>
        </div>

        <div className="flex flex-wrap gap-1">
          {genreLabels?.slice(0, 4).map((genre, index) => (
            <Badge
              key={`${book._id}-genre-${index}`}
              tone="neutral"
              className="px-2 py-0.5 text-[10px]"
            >
              {genre}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
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
