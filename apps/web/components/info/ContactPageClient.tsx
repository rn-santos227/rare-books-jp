"use client";

import Link from "next/link";

import { useLanguage, useTranslations } from "@/context/LanguageContext";
import { getLocalizedText } from "@/lib/localization";
import { Category } from "@/types/category";

type CollectionsPageClientProps = {
  categories: Category[];
};

export function CollectionsPageClient({ categories }: CollectionsPageClientProps) {
  const { language } = useLanguage();
  const t = useTranslations();
  const content = t.pages.collections;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          {content.eyebrow}
        </p>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">{content.title}</h1>
            <p className="mt-3 max-w-3xl text-slate-600">{content.description}</p>
          </div>
          <span className="text-sm font-semibold text-indigo-600">{content.helper}</span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/catalog?category=${category.slug}`}
              className="group rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-semibold text-slate-900">
                  {getLocalizedText(language, category.name, category.nameJa)}
                </h2>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
                  {t.home.promotionLabel}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{t.home.browseCatalog}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-linear-to-r from-amber-100 via-amber-50 to-white p-8 shadow-md ring-1 ring-amber-200 sm:p-10">
        <h2 className="text-2xl font-semibold text-slate-900">{content.spotlightTitle}</h2>
        <p className="mt-3 max-w-3xl text-slate-700">{content.spotlightBody}</p>
      </section>
    </div>
  );
}
