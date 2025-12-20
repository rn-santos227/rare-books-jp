"use client";

import BookCard from "@/components/book/BookCard";
import { Badge, Button, Carousel } from "@/components/ui";
import { useLanguage, useTranslations } from "@/context/LanguageContext";
import { getLocalizedText } from "@/lib/localization";
import { Book } from "@/types/book";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";

interface DiscoverySectionsProps {
  books: Book[];
  categories: Category[];
  genres: Genre[];
}

export function DiscoverySections({ books, categories, genres }: DiscoverySectionsProps) {
  const { language } = useLanguage();
  const t = useTranslations();

  return (
    <>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-lg font-semibold text-black">{t.home.popularGenres}</span>
            <Badge tone="info" className="bg-white/5 text-slate-500 ring-1 ring-white/10">
              {t.home.browseShelf}
            </Badge>
          </div>
          <Button
            variant="ghost"
            href="/catalog"
            className="text-sm text-slate-800 hover:bg-white/10"
          >
            {t.home.seeAll}
          </Button>
        </div>
        <Carousel ariaLabel={t.home.popularGenres} className="-mx-2 px-2">
          {genres.slice(0, 12).map((genre) => (
            <div
              key={genre._id}
              className="group flex min-w-37.5 max-w-45 flex-col items-center gap-2 rounded-2xl bg-[#161922]/70 px-4 py-5 text-center shadow-[0_10px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/5 hover:bg-white/5"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-xl">
                <span role="img" aria-label={getLocalizedText(language, genre.name, genre.nameJa)}>
                  ⭐
                </span>
              </div>
              <p className="text-sm font-semibold text-white">
                {getLocalizedText(language, genre.name, genre.nameJa)}
              </p>
            </div>
          ))}
        </Carousel>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-lg font-semibold text-black">{t.home.popularCategories}</span>
            <Badge tone="info" className="bg-white/5 text-slate-500 ring-1 ring-white/10">
              {t.home.liveFromStudio}
            </Badge>
          </div>
          <Button
            variant="ghost"
            href="/catalog"
            className="text-sm text-slate-800 hover:bg-white/10"
          >
            {t.home.seeAll}
          </Button>
        </div>
        <Carousel ariaLabel={t.home.popularCategories} className="-mx-2 px-2">
          {categories.slice(0, 12).map((category) => (
            <div
              key={category._id}
              className="flex min-w-37.5 max-w-45 flex-col items-center gap-2 rounded-2xl bg-[#161922]/70 px-4 py-5 text-center shadow-[0_10px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/5 hover:bg-white/5"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-lg text-white">
                {getLocalizedText(language, category.name, category.nameJa).slice(0, 2).toUpperCase()}
              </div>
              <p className="text-sm font-semibold text-white">
                {getLocalizedText(language, category.name, category.nameJa)}
              </p>
            </div>
          ))}
        </Carousel>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <div>
              <span className="text-lg font-semibold text-black">{t.home.latestArrivals}</span>
              <p className="text-sm text-slate-600">{t.home.latestArrivalsSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge tone="info" className="bg-white/5 text-slate-500 ring-1 ring-white/10">
              {books.length} {t.home.newCount}
            </Badge>
            <Button variant="secondary" href="/catalog" className="text-sm font-semibold">
              {t.home.browseCatalog}
            </Button>
          </div>
        </div>

        <Carousel ariaLabel={t.home.latestArrivals} className="-mx-2 px-2" alignment="center">
          {books.slice(0, 6).map((book) => (
           <div key={book._id} className="min-w-70 max-w-[320px] flex-1">
              <BookCard book={book} />
            </div>
          ))}
        </Carousel>
      </section>
    </>
  );
}
