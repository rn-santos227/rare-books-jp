"use client";

import { useTranslations } from "@/context/LanguageContext";

export function AboutPageClient() {
  const t = useTranslations();
  const about = t.pages.about;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          {about.eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{about.title}</h1>
        <p className="mt-3 max-w-3xl text-slate-600">{about.description}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {about.sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-5"
            >
              <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{section.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-linear-to-br from-indigo-700 via-indigo-800 to-slate-900 p-8 text-white shadow-xl ring-1 ring-indigo-500/30 sm:p-10">
        <h2 className="text-2xl font-semibold">{about.highlightTitle}</h2>
        <p className="mt-3 max-w-3xl text-indigo-100">{about.highlightBody}</p>
      </section>
    </div>
  );
}
