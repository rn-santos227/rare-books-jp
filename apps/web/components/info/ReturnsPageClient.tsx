"use client";

import Link from "next/link";

import { Button } from "@/components/ui";
import { useTranslations } from "@/context/LanguageContext";

export function ReturnsPageClient() {
  const t = useTranslations();
  const content = t.pages.returns;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          {content.eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{content.title}</h1>
        <p className="mt-3 max-w-3xl text-slate-600">{content.description}</p>

        <ul className="mt-6 space-y-3">
          {content.policyPoints.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-indigo-500" aria-hidden />
              <p className="text-sm text-slate-700">{point}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <p className="text-sm text-slate-600">{content.helper}</p>
          <Button href="/orders/track" variant="secondary" className="font-semibold">
            {content.trackCta}
          </Button>
          <Link href="/support" className="text-sm font-semibold text-indigo-600">
            {t.pages.contact.supportCta}
          </Link>
        </div>
      </section>
    </div>
  );
}
