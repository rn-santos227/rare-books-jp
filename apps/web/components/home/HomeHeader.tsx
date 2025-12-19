"use client";

import { BookSearchField } from "@/components/home/BookSearchField";
import { Button } from "@/components/ui";
import { FavoritesMenu } from "@/components/favorites/FavoritesMenu";
import { LanguageToggle, useLanguage, useTranslations } from "@/context/LanguageContext";
import { getLocalizedText } from "@/lib/localization";

export interface QuickFilterItem {
  key: string;
  label: string;
  labelJa?: string | null;
}

interface HomeHeaderProps {
  quickFilters: QuickFilterItem[];
}

export function HomeHeader({ quickFilters }: HomeHeaderProps) {
  const { language } = useLanguage();
  const t = useTranslations();

  return (
    <>
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
    </>
  );
}
