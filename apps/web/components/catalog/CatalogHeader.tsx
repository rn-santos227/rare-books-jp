"use client";

import { GeneralHeaderLayout } from "@/components/layouts/GeneralHeaderLayout";
import { LanguageToggle, useTranslations } from "@/context/LanguageContext";

export function CatalogHeader() {
  const t = useTranslations();

  return (
    <GeneralHeaderLayout>
      <div className="flex items-center justify-between gap-4">
        <div className="text-lg font-semibold text-white">{t.common.siteName}</div>
        <div className="flex items-center gap-3 text-sm font-semibold text-indigo-100">
          <span>{t.catalog.browseCatalog}</span>
          <LanguageToggle />
        </div>
      </div>
    </GeneralHeaderLayout>
  );
}
