import { useLanguage, useTranslations } from "@/context/LanguageContext";
import { getConditionLabel, getLocalizedText } from "@/lib/localization";
import { Book } from "@/types/book";

export function formatPriceLabel(price: number | null | undefined, fallbackLabel: string) {
  if (!price && price !== 0) return fallbackLabel;
  return `¥${price.toLocaleString()}`;
}

export function useBookCopy(book: Book) {
  const { language } = useLanguage();
  const t = useTranslations();

  const title = getLocalizedText(language, book.title, book.titleJa);
  const author =
    getLocalizedText(language, book.author, book.authorJa) || t.common.unknownAuthor;
  const description =
    getLocalizedText(language, book.description, book.descriptionJa) ||
    t.book.descriptionFallback;
  const conditionLabel = getConditionLabel(language, book.condition);
  const categoryLabel = getLocalizedText(language, book.category?.name, book.category?.nameJa);
  const genreLabels = book.genres?.map((genre) =>
    getLocalizedText(language, genre.name, genre.nameJa),
  );
  const inventoryLabel =
    book.inventory === undefined || book.inventory === null
      ? null
      : book.inventory > 0
        ? t.book.inventoryInStock(book.inventory)
        : t.book.inventoryOutOfStock;

  return {
    t,
    language,
    title,
    author,
    description,
    conditionLabel,
    categoryLabel,
    genreLabels,
    inventoryLabel,
  };
}
