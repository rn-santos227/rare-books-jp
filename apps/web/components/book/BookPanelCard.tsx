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
      </div>
    </article>
  );
}
