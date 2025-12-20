"use client";

import { useTranslations } from "@/context/LanguageContext";

export function CareersPageClient() {
  const t = useTranslations();
  const careers = t.pages.careers;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          {careers.eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{careers.title}</h1>
        <p className="mt-3 max-w-3xl text-slate-600">{careers.description}</p>

        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{careers.openingsTitle}</h2>
            <div className="mt-3 grid gap-4 lg:grid-cols-3">
              {careers.openings.map((opening) => (
                <div
                  key={opening.title}
                  className="flex h-full flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-5"
                >
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-slate-900">{opening.title}</h3>
                    <p className="text-xs uppercase tracking-wide text-indigo-600">
                      {opening.location} · {opening.type}
                    </p>
                  </div>
                  <p className="text-sm text-slate-600">{opening.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">{careers.valuesTitle}</h2>
            <div className="mt-3 grid gap-4 md:grid-cols-3">
              {careers.values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-slate-100 bg-white px-4 py-5 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-slate-900">{value.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{value.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
