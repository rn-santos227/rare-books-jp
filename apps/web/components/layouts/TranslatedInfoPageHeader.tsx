"use client";

import { useTranslations } from "@/context/LanguageContext";

import { InfoPageHeader } from "./InfoPageHeader";

type InfoSectionKey =
  | "about"
  | "careers"
  | "contact"
  | "genres"
  | "collections"
  | "returns"
  | "privacy"
  | "terms"
  | "cookies";

export function TranslatedInfoPageHeader({ section }: { section: InfoSectionKey }) {
  const t = useTranslations();
  const badge = t.pages[section].eyebrow;

  return <InfoPageHeader badge={badge} />;
}
