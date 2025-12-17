"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Book } from "@/types/book";

export function useBookSearch(books: Book[]) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [] as Book[];
    }

    return books
      .filter((book) => Boolean(book.slug))
      .filter((book) => {
        const englishTitle = book.title?.toLowerCase() ?? "";
        const japaneseTitle = book.titleJa?.toLowerCase() ?? "";
        return (
          englishTitle.includes(normalizedQuery) ||
          japaneseTitle.includes(normalizedQuery)
        );
      })
      .slice(0, 8);
  }, [books, query]);

  const handleSelect = useCallback(
    (book: Book) => {
      if (!book.slug) return;
      setQuery("");
      setIsFocused(false);
      router.push(`/books/${book.slug}`);
    },
    [router],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (suggestions[0]) {
        handleSelect(suggestions[0]);
      }
    },
    [handleSelect, suggestions],
  );

  return {
    query,
    setQuery,
    isFocused,
    setIsFocused,
    suggestions,
    handleSelect,
    handleSubmit,
  };
}
