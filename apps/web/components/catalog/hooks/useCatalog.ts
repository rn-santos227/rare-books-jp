"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useFilters } from "@/hooks/useFilters";
import { Book } from "@/types/book";

const INITIAL_BATCH = 9;
const LOAD_MORE_BATCH = 6;

export function useCatalog(books: Book[]) {
  const { filters, filteredBooks, priceBounds, updateFilter, resetFilters } =
    useFilters(books);
  const [visibleCount, setVisibleCount] = useState(
    Math.min(INITIAL_BATCH, books.length),
  );
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const resetVisibleCount = () =>
    setVisibleCount(Math.min(INITIAL_BATCH, filteredBooks.length));

  const handleUpdateFilter = <Key extends keyof typeof filters>(
    key: Key,
    value: (typeof filters)[Key],
  ) => {
    resetVisibleCount();
    updateFilter(key, value);
  };

  const handleResetFilters = () => {
    resetVisibleCount();
    resetFilters();
  };

  const loadMore = useCallback(
    () =>
      setVisibleCount((current) =>
        Math.min(current + LOAD_MORE_BATCH, filteredBooks.length),
      ),
    [filteredBooks.length],
  );


  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

        loadMore();
      },
      { rootMargin: "200px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [filteredBooks.length, loadMore]);

  const displayedBooks = useMemo(
    () => filteredBooks.slice(0, visibleCount),
    [filteredBooks, visibleCount],
  );
  const hasMoreToShow = displayedBooks.length < filteredBooks.length;
  
  return {
    filters,
    filteredBooks,
    displayedBooks,
    priceBounds,
    hasMoreToShow,
    loadMore,
    updateFilter: handleUpdateFilter,
    resetFilters: handleResetFilters,
    loadMoreRef,
  };
}
