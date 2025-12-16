"use client";

import Link from "next/link";

import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { Book } from "@/types/book";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";

type CatalogPageClientProps = {
  books: Book[];
  categories: Category[];
  genres: Genre[];
};

export function CatalogPageClient({ books, categories, genres }: CatalogPageClientProps) {
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <Link href="/" className="font-semibold text-indigo-700 hover:text-indigo-800">
          Home
        </Link>
        <span className="text-slate-400">/</span>
        <span className="text-slate-500">Books</span>
      </nav>

      <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <p className="text-sm font-semibold text-indigo-600">Full Catalog</p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Browse Rare Books</h1>
          </div>
          <div className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
            {books.length} total titles
          </div>
        </div>
      </div>

      <CatalogGrid books={books} categories={categories} genres={genres} />
    </div>
  );
}
