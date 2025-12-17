"use client";

import { useMemo, useState } from "react";
import { Book } from "@/types/book";

type LogicalOperator = "any" | "all";

type GroupFilters = {
  include: string[];
  exclude: string[];
  mode: LogicalOperator;
};

export type FiltersState = {
  searchQuery: string;
  categories: GroupFilters;
  genres: GroupFilters;
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
  const initialGroup: GroupFilters = {
    include: [],
    exclude: [],
    mode: "any",
  };

  const [filters, setFilters] = useState<FiltersState>(() => ({
    searchQuery: "",
    categories: { ...initialGroup },
    genres: { ...initialGroup },
    condition: null,
    priceRange: computePriceBounds(books),
  }));

  const matchesGroup = (
    values: string[],
    group: GroupFilters,
  ) => {
    const passesInclude =
      group.include.length === 0
        ? true
        : group.mode === "all"
          ? group.include.every((id) => values.includes(id))
          : group.include.some((id) => values.includes(id));

    const passesExclude =
      group.exclude.length === 0
        ? true
        : !group.exclude.some((id) => values.includes(id));

    return passesInclude && passesExclude;
  };

  const priceBounds = useMemo(() => computePriceBounds(books), [books]);
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = filters.searchQuery
        ? `${book.title} ${book.titleJa ?? ""} ${book.author ?? ""} ${book.description ?? ""} ${book.descriptionJa ?? ""}`
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase())
        : true;

      const matchesCategory = matchesGroup(
        book.category?._id ? [book.category._id] : [],
        filters.categories,
      );

      const matchesGenre = matchesGroup(
        book.genres?.map((genre) => genre._id) ?? [],
        filters.genres,
      );

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
      categories: { ...initialGroup },
      genres: { ...initialGroup },
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
