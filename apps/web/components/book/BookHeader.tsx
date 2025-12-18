"use client";

import Link from "next/link";

import { BookSearchField } from "@/components/home/BookSearchField";
import { FavoritesMenu } from "@/components/favorites/FavoritesMenu";
import { GeneralHeaderLayout } from "@/components/layouts/GeneralHeaderLayout";
import { LanguageToggle, useTranslations } from "@/context/LanguageContext";

export function BookHeader() {
  const t = useTranslations();

  return (
    <GeneralHeaderLayout>
      <div className="flex flex-col gap-3">
       <div className="flex flex-wrap items-center gap-4">
          <div className="text-lg font-semibold text-white">{t.common.siteName}</div>
          <BookSearchField />
          <div className="flex items-center gap-3">
            <Link
              href="/catalog"
              className="text-sm font-semibold text-indigo-100 transition hover:text-white"
            >

              {t.book.backToCatalog}
            </Link>
            <FavoritesMenu />
            <LanguageToggle />
          </div>
        </div>
      </div>
    </GeneralHeaderLayout>
  );
}
