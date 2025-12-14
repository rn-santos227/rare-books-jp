"use client";

import { useMemo, useState } from "react";
import BookCard from "@/components/home/BookCard";
import { FiltersPanel } from "@/components/home/FiltersPanel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useFilters } from "@/hooks/useFilters";
import { Book } from "@/types/book";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";

type Props = {
  books: Book[];
  categories: Category[];
  genres: Genre[];
};

export default function HomePageClient({ books, categories, genres }: Props) {
  const { filters, filteredBooks, priceBounds, updateFilter, resetFilters } =
    useFilters(books);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const bestSellers = useMemo(
    () => filteredBooks.slice(0, 8),
    [filteredBooks],
  );

  const activeCategory = filters.categoryId
    ? categories.find((category) => category._id === filters.categoryId)
    : null;
  const activeGenre = filters.genreId
    ? genres.find((genre) => genre._id === filters.genreId)
    : null;

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white/95 p-4 shadow-sm ring-1 ring-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-indigo-600">Filter catalog</p>
            <p className="text-xs text-slate-500">
              Open the panel to refine your search.
            </p>
          </div>
          <Button
            variant="secondary"
            className="font-semibold"
            onClick={() => setIsFiltersOpen((prev) => !prev)}
          >
            {isFiltersOpen ? "Hide filters" : "Show filters"}
          </Button>
        </div>

        <div
          data-open={isFiltersOpen}
          aria-hidden={!isFiltersOpen}
          className={`mt-4 origin-top overflow-hidden rounded-2xl transition-[max-height,opacity,transform] duration-300 ease-in-out data-[open=false]:-translate-y-1 data-[open=false]:pointer-events-none ${
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

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-indigo-600">Live catalog</p>
            <h2 className="text-2xl font-bold text-slate-900">Latest arrivals</h2>
          </div>
          <Badge tone="info" className="text-sm">
            {filteredBooks.length} matches
          </Badge>
        </div>

        <div className="flex flex-col gap-3 rounded-3xl bg-white/90 p-4 shadow-sm ring-1 ring-gray-200">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-700 ring-1 ring-gray-200">
              <span className="text-xs font-semibold uppercase text-slate-500">
                Category
              </span>
              <select
                className="bg-transparent text-sm font-semibold focus:outline-none"
                value={filters.categoryId ?? ""}
                onChange={(event) =>
                  updateFilter(
                    "categoryId",
                    event.target.value === "" ? null : event.target.value,
                  )
                }
              >
                <option value="">All</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-700 ring-1 ring-gray-200">
              <span className="text-xs font-semibold uppercase text-slate-500">
                Genre
              </span>
              <select
                className="bg-transparent text-sm font-semibold focus:outline-none"
                value={filters.genreId ?? ""}
                onChange={(event) =>
                  updateFilter(
                    "genreId",
                    event.target.value === "" ? null : event.target.value,
                  )
                }
              >
                <option value="">All</option>
                {genres.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-700 ring-1 ring-gray-200">
              <span className="text-xs font-semibold uppercase text-slate-500">
                Price
              </span>
              <span className="font-semibold text-slate-800">
                ¥{filters.priceRange[0].toLocaleString()} - ¥
                {filters.priceRange[1].toLocaleString()}
              </span>
            </div>

            <Button
              variant="secondary"
              className="ml-auto"
              onClick={resetFilters}
            >
              Clear all
            </Button>
          </div>

          {(activeCategory || activeGenre || filters.searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="uppercase tracking-wide text-slate-400">Active</span>
              {activeCategory && (
                <Badge
                  tone="info"
                  className="flex items-center gap-2 bg-sky-50 text-sky-700"
                >
                  {activeCategory.name}
                  <button
                    className="text-slate-500 hover:text-slate-700"
                    onClick={() => updateFilter("categoryId", null)}
                  >
                    ×
                  </button>
                </Badge>
              )}
              {activeGenre && (
                <Badge
                  tone="neutral"
                  className="flex items-center gap-2 bg-slate-100 text-slate-700"
                >
                  {activeGenre.name}
                  <button
                    className="text-slate-500 hover:text-slate-700"
                    onClick={() => updateFilter("genreId", null)}
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.searchQuery && (
                <Badge
                  tone="neutral"
                  className="flex items-center gap-2 bg-indigo-50 text-indigo-700"
                >
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
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
          <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
            {bestSellers.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-10 text-center text-slate-600">
              <span className="text-2xl">📚</span>
              <p className="text-lg font-semibold">No books found</p>
              <p className="text-sm text-slate-500">
                Try adjusting your filters or clearing the search query.
              </p>
              <Button variant="secondary" onClick={resetFilters}>
                Clear filters
              </Button>
            </div>
          )}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-amber-600">Collections</p>
              <h3 className="text-xl font-bold text-slate-900">Curated shelves</h3>
              <p className="text-sm text-slate-600">
                Browse by editorial themes inspired by Mercari-style browsing.
              </p>
            </div>
            <Button variant="secondary">View Studio entries</Button>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {genres.slice(0, 6).map((genre) => (
              <div
                key={genre._id}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 ring-1 ring-gray-100"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    {genre.name.charAt(0)}
                  </span>
                  <div>
                    <p>{genre.name}</p>
                    <p className="text-xs text-slate-500">Studio tag</p>
                  </div>
                </div>
                <Badge tone="neutral">Genre</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
