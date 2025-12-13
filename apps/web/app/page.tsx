import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import HomePageClient from "@/components/home/HomePageClient";
import ImageViewer from "@/components/ui/ImageViewer";
import {
  BOOKS_QUERY,
  CATEGORIES_QUERY,
  GENRES_QUERY,
  PROMOTIONS_QUERY,
} from "@/constants/queries";
import { sanityClient } from "@/lib/sanity.client";
import { Book } from "@/types/book";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";
import { Promotion } from "@/types/promotion";

export default async function Home() {
  const [books, categories, genres, promotions] = await Promise.all([
    sanityClient.fetch<Book[]>(BOOKS_QUERY),
    sanityClient.fetch<Category[]>(CATEGORIES_QUERY),
    sanityClient.fetch<Genre[]>(GENRES_QUERY),
    sanityClient.fetch<Promotion[]>(PROMOTIONS_QUERY),
  ]);

  const featuredBooks = books.filter((book) => book.featured).slice(0, 6);
  const highlightedBooks =
    featuredBooks.length > 0 ? featuredBooks : books.slice(0, 6);
  const promotion = promotions[0];

  return (
    <main className="min-h-screen bg-linear-to-b from-indigo-50 via-white to-amber-50 px-6 py-12 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <header className="rounded-3xl bg-white/80 p-8 shadow-sm ring-1 ring-gray-100">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-6">
              <div className="space-y-3">
                <Badge tone="info" className="font-semibold uppercase tracking-wide">
                  Rare Books JP Marketplace
                </Badge>
                <div className="space-y-2">
                  <h1 className="text-4xl font-extrabold leading-tight text-slate-900 lg:text-5xl">
                    Discover, trade, and showcase collectible Japanese books.
                  </h1>
                  <p className="max-w-3xl text-lg text-slate-600">
                    A Mercari-inspired experience tailored for rare literature,
                    first editions, manga archives, and academic treasures.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-700">
                  <span className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 ring-1 ring-indigo-100">
                    <span className="h-2 w-2 rounded-full bg-indigo-500" /> Curated by
                    Sanity Studio
                  </span>
                  <span className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 ring-1 ring-amber-100">
                    <span className="h-2 w-2 rounded-full bg-amber-500" /> {categories.length}+
                    categories to explore
                  </span>
                  <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 ring-1 ring-emerald-100">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" /> {genres.length} genres
                    mapped
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4">
                {promotion ? (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                      {promotion.badge && <Badge tone="info">{promotion.badge}</Badge>}
                      <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-slate-900">{promotion.title}</h2>
                        {promotion.tagline && (
                          <p className="text-sm font-semibold text-indigo-700">{promotion.tagline}</p>
                        )}
                        {promotion.description && (
                          <p className="text-sm text-slate-600 line-clamp-3">
                            {promotion.description}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {promotion.ctaHref && promotion.ctaLabel ? (
                          <Button href={promotion.ctaHref} className="shadow-sm">
                            {promotion.ctaLabel}
                          </Button>
                        ) : (
                          <Button className="shadow-sm">Explore promotion</Button>
                        )}
                        <Button variant="secondary" className="shadow-sm">
                          Visit Studio dashboard
                        </Button>
                      </div>
                    </div>
                    {promotion.imageUrl ? (
                      <div className="relative h-32 w-full max-w-55 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-white/60 sm:h-36">
                        <ImageViewer
                          src={promotion.imageUrl}
                          alt={promotion.imageAlt ?? promotion.title ?? "Promotion image"}
                          className="h-full w-full rounded-xl"
                          imgClassName="h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-indigo-900/10 via-transparent to-transparent" />
                      </div>
                    ) : (
                      <div className="flex h-32 w-full max-w-55 items-center justify-center rounded-xl border border-dashed border-indigo-200 bg-white/60 text-sm text-slate-500 sm:h-36">
                        Add hero image
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-indigo-700">Promotion placeholder</p>
                      <p className="text-sm text-slate-600">
                        Create an active Promotion in Sanity Studio to showcase a hero banner on the homepage.
                      </p>
                    </div>
                    <div className="rounded-xl border border-dashed border-indigo-200 bg-white/60 px-4 py-3 text-sm font-medium text-slate-700">
                      Studio → Promotions
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="relative w-full max-w-sm self-start overflow-hidden rounded-3xl bg-linear-to-br from-indigo-500 via-purple-500 to-amber-400 p-6 text-white shadow-lg">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-wide text-indigo-100">
                  Featured Shelf
                </p>
                <h2 className="text-3xl font-semibold">{highlightedBooks.length} books</h2>
                <p className="text-sm text-indigo-100">
                  Live from Sanity Studio — refreshed on publish.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {highlightedBooks.map((book) => (
                    <div
                      key={book._id}
                      className="overflow-hidden rounded-2xl bg-white/10 p-3 backdrop-blur"
                    >
                      <div className="aspect-3/4 overflow-hidden rounded-xl bg-white/20">
                        <ImageViewer
                          src={book.imageUrl}
                          alt={book.title}
                          className="h-full w-full rounded-xl"
                          imgClassName="h-full w-full object-cover"
                          fallbackLabel="Cover coming soon"
                          icon={
                            <span className="text-base" role="img" aria-hidden>
                              📚
                            </span>
                          }
                        />
                      </div>
                      <p className="mt-3 text-sm font-semibold text-white line-clamp-2">
                        {book.title}
                      </p>
                      <p className="text-xs text-indigo-100">{book.author}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_45%)]" />
            </div>
          </div>
        </header>

        <HomePageClient
          books={books}
          categories={categories}
          genres={genres}
        />
      </div>
    </main>
  );
}

