"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import ImageViewer from "@/components/ui/ImageViewer";
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
    <article className="group flex h-full flex-col gap-3 rounded-2xl bg-white/90 p-3 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-slate-100 via-white to-indigo-50">
        <div className="aspect-3/4 overflow-hidden">
          <ImageViewer
            src={book.imageUrl}
            alt={book.title}
            fallbackLabel="Cover coming soon"
            className="h-full w-full"
            imgClassName="transition duration-700 group-hover:scale-105"
          />
        </div>
        {book.condition && (
          <Badge
            tone="info"
            className="absolute left-3 top-3 bg-indigo-600/90 text-white ring-indigo-200"
          >
            {book.condition.replace("_", " ")}
          </Badge>
        )}
        {book.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-white shadow">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
            {book.title}
          </h3>
          <span className="text-sm font-bold text-indigo-700">
            {formatPrice(book.price)}
          </span>
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
          {book.inventory !== undefined && book.inventory !== null && (
            <Badge tone="success">{book.inventory} in stock</Badge>
          )}
        </div>
        <p className="line-clamp-2 text-sm text-slate-600">
          {book.description ?? "Added from Studio. Complete description coming soon."}
        </p>
        <Button variant="secondary" fullWidth className="mt-auto">
          View details
        </Button>
      </div>
    </article>
  );
}
