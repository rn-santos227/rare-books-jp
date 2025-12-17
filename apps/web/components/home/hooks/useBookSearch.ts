"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Book } from "@/types/book";

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 200;

export function useBookSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = useCallback(async (term: string, signal: AbortSignal) => {
    try {
      const response = await fetch(`/api/books/search?q=${encodeURIComponent(term)}`, {
        signal,
      });

      if (!response.ok) {
        throw new Error("Unable to fetch search suggestions.");
      }

      const data = (await response.json()) as { results?: Book[] };
      setSuggestions(data.results ?? []);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setSuggestions([]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery.length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setIsLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    setIsLoading(true);

    const timeoutId = window.setTimeout(() => {
      void fetchSuggestions(normalizedQuery, controller.signal);
    }, DEBOUNCE_MS);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [fetchSuggestions, query]);

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
    isLoading,
    suggestions,
    handleSelect,
    handleSubmit,
  };
}
