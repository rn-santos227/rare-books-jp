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

  const quickFilters = genres.length
    ? genres.map((genre) => ({ key: genre._id, label: genre.name }))
    : categories.slice(0, 7).map((category) => ({
        key: category._id,
        label: category.name,
      }));

  const promotion = promotions[0];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="border-b border-white/5 bg-[#121420]/95 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5">
          <div className="flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide text-white shadow ring-1 ring-white/10">
              The Rare Books JP
            </span>
            <div className="flex flex-1 items-center gap-3 rounded-full bg-white/5 px-4 py-3 text-sm text-slate-300 ring-1 ring-white/10">
              <span className="text-slate-500">🔍</span>
              <input
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                placeholder="Looking for something?"
              />
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Button variant="ghost" className="bg-white/5 text-white ring-1 ring-white/10 hover:bg-white/10">
                Favorites
              </Button>
              <Button className="bg-linear-to-r from-[#ff5f6d] to-[#ffb347] text-slate-900 shadow">
                Start selling
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            {quickFilters.map((filter) => (
              <span
                key={filter.key}
                className="rounded-full bg-white/5 px-4 py-2 text-[11px] text-slate-200 ring-1 ring-white/5"
              >
                {filter.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-white/5 bg-linear-to-r from-[#ff4d67] via-[#ff5f6d] to-[#ffb347] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/80">Mercari style banner</p>
              <h1 className="text-2xl font-bold leading-tight md:text-3xl">
                Our international purchase and shipping parallel is live
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Badge tone="info" className="bg-white/20 text-white ring-white/30">
                {categories.length}+ categories
              </Badge>
              <Badge tone="info" className="bg-black/20 ring-white/30">
                {genres.length} genres
              </Badge>
            </div>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 shadow-sm ring-1 ring-white/20 backdrop-blur">
            {promotion ? (
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  {promotion.badge && (
                    <Badge tone="info" className="bg-white/20 text-white ring-white/30">
                      {promotion.badge}
                    </Badge>
                  )}
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-white">{promotion.title}</h2>
                    {promotion.tagline && (
                      <p className="text-sm font-semibold text-white/90">{promotion.tagline}</p>
                    )}
                    {promotion.description && (
                      <p className="text-sm text-white/80 line-clamp-3">{promotion.description}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {promotion.ctaHref && promotion.ctaLabel ? (
                      <Button href={promotion.ctaHref} className="bg-white text-[#ff5f6d] shadow-sm">
                        {promotion.ctaLabel}
                      </Button>
                    ) : (
                      <Button className="bg-white text-[#ff5f6d] shadow-sm">Explore promotion</Button>
                    )}
                    <Button variant="secondary" className="bg-white/10 text-white ring-1 ring-white/30">
                      Visit Studio dashboard
                    </Button>
                  </div>
                </div>
                {promotion.imageUrl ? (
                  <div className="relative h-32 w-full max-w-55 overflow-hidden rounded-xl bg-white/15 shadow-sm ring-1 ring-white/30 md:h-36">
                    <ImageViewer
                      src={promotion.imageUrl}
                      alt={promotion.imageAlt ?? promotion.title ?? "Promotion image"}
                      className="h-full w-full rounded-xl"
                      imgClassName="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="flex h-32 w-full max-w-55 items-center justify-center rounded-xl border border-dashed border-white/40 bg-white/10 text-sm text-white/80 md:h-36">
                    Add hero image
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">Promotion placeholder</p>
                  <p className="text-sm text-white/80">
                    Create an active Promotion in Sanity Studio to showcase a hero banner on the homepage.
                  </p>
                </div>
                <div className="rounded-xl border border-dashed border-white/40 bg-white/10 px-4 py-3 text-sm font-medium text-white">
                  Studio → Promotions
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-lg font-semibold text-white">Popular genres</span>
              <Badge tone="info" className="bg-white/5 text-slate-200 ring-1 ring-white/10">
                Browse the shelf
              </Badge>
            </div>
            <Button variant="ghost" className="text-sm text-slate-200 hover:bg-white/10">
              See all
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {genres.slice(0, 12).map((genre) => (
              <div
                key={genre._id}
                className="group flex flex-col items-center gap-2 rounded-2xl bg-[#161922]/70 px-4 py-5 text-center shadow-[0_10px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/5 hover:bg-white/5"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-xl">
                  <span role="img" aria-label={genre.name}>
                    ⭐
                  </span>
                </div>
                <p className="text-sm font-semibold text-white">{genre.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-lg font-semibold text-white">Popular categories</span>
              <Badge tone="info" className="bg-white/5 text-slate-200 ring-1 ring-white/10">
                Live from Studio
              </Badge>
            </div>
            <Button variant="ghost" className="text-sm text-slate-200 hover:bg-white/10">
              See all
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {categories.slice(0, 12).map((category) => (
              <div
                key={category._id}
                className="flex flex-col items-center gap-2 rounded-2xl bg-[#161922]/70 px-4 py-5 text-center shadow-[0_10px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/5 hover:bg-white/5"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-lg text-white">
                  {category.name.slice(0, 2).toUpperCase()}
                </div>
                <p className="text-sm font-semibold text-white">{category.name}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-lg font-semibold text-white">Recommended for you</span>
              <Badge tone="info" className="bg-white/5 text-slate-200 ring-1 ring-white/10">
                {books.length} items
              </Badge>
            </div>
            <Button variant="ghost" className="text-sm text-slate-200 hover:bg-white/10">
              See all
            </Button>
          </div>
          <HomePageClient
            books={books}
            categories={categories}
            genres={genres}
          />
        </section>
      </div>
    </main>
  );
}

