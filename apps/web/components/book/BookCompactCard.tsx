"use client";

import { Badge, Button, ImageViewer } from "@/components/ui";
import { FavoriteToggle } from "@/components/favorites/FavoriteToggle";
import { useBookCopy } from "./hooks/useBookCopy";
import { Book } from "@/types/book";

type BookCompactCardProps = {
  book: Book;
};

export function BookCompactCard({ book }: BookCompactCardProps) {
  const { t, title, categoryLabel } = useBookCopy(book);

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-slate-50 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <div className="aspect-3/4">
          <ImageViewer
            src={book.imageUrl}
            alt={title}
            fallbackLabel={t.common.coverFallback}
            className="h-full w-full"
            imgClassName="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute right-3 top-3">
          <FavoriteToggle book={book} size="sm" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent px-4 pb-4 pt-10 text-white">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex h-2 w-2 rounded-full bg-white" aria-hidden />
          {categoryLabel && <Badge tone="info" className="bg-white/90 text-slate-900">{categoryLabel}</Badge>}
        </div>
        <h3 className="text-base font-semibold leading-tight drop-shadow">{title}</h3>
        <Button
          variant="secondary"
          className="mt-2 bg-white/90 text-slate-900 hover:bg-white"
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
    </article>
  );
}
