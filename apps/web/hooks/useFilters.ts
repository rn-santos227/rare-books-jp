"use client";

import { useMemo, useState } from "react";
import { Book } from "@/types/book";

export type FiltersState = {
  searchQuery: string;
  categoryId: string | null;
  genreId: string | null;
  condition: string | null;
  priceRange: [number, number];
};

const DEFAULT_MAX_PRICE = 500000;

function computePriceBounds(books: Book[]): [number, number] {
  const prices = books
    .map((book) => book.price ?? 0)
    .filter((price) => price > 0);

  if (!prices.length) {
    return [0, DEFAULT_MAX_PRICE];
  }

  return [Math.min(...prices), Math.max(...prices)];
}

export function useFilters(books: Book[]) {
  const [filters, setFilters] = useState<FiltersState>(() => ({
    searchQuery: "",
    categoryId: null,
    genreId: null,
    condition: null,
    priceRange: computePriceBounds(books),
  }));

  const priceBounds = useMemo(() => computePriceBounds(books), [books]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = filters.searchQuery
        ? `${book.title} ${book.titleJa ?? ""} ${book.author ?? ""} ${book.description ?? ""} ${book.descriptionJa ?? ""}`
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase())
        : true;

      const matchesCategory = filters.categoryId
        ? book.category?._id === filters.categoryId
        : true;

      const matchesGenre = filters.genreId
        ? book.genres?.some((genre) => genre._id === filters.genreId)
        : true;

      const matchesCondition = filters.condition
        ? book.condition === filters.condition
        : true;

      const [minPrice, maxPrice] = filters.priceRange;
      const bookPrice = book.price ?? 0;
      const matchesPrice = bookPrice >= minPrice && bookPrice <= maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesGenre &&
        matchesCondition &&
        matchesPrice
      );
    });
  }, [books, filters]);

  const updateFilter = <Key extends keyof FiltersState>(
    key: Key,
    value: FiltersState[Key],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () =>
    setFilters((prev) => ({
      ...prev,
      searchQuery: "",
      categoryId: null,
      genreId: null,
      condition: null,
      priceRange: priceBounds,
    }));

  return {
    filters,
    filteredBooks,
    priceBounds,
    updateFilter,
    resetFilters,
  };
}
