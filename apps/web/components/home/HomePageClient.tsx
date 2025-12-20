"use client";

import { useMemo } from "react";

import { DiscoverySections } from "@/components/home/DiscoverySections";
import { Book } from "@/types/book";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";

type HomePageClientProps = {
  books: Book[];
  categories: Category[];
  genres: Genre[];
};

export function HomePageClient({ books, categories, genres }: HomePageClientProps) {
  const latestBooks = useMemo(
    () =>
      [...books]
        .sort(
          (a, b) =>
            new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
        )
        .slice(0, 6),
    [books],
  );

  return <DiscoverySections books={latestBooks} categories={categories} genres={genres} />;
}
