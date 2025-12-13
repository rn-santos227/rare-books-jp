"use client";

import { useMemo } from "react";
import BookCard from "@/components/home/BookCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextArea";
import { useFilters } from "@/hooks/useFilters";
import { Book } from "@/types/book";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";

const conditions: { label: string; value: string }[] = [
  { label: "New", value: "new" },
  { label: "Like New", value: "like_new" },
  { label: "Used", value: "used" },
  { label: "Damaged", value: "damaged" },
];

function FilterPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-sm ${
        active
          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
          : "border-gray-200 bg-white text-slate-700"
      }`}
    >
      {label}
    </button>
  );
}

type Props = {
  books: Book[];
  categories: Category[];
  genres: Genre[];
};

export default function HomePageClient({ books, categories, genres }: Props) {
  const { filters, filteredBooks, priceBounds, updateFilter, resetFilters } =
    useFilters(books);

  const bestSellers = useMemo(
    () => filteredBooks.slice(0, 8),
    [filteredBooks],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      <aside className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-indigo-600">Filters</p>
            <p className="text-xs text-slate-500">Craft the perfect shelf</p>
          </div>
          <Button
            variant="ghost"
            className="text-sm font-semibold text-indigo-700"
            onClick={resetFilters}
          >
            Reset
          </Button>
        </div>

        <TextField
          placeholder="Search by title or author"
          value={filters.searchQuery}
          onChange={(event) => updateFilter("searchQuery", event.target.value)}
        />

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-800">Categories</h3>
            <Badge tone="info">{categories.length}</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <FilterPill
                key={category._id}
                label={category.name}
                active={filters.categoryId === category._id}
                onClick={() =>
                  updateFilter(
                    "categoryId",
                    filters.categoryId === category._id ? null : category._id,
                  )
                }
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-800">Genres</h3>
            <Badge tone="neutral">{genres.length}</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <FilterPill
                key={genre._id}
                label={genre.name}
                active={filters.genreId === genre._id}
                onClick={() =>
                  updateFilter(
                    "genreId",
                    filters.genreId === genre._id ? null : genre._id,
                  )
                }
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-800">Condition</h3>
            <Badge tone="success">Verified</Badge>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {conditions.map((condition) => (
              <FilterPill
                key={condition.value}
                label={condition.label}
                active={filters.condition === condition.value}
                onClick={() =>
                  updateFilter(
                    "condition",
                    filters.condition === condition.value
                      ? null
                      : condition.value,
                  )
                }
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">Price</h3>
            <Badge tone="neutral">
              ¥{filters.priceRange[0].toLocaleString()} - ¥
              {filters.priceRange[1].toLocaleString()}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <label className="flex flex-col gap-1 text-slate-600">
              <span>Min</span>
              <input
                type="number"
                min={priceBounds[0]}
                max={priceBounds[1]}
                value={filters.priceRange[0]}
                onChange={(event) =>
                  updateFilter("priceRange", [
                    Number(event.target.value),
                    filters.priceRange[1],
                  ])
                }
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>
            <label className="flex flex-col gap-1 text-slate-600">
              <span>Max</span>
              <input
                type="number"
                min={filters.priceRange[0]}
                max={priceBounds[1]}
                value={filters.priceRange[1]}
                onChange={(event) =>
                  updateFilter("priceRange", [
                    filters.priceRange[0],
                    Number(event.target.value) || priceBounds[1],
                  ])
                }
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>
          </div>
        </div>
      </aside>

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

        <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
