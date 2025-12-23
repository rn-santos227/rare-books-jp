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

}
