"use client";

import { useMemo } from "react";

import { BookSearchField } from "@/components/home/BookSearchField";
import { Button } from "@/components/ui";
import { FavoritesMenu } from "@/components/favorites/FavoritesMenu";
import { GeneralHeaderLayout } from "@/components/layouts/GeneralHeaderLayout";
import { LanguageToggle, useLanguage, useTranslations } from "@/context/LanguageContext";
import { getLocalizedText } from "@/lib/localization";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";

type HomePageHeaderProps = {
  categories: Category[];
  genres: Genre[];
};

export function HomeHeader({ categories, genres }: HomePageHeaderProps) {
  const { language } = useLanguage();
  const t = useTranslations();

  const quickFilters = useMemo(() => {
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

  return (
    <GeneralHeaderLayout maxWidthClassName="max-w-screen-2xl" padding="px-8 py-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="text-lg font-semibold text-white">{t.common.siteName}</div>
        <BookSearchField />
        <div className="flex items-center gap-2 text-sm font-semibold">
          <FavoritesMenu />
          <Button
            className="rounded-full bg-linear-to-r from-[#ff5f6d] to-[#ffb347] px-5 py-2.5 text-slate-900 shadow"
            href="/orders/track"
          >
            {t.common.trackOrder}
          </Button>
          <LanguageToggle />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {quickFilters.map((filter) => (
          <span
            key={filter.key}
            className="rounded-full bg-white/5 px-4 py-2 text-[11px] text-slate-200 ring-1 ring-white/5"
          >
            {getLocalizedText(language, filter.label, filter.labelJa)}
          </span>
        ))}
      </div>
    </GeneralHeaderLayout>
  );
}
