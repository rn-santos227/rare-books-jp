"use client";

import { GeneralHeaderLayout } from "@/components/layouts/GeneralHeaderLayout";
import { BookSearchField } from "@/components/home/BookSearchField";
import { LanguageToggle, useTranslations } from "@/context/LanguageContext";

export function CatalogHeader() {
  const t = useTranslations();

  return (
    <GeneralHeaderLayout>
       <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-lg font-semibold text-white">{t.common.siteName}</div>
          <BookSearchField />
          <div className="flex items-center gap-3 text-sm font-semibold text-indigo-100">
            <span className="hidden sm:inline">{t.catalog.browseCatalog}</span>
            <LanguageToggle />
          </div>
        </div>
        <div className="text-sm text-slate-300 sm:hidden">{t.catalog.browseCatalog}</div>
      </div>
    </GeneralHeaderLayout>
  );
}
