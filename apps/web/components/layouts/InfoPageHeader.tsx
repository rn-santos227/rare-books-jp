"use client";

import Link from "next/link";

import { Button } from "@/components/ui";
import { LanguageToggle, useTranslations } from "@/context/LanguageContext";

import { GeneralHeaderLayout } from "./GeneralHeaderLayout";

type InfoPageHeaderProps = {
  badge: string;
};

export function InfoPageHeader({ badge }: InfoPageHeaderProps) {
  const t = useTranslations();

  return (
    <GeneralHeaderLayout maxWidthClassName="max-w-screen-2xl" padding="px-8 py-6">
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/"
          className="text-lg font-semibold text-white transition hover:text-white/90"
        >
          {t.common.siteName}
        </Link>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-100 ring-1 ring-white/15">
          {badge}
        </span>
        <div className="flex flex-1 items-center justify-end gap-3 text-sm font-semibold text-indigo-100">
          <Link href="/catalog" className="transition hover:text-white">
            {t.catalog.browseCatalog}
          </Link>
          <Button
            className="rounded-full bg-linear-to-r from-[#ff5f6d] to-[#ffb347] px-5 py-2.5 text-slate-900 shadow"
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
