import { en } from "./en";
import { ja } from "./ja";
import type { SupportedLanguage, Translations } from "./types";

export * from "./types";
export { en, ja };

export const translations: Record<SupportedLanguage, Translations> = {
  en,
  ja,
};
