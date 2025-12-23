"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { useTranslations } from "@/context/LanguageContext";
import { Book } from "@/types/book";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";

type CatalogPageClientProps = {
  books: Book[];
  categories: Category[];
  genres: Genre[];
};

export function CatalogPageClient({ books, categories, genres }: CatalogPageClientProps) {
  const t = useTranslations();
  const searchParams = useSearchParams();

  const initialFilters = useMemo(() => {
    const parseValues = (param: string) =>
      searchParams
        .getAll(param)
        .flatMap((value) => value.split(","))
        .map((value) => value.trim())
        .filter(Boolean);

    const selectedGenreSlugs = parseValues("genre");
    const selectedCategorySlugs = parseValues("category");

    const genresBySlug = new Map(genres.map((genre) => [genre.slug, genre._id]));
    const categoriesBySlug = new Map(categories.map((category) => [category.slug, category._id]));

    const includedGenres = selectedGenreSlugs
      .map((slug) => genresBySlug.get(slug))
      .filter((id): id is string => Boolean(id));
    const includedCategories = selectedCategorySlugs
      .map((slug) => categoriesBySlug.get(slug))
      .filter((id): id is string => Boolean(id));

    return {
      categories: { include: includedCategories, exclude: [], mode: "any" as const },
      genres: { include: includedGenres, exclude: [], mode: "any" as const },
    };
  }, [categories, genres, searchParams]);
  const initialFiltersKey = useMemo(
    () => JSON.stringify(initialFilters),
    [initialFilters],
  );

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <Link href="/" className="font-semibold text-indigo-700 hover:text-indigo-800">
          {t.catalog.breadcrumbHome}
        </Link>
        <span className="text-slate-400">/</span>
        <span className="text-slate-500">{t.catalog.breadcrumbBooks}</span>
      </nav>

      <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <p className="text-sm font-semibold text-indigo-600">{t.catalog.fullCatalog}</p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{t.catalog.browseTitle}</h1>
          </div>
          <div className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
            {books.length} {t.catalog.totalTitles}
          </div>
        </div>
      </div>

     <CatalogGrid
        key={initialFiltersKey}
        books={books}
        categories={categories}
        genres={genres}
        initialFilters={initialFilters}
      />
    </div>
  );
}
