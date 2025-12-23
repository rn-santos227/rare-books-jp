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

}
