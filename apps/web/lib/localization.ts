import { SupportedLanguage, translations } from "@/constants/translations";

export function getLocalizedText(
  language: SupportedLanguage,
  defaultValue?: string | null,
  japaneseValue?: string | null,
) {
  if (language === "ja") {
    return japaneseValue || defaultValue || "";
  }

  return defaultValue || japaneseValue || "";
}

export function getConditionLabel(
  language: SupportedLanguage,
  condition?: string | null,
) {
  if (!condition) return "";
  const labels = translations[language].filters.conditionLabels;
  return labels[condition as keyof typeof labels] || condition.replace("_", " ");
}
