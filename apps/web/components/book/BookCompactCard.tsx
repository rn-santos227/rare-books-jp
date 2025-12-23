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
      
    </article>
  );
}
