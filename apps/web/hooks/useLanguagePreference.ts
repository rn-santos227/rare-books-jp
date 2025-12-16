"use client";

import { useCallback, useEffect, useState } from "react";
import type { SupportedLanguage } from "@/constants/translations";
const LOCAL_STORAGE_KEY = "preferredLanguage";

export function useLanguagePreference(defaultLanguage: SupportedLanguage = "en") {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    if (typeof window === "undefined") return defaultLanguage;
    const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY) as SupportedLanguage | null;
    return stored === "ja" ? "ja" : defaultLanguage;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LOCAL_STORAGE_KEY, language);
  }, [language]);

  const toggleLanguage = useCallback(
    () => setLanguage((prev) => (prev === "en" ? "ja" : "en")),
    [],
  );

  return { language, setLanguage, toggleLanguage } as const;
}
