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

}
