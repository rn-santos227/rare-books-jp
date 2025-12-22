"use client";

import { useMemo, useState } from "react";

import BookCard from "@/components/book/BookCard";
import { FiltersPanel } from "@/components/catalog/FiltersPanel";
import { Badge, Button } from "@/components/ui";
import { useLanguage, useTranslations } from "@/context/LanguageContext";
import { getConditionLabel, getLocalizedText } from "@/lib/localization";
import { useCatalog } from "./hooks/useCatalog";
import { Book } from "@/types/book";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";

type CatalogGridProps = {
  books: Book[];
  categories: Category[];
  genres: Genre[];
};

type LocalizedEntity = {
  _id: string;
  name: string;
  nameJa?: string | null;
};

function selectMatches<T extends LocalizedEntity>(
  items: T[],
  include: string[],
  exclude: string[],
) {
  return {
    include: items.filter((item) => include.includes(item._id)),
    exclude: items.filter((item) => exclude.includes(item._id)),
  };
}

export function CatalogGrid({ books, categories, genres }: CatalogGridProps) {
  const { language } = useLanguage();
  const t = useTranslations();
  const {
    filters,
    filteredBooks,
    displayedBooks,
    priceBounds,
    hasMoreToShow,
    loadMore,
    updateFilter,
    resetFilters,
    loadMoreRef,
  } = useCatalog(books);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const filtersPanelId = "catalog-filters-panel";

  const { include: includedCategories, exclude: excludedCategories } = useMemo(
    () =>
      selectMatches(categories, filters.categories.include, filters.categories.exclude),
    [categories, filters.categories.exclude, filters.categories.include],
  );

  const { include: includedGenres, exclude: excludedGenres } = useMemo(
    () => selectMatches(genres, filters.genres.include, filters.genres.exclude),
    [filters.genres.exclude, filters.genres.include, genres],
  );

  const selectedCondition = useMemo(
    () => (filters.condition ? getConditionLabel(language, filters.condition) : null),
    [filters.condition, language],
  );

  const formatNames = (items: LocalizedEntity[]) =>
    items.map((item) => getLocalizedText(language, item.name, item.nameJa)).join(", ");

  const hasActiveFilters = useMemo(
    () =>
      Boolean(
        filters.searchQuery ||
          includedCategories.length > 0 ||
          excludedCategories.length > 0 ||
          includedGenres.length > 0 ||
          excludedGenres.length > 0 ||
          selectedCondition,
      ),
    [
      excludedCategories.length,
      excludedGenres.length,
      filters.searchQuery,
      includedCategories.length,
      includedGenres.length,
      selectedCondition,
    ],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-indigo-600">{t.catalog.bookCatalog}</p>
          <h2 className="text-2xl font-bold text-slate-900">{t.catalog.exploreEveryTitle}</h2>
          <p className="text-sm text-slate-600">{t.catalog.exploreHelper}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="info" className="text-sm">
            {filteredBooks.length} {t.catalog.matches}
          </Badge>
          <Button
            variant="secondary"
            className="font-semibold"
            onClick={() => setIsFiltersOpen((prev) => !prev)}
            aria-expanded={isFiltersOpen}
            aria-controls={filtersPanelId}
          >
            {isFiltersOpen ? t.catalog.hideFilters : t.catalog.showFilters}
          </Button>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="uppercase tracking-wide text-slate-400">{t.catalog.activeLabel}</span>
          {includedCategories.length > 0 && (
            <Badge tone="info" className="flex items-center gap-2 bg-sky-50 text-sky-700">
              <span>
                {t.filters.includeLabel}: {formatNames(includedCategories)}
                {includedCategories.length > 1 &&
                  ` (${filters.categories.mode === "all" ? t.filters.matchAll : t.filters.matchAny})`}
              </span>
              <button
                className="text-slate-500 hover:text-slate-700"
                onClick={() =>
                  updateFilter("categories", {
                    ...filters.categories,
                    include: [],
                  })
                }
              >
                ×
              </button>
            </Badge>
          )}
          {excludedCategories.length > 0 && (
            <Badge tone="warning" className="flex items-center gap-2 bg-amber-50 text-amber-800">
              <span>
                {t.filters.excludeLabel}: {formatNames(excludedCategories)}
              </span>

              <button
                className="text-slate-500 hover:text-slate-700"
                onClick={() =>
                  updateFilter("categories", {
                    ...filters.categories,
                    exclude: [],
                  })
                }
              >
                ×
              </button>
            </Badge>
          )}
          {includedGenres.length > 0 && (
            <Badge tone="neutral" className="flex items-center gap-2 bg-slate-100 text-slate-700">
              <span>
                {t.filters.includeLabel}: {formatNames(includedGenres)}
                {includedGenres.length > 1 &&
                  ` (${filters.genres.mode === "all" ? t.filters.matchAll : t.filters.matchAny})`}
              </span>
              <button
                className="text-slate-500 hover:text-slate-700"
                onClick={() =>
                  updateFilter("genres", {
                    ...filters.genres,
                    include: [],
                  })
                }
              >
                ×
              </button>
            </Badge>
          )}
          {excludedGenres.length > 0 && (
            <Badge tone="warning" className="flex items-center gap-2 bg-amber-50 text-amber-800">
              <span>
                {t.filters.excludeLabel}: {formatNames(excludedGenres)}
              </span>
              <button
                className="text-slate-500 hover:text-slate-700"
                onClick={() =>
                  updateFilter("genres", {
                    ...filters.genres,
                    exclude: [],
                  })
                }
              >
                ×
              </button>
            </Badge>
          )}
          {selectedCondition && (
            <Badge tone="warning" className="flex items-center gap-2 bg-amber-50 text-amber-800">
              {selectedCondition}
              <button
                className="text-slate-500 hover:text-slate-700"
                onClick={() => updateFilter("condition", null)}
              >
                ×
              </button>
            </Badge>
          )}
          {filters.searchQuery && (
            <Badge tone="neutral" className="flex items-center gap-2 bg-indigo-50 text-indigo-700">
              {filters.searchQuery}
              <button
                className="text-slate-500 hover:text-slate-700"
                onClick={() => updateFilter("searchQuery", "")}
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[440px,1fr]">
        <div className="space-y-3">
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-indigo-600">{t.filters.title}</p>
                <p className="text-xs text-slate-500">{t.filters.subtitle}.</p>
              </div>
              <Button
                variant="ghost"
                className="text-sm font-semibold text-indigo-700"
                onClick={resetFilters}
              >
                {t.filters.reset}
              </Button>
            </div>
          </div>

          <div
            id={filtersPanelId}
            data-open={isFiltersOpen}
            aria-hidden={!isFiltersOpen}
            className={`origin-top overflow-hidden rounded-2xl transition-[max-height,opacity,transform] duration-300 ease-in-out data-[open=false]:-translate-y-1 data-[open=false]:pointer-events-none ${
              isFiltersOpen ? "max-h-300 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <FiltersPanel
              filters={filters}
              categories={categories}
              genres={genres}
              priceBounds={priceBounds}
              updateFilter={updateFilter}
              resetFilters={resetFilters}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
            {displayedBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-200">
              <span className="text-2xl">📚</span>
              <p className="text-lg font-semibold text-slate-800">{t.catalog.noBooksTitle}</p>
              <p className="text-sm text-slate-600">{t.catalog.noBooksBody}</p>
              <Button variant="secondary" onClick={resetFilters}>
                {t.filters.reset}
              </Button>
            </div>
          )}

          {hasMoreToShow && (
            <div className="flex items-center justify-center">
              <Button variant="secondary" onClick={loadMore}>
                {t.catalog.loadMore}
              </Button>
            </div>
          )}

          <div ref={loadMoreRef} aria-hidden className="h-1" />
        </div>
      </div>
    </div>
  );
}
