"use client";

import Link from "next/link";

import { GeneralHeaderLayout } from "@/components/layouts/GeneralHeaderLayout";
import { LanguageToggle, useTranslations } from "@/context/LanguageContext";

export function OrderTrackerHeader() {
  const t = useTranslations();

  return (
    <GeneralHeaderLayout>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/"
          className="text-lg font-semibold text-white transition hover:text-white/90"
        >
          {t.common.siteName}
        </Link>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-100 ring-1 ring-white/15">
          {t.order.trackerHeading}
        </span>
        <div className="flex flex-1 items-center justify-end gap-3">
          <Link
            href="/catalog"
            className="text-sm font-semibold text-indigo-100 transition hover:text-white"
          >
            {t.catalog.browseCatalog}
          </Link>
          <LanguageToggle />
        </div>
      </div>
    </GeneralHeaderLayout>
  );
}
