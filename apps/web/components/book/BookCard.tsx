"use client";

import { Badge, Button, ImageViewer } from "@/components/ui";
import { FavoriteToggle } from "@/components/favorites/FavoriteToggle";
import { useLanguage, useTranslations } from "@/context/LanguageContext";
import { getConditionLabel, getLocalizedText } from "@/lib/localization";

import { Book } from "@/types/book";

function formatPrice(price: number | null | undefined, fallbackLabel: string) {
  if (!price && price !== 0) return fallbackLabel;
  return `¥${price.toLocaleString()}`;
}

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  const { language } = useLanguage();
  const t = useTranslations();
  const title = getLocalizedText(language, book.title, book.titleJa);
  const author = getLocalizedText(language, book.author, book.authorJa) || t.common.unknownAuthor;
  const description =
    getLocalizedText(language, book.description, book.descriptionJa) || t.book.descriptionFallback;
  const conditionLabel = getConditionLabel(language, book.condition);
  const categoryLabel = getLocalizedText(language, book.category?.name, book.category?.nameJa);
  const genreLabels = book.genres?.map((genre) => getLocalizedText(language, genre.name, genre.nameJa));
  const inventoryLabel =
    book.inventory === undefined || book.inventory === null
      ? null
      : book.inventory > 0
        ? t.book.inventoryInStock(book.inventory)
        : t.book.inventoryOutOfStock;

  return (
    <article className="group grid h-full grid-rows-[auto,1fr] gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden rounded-xl bg-slate-50">
        <div className="aspect-3/4 overflow-hidden">
          <ImageViewer
            src={book.imageUrl}
            alt={title}
            fallbackLabel={t.common.coverFallback}
            className="h-full w-full"
            imgClassName="transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute right-3 top-3">
          <FavoriteToggle book={book} size="sm" />
        </div>
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3 text-xs font-semibold text-white">
          {book.condition && (
            <Badge tone="info" className="bg-black/60 text-slate-800 shadow-sm ring-1 ring-white/30">
              {conditionLabel}
            </Badge>
          )}
          {book.featured && (
            <span className="rounded-full bg-[#ff5f6d] px-3 py-1 text-[11px] font-semibold text-white shadow">
              {t.book.featured}
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-sm font-bold text-white drop-shadow">
          <span className="rounded-full bg-linear-to-r from-[#ff5f6d] to-[#ffb347] px-3 py-1">
            {formatPrice(book.price, t.common.askPrice)}
          </span>
          {book.inventory !== undefined && book.inventory !== null && (
            <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-semibold">
              {inventoryLabel}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug text-slate-900 wrap-break-word">{title}</h3>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {t.common.liveLabel}
          </span>
        </div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{author}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          {categoryLabel && <Badge tone="neutral">{categoryLabel}</Badge>}
          {genreLabels?.slice(0, 2).map((genre, index) => (
            <Badge key={`${book._id}-genre-${index}`} tone="neutral">
              {genre}
            </Badge>
          ))}
        </div>
        <p className="line-clamp-2 text-sm text-slate-600">{description}</p>
        <Button
          variant="secondary"
          fullwidth
          className="mt-auto"
          href={book.slug ? `/books/${book.slug}` : "#"}
          aria-disabled={!book.slug}
          onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
            if (!book.slug) {
              event.preventDefault();
            }
          }}
        >
          {t.common.viewDetails}
        </Button>
      </div>
    </article>
  );
}
