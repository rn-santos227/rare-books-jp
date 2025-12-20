"use client";

import Link from "next/link";

import { GeneralHeaderLayout } from "@/components/layouts/GeneralHeaderLayout";
import { Button } from "@/components/ui";
import { LanguageToggle, useTranslations } from "@/context/LanguageContext";

export function SupportHeader() {
  const t = useTranslations();

  return (
    <GeneralHeaderLayout>
      <div className="flex flex-wrap items-center gap-4">
        <Link href="/" className="text-lg font-semibold text-white transition hover:text-white/90">
          {t.common.siteName}
        </Link>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-100 ring-1 ring-white/15">
          {t.support.badge}
        </span>
        <div className="flex flex-1 items-center justify-end gap-3 text-sm font-semibold text-indigo-100">
          <Link href="/catalog" className="transition hover:text-white">
            {t.catalog.browseCatalog}
          </Link>
          <Button
            className="rounded-full bg-white px-4 py-2 text-slate-900 shadow hover:translate-y-0.5"
            href="/orders/track"
          >
            {t.common.trackOrder}
          </Button>
          <LanguageToggle />
        </div>
      </div>
    </GeneralHeaderLayout>
  );
}
