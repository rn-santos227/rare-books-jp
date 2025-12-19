"use client";

import { Book } from "@/types/book";
import { useFavorites } from "@/hooks/useFavorites";
import { useMounted } from "@/hooks/useMounted";

const sizeClasses: Record<"sm" | "md", string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-10 px-4 text-sm",
};

type FavoriteToggleProps = {
  book: Book;
  size?: "sm" | "md";
  className?: string;
  showLabel?: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
};

export function FavoriteToggle({
  book,
  size = "md",
  className,
  showLabel = false,
  activeLabel,
  inactiveLabel,
}: FavoriteToggleProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const mounted = useMounted();

  const active = mounted ? isFavorite(book._id) : false;

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(book)}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-semibold transition ${
        active
          ? "border-rose-200 bg-rose-50 text-rose-600"
          : "border-slate-200 bg-white/90 text-slate-600 hover:border-rose-200"
      } ${sizeClasses[size]} ${className ?? ""}`}
    >
      <span aria-hidden className="text-base">{active ? "♥" : "♡"}</span>
      {showLabel && <span>{active ? activeLabel ?? "Saved" : inactiveLabel ?? "Favorite"}</span>}
    </button>
  );
}
