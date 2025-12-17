"use client";

import { BookSearchField } from "@/components/home/BookSearchField";
import { Button } from "@/components/ui";
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
        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide text-white shadow ring-1 ring-white/10">
          {t.common.siteName}
        </span>
        <BookSearchField />
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Button
            variant="ghost"
            className="rounded-full bg-white/5 px-5 py-2.5 text-white ring-1 ring-white/10 hover:bg-white/10"
          >
            {t.common.favorites}
          </Button>
          <Button className="rounded-full bg-linear-to-r from-[#ff5f6d] to-[#ffb347] px-5 py-2.5 text-slate-900 shadow">
            {t.common.startSelling}
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
