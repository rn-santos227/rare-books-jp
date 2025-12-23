"use client";

import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { FiltersState, useFilters } from "@/hooks/useFilters";
import { Book } from "@/types/book";

const INITIAL_BATCH = 9;
const LOAD_MORE_BATCH = 6;

type UseCatalogReturn = {
  filters: FiltersState;
  filteredBooks: Book[];
  displayedBooks: Book[];
  priceBounds: [number, number];
  hasMoreToShow: boolean;
  loadMore: () => void;
  updateFilter: <Key extends keyof FiltersState>(
    key: Key,
    value: FiltersState[Key],
  ) => void;
  resetFilters: () => void;
  loadMoreRef: RefObject<HTMLDivElement | null>;
};

export function useCatalog(
  books: Book[],
  initialFilters?: Partial<FiltersState>,
): UseCatalogReturn {
  const { filters, filteredBooks, priceBounds, updateFilter, resetFilters } = useFilters(
    books,
    initialFilters,
  );

  const [visibleCount, setVisibleCount] = useState(Math.min(INITIAL_BATCH, books.length));
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const resetVisibleCount = useCallback(() => {
    setVisibleCount(Math.min(INITIAL_BATCH, filteredBooks.length || books.length));
  }, [books.length, filteredBooks.length]);

  const handleUpdateFilter = useCallback(
    <Key extends keyof typeof filters>(key: Key, value: (typeof filters)[Key]) => {
      resetVisibleCount();
      updateFilter(key, value);
    },
    [resetVisibleCount, updateFilter],
  );

  const handleResetFilters = useCallback(() => {
    resetVisibleCount();
    resetFilters();
  }, [resetFilters, resetVisibleCount]);

  const loadMore = useCallback(() => {
    setVisibleCount((current) => Math.min(current + LOAD_MORE_BATCH, filteredBooks.length));
  }, [filteredBooks.length]);

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
  }, [loadMore]);

  const clampedVisibleCount = Math.min(visibleCount, filteredBooks.length || INITIAL_BATCH);
  const displayedBooks = useMemo(
    () => filteredBooks.slice(0, clampedVisibleCount),
    [clampedVisibleCount, filteredBooks],
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
