"use client";

import { useMemo } from "react";

import { DiscoverySections } from "@/components/home/DiscoverySections";
import { HomeHeader, QuickFilterItem } from "@/components/home/HomeHeader";
import { PromotionHero } from "@/components/home/PromotionHero";
import { HomePageLayout } from "@/components/home/layouts/HomePageLayout";
import { GeneralHeaderLayout } from "@/components/layouts/GeneralHeaderLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedText } from "@/lib/localization";
import { Book } from "@/types/book";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";
import { Promotion } from "@/types/promotion";

type HomePageClientProps = {
  books: Book[];
  categories: Category[];
  genres: Genre[];
  promotions: Promotion[];
};

export function HomePageClient({ books, categories, genres, promotions }: HomePageClientProps) {
  const { language } = useLanguage();

  const quickFilters: QuickFilterItem[] = useMemo(() => {
    if (genres.length) {
      return genres.map((genre) => ({
        key: genre._id,
        label: getLocalizedText(language, genre.name, genre.nameJa),
        labelJa: genre.nameJa,
      }));
    }

    return categories.slice(0, 7).map((category) => ({
      key: category._id,
      label: getLocalizedText(language, category.name, category.nameJa),
      labelJa: category.nameJa,
    }));
  }, [categories, genres, language]);

  const latestBooks = useMemo(
    () =>
      [...books]
        .sort(
          (a, b) =>
            new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
        )
        .slice(0, 6),
    [books],
  );
}
