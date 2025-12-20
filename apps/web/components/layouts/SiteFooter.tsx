"use client";

import { GeneralFooterLayout } from "@/components/layouts/GeneralFooterLayout";
import { useTranslations } from "@/context/LanguageContext";
import Link from "next/link";

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
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
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
          <Link href={t.footer.privacy.href} className="transition hover:text-white">
            {t.footer.privacy.label}
          </Link>
          <Link href={t.footer.terms.href} className="transition hover:text-white">
            {t.footer.terms.label}
          </Link>
          <Link href={t.footer.cookies.href} className="transition hover:text-white">
            {t.footer.cookies.label}
          </Link>
        </div>
      </div>
    </GeneralFooterLayout>
  );
}
