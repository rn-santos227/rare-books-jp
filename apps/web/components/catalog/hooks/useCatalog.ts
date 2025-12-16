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

}
