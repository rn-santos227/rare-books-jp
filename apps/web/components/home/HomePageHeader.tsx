"use client";

import { useMemo } from "react";

import { HomeHeader, QuickFilterItem } from "@/components/home/HomeHeader";
import { GeneralHeaderLayout } from "@/components/layouts/GeneralHeaderLayout";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedText } from "@/lib/localization";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";

type HomePageHeaderProps = {
  categories: Category[];
  genres: Genre[];
};

export function HomePageHeader({ categories, genres }: HomePageHeaderProps) {
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

  return (
    <GeneralHeaderLayout maxWidthClassName="max-w-screen-2xl" padding="px-8 py-6">
      <HomeHeader quickFilters={quickFilters} />
    </GeneralHeaderLayout>
  );
}
