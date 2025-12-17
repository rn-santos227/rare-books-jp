"use client";

import { Badge, Button, ImageViewer } from "@/components/ui";
import { Book } from "@/types/book";

function formatPrice(price?: number | null) {
  if (!price && price !== 0) return "Ask";
  return `¥${price.toLocaleString()}`;
}

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  return (
    <article className="group grid h-full grid-rows-[auto,1fr] gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden rounded-xl bg-slate-50">
        <div className="aspect-3/4 overflow-hidden">
          <ImageViewer
            src={book.imageUrl}
            alt={book.title}
            fallbackLabel="Cover coming soon"
            className="h-full w-full"
            imgClassName="transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3 text-xs font-semibold text-white">
          {book.condition && (
            <Badge
              tone="info"
              className="bg-black/60 text-white shadow-sm ring-1 ring-white/30"
            >
              {book.condition.replace("_", " ")}
            </Badge>
          )}
          {book.featured && (
            <span className="rounded-full bg-[#ff5f6d] px-3 py-1 text-[11px] font-semibold text-white shadow">
              Featured
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-sm font-bold text-white drop-shadow">
          <span className="rounded-full bg-linear-to-r from-[#ff5f6d] to-[#ffb347] px-3 py-1">
            {formatPrice(book.price)}
          </span>
          {book.inventory !== undefined && book.inventory !== null && (
            <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-semibold">
              {book.inventory} left
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug text-slate-900 wrap-break-word">{book.title}</h3>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Live</span>
        </div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {book.author ?? "Unknown author"}
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          {book.category && <Badge tone="neutral">{book.category.name}</Badge>}
          {book.genres?.slice(0, 2).map((genre) => (
            <Badge key={genre._id} tone="neutral">
              {genre.name}
            </Badge>
          ))}
        </div>
        <p className="line-clamp-2 text-sm text-slate-600">
          {book.description ?? "Added from Studio. Complete description coming soon."}
        </p>
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
          View details
        </Button>
      </div>
    </article>
  );
}
