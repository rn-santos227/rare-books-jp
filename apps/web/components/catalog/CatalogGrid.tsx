"use client";

import { useMemo, useState } from "react";

import BookCard from "@/components/home/BookCard";
import { FiltersPanel } from "@/components/catalog/FiltersPanel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useLanguage, useTranslations } from "@/context/LanguageContext";
import { getLocalizedText } from "@/lib/localization";
import { useCatalog } from "./hooks/useCatalog";
import { Book } from "@/types/book";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";

type CatalogGridProps = {
  books: Book[];
  categories: Category[];
  genres: Genre[];
};

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

  const activeCategory = useMemo(
    () =>
      filters.categoryId
        ? categories.find((category) => category._id === filters.categoryId)
        : null,
  [categories, filters.categoryId],
  );

  const activeGenre = useMemo(
    () =>
      filters.genreId
        ? genres.find((genre) => genre._id === filters.genreId)
        : null,
    [filters.genreId, genres],
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

      {(activeCategory || activeGenre || filters.searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="uppercase tracking-wide text-slate-400">{t.catalog.activeLabel}</span>
          {activeCategory && (
            <Badge tone="info" className="flex items-center gap-2 bg-sky-50 text-sky-700">
              {getLocalizedText(language, activeCategory.name, activeCategory.nameJa)}
              <button
                className="text-slate-500 hover:text-slate-700"
                onClick={() => updateFilter("categoryId", null)}
              >
                ×
              </button>
            </Badge>
          )}
          {activeGenre && (
            <Badge tone="neutral" className="flex items-center gap-2 bg-slate-100 text-slate-700">
              {getLocalizedText(language, activeGenre.name, activeGenre.nameJa)}
              <button
                className="text-slate-500 hover:text-slate-700"
                onClick={() => updateFilter("genreId", null)}
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

      <div className={`grid gap-6 ${isFiltersOpen ? "lg:grid-cols-[320px,1fr]" : ""}`}>
        <div className="space-y-3 lg:top-6">
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
