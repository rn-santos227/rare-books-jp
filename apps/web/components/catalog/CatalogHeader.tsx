"use client";

import Link from "next/link";

import { BookSearchField } from "@/components/home/BookSearchField";
import { GeneralHeaderLayout } from "@/components/layouts/GeneralHeaderLayout";
import { Button } from "@/components/ui";
import { LanguageToggle, useTranslations } from "@/context/LanguageContext";

export function CatalogHeader() {
  const t = useTranslations();

  return (
    <GeneralHeaderLayout maxWidthClassName="max-w-screen-2xl" padding="px-8 py-6">
       <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-4">
        <Link href="/" className="text-lg font-semibold text-white transition hover:text-white/90">
          {t.common.siteName}
        </Link>
          <BookSearchField />
          <div className="flex items-center gap-3 text-sm font-semibold text-indigo-100">
            <span className="hidden sm:inline">{t.catalog.browseCatalog}</span>
            <Button
              className="rounded-full bg-linear-to-r from-[#ff5f6d] to-[#ffb347] px-5 py-2.5 text-slate-900 shadow" 
              href="/orders/track"
            >
              {t.common.trackOrder}
            </Button>
            <LanguageToggle />
          </div>
        </div>
        <div className="text-sm text-slate-300 sm:hidden">{t.catalog.browseCatalog}</div>
      </div>
    </GeneralHeaderLayout>
  );
}
