"use client";

import { GeneralFooterLayout } from "@/components/layouts/GeneralFooterLayout";
import { useTranslations } from "@/context/LanguageContext";

export function SiteFooter() {
  const t = useTranslations();

  return (
    <GeneralFooterLayout maxWidthClassName="max-w-screen-2xl" padding="px-8 py-6">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <div className="text-lg font-semibold text-white">{t.common.siteName}</div>
          <p className="text-sm text-slate-400">{t.footer.description}</p>
        </div>

        {t.footer.sections.map((section) => (
          <div key={section.heading} className="space-y-3 text-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {section.heading}
            </div>
            <ul className="space-y-2 text-slate-300">
              {section.links.map((link) => (
                <li key={link}>
                  {link === "Help center" || link === "ヘルプセンター" ? (
                    <a href="/support" className="transition hover:text-white">
                      {link}
                    </a>
                  ) : (
                    link
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {t.common.siteName}. {t.footer.rights}
        </span>
        <div className="flex flex-wrap gap-4">
          <span>{t.footer.privacy}</span>
          <span>{t.footer.terms}</span>
          <span>{t.footer.cookies}</span>
        </div>
      </div>
    </GeneralFooterLayout>
  );
}
