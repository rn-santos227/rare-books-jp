"use client";

import { useTranslations } from "@/context/LanguageContext";

import { PolicyPageClient } from "./PolicyPageClient";

export function PrivacyPageClient() {
  const t = useTranslations();
  return <PolicyPageClient policy={t.pages.privacy} />;
}
