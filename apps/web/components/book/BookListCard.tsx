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

}
