"use client";

import { useTranslations } from "@/context/LanguageContext";

import { PolicyPageClient } from "./PolicyPageClient";

export function TermsPageClient() {
  const t = useTranslations();
  return <PolicyPageClient policy={t.pages.terms} />;
}
