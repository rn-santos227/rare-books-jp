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

    </article>
  );
}
