"use client";

import { Badge, Button, ImageViewer } from "@/components/ui";
import { FavoriteToggle } from "@/components/favorites/FavoriteToggle";
import { useBookCopy } from "./hooks/useBookCopy";
import { Book } from "@/types/book";

type BookCompactCardProps = {
  book: Book;
};


