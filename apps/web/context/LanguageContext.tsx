"use client";

import { createContext, ReactNode, useContext, useMemo } from "react";

import { SupportedLanguage, translations } from "@/constants/translations";
import { useLanguagePreference } from "@/hooks/useLanguagePreference";

type LanguageContextValue = {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({
  children,
  defaultLanguage = "en",
}: {
  children: ReactNode;
  defaultLanguage?: SupportedLanguage;
}) {
  const { language, setLanguage, toggleLanguage } = useLanguagePreference(defaultLanguage);
  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
    }),
    [language, setLanguage, toggleLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function useTranslations() {
  const { language } = useLanguage();
  return translations[language];
}

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const t = useTranslations();
  const nextLanguageLabel = language === "en" ? t.common.languageJapanese : t.common.languageEnglish;

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20"
    >
      {nextLanguageLabel}
    </button>
  );
}
