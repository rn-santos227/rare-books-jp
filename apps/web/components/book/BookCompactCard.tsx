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
    </article>
  );
}
