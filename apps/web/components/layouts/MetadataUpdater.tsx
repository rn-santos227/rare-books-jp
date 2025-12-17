"use client";

import { useEffect } from "react";

import { useLanguage, useTranslations } from "@/context/LanguageContext";

export function MetadataUpdater() {
  const { language } = useLanguage();
  const t = useTranslations();
  const { metaTitle, metaDescription } = t.common;

  useEffect(() => {
    document.title = metaTitle;
    document.documentElement.lang = language;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", metaDescription);
    }
  }, [language, metaDescription, metaTitle]);

  return null;
}
