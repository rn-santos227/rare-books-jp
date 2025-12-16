"use client";

import BookCard from "@/components/home/BookCard";
import { FiltersPanel } from "@/components/home/FiltersPanel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
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

  return (
    <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
      <div className="h-fit lg:sticky lg:top-6">
        <FiltersPanel
          filters={filters}
          categories={categories}
          genres={genres}
          priceBounds={priceBounds}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
        />
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-indigo-600">Book catalog</p>
            <h2 className="text-2xl font-bold text-slate-900">Explore every title</h2>
            <p className="text-sm text-slate-600">
              Use the filters to refine your shelf. New items load automatically as
              you browse.
            </p>
          </div>
          <Badge tone="info" className="text-sm">
            {filteredBooks.length} matches
          </Badge>
        </div>

        <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
          {displayedBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-200">
            <span className="text-2xl">📚</span>
            <p className="text-lg font-semibold text-slate-800">No books found</p>
            <p className="text-sm text-slate-600">
              Try clearing the filters or expanding your price range.
            </p>
            <Button variant="secondary" onClick={resetFilters}>
              Reset filters
            </Button>
          </div>
        )}

        {hasMoreToShow && (
          <div className="flex items-center justify-center">
            <Button
              variant="secondary"
              onClick={loadMore}
            >
              Load more books
            </Button>
          </div>
        )}

        <div ref={loadMoreRef} aria-hidden className="h-1" />
      </div>
    </div>
  );
}
