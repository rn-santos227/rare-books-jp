"use client";

import Link from "next/link";
import { useState } from "react";

import { ImageViewer, Button } from "@/components/ui";
import { useFavorites } from "@/hooks/useFavorites";
import { useTranslations } from "@/context/LanguageContext";

export function FavoritesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites, removeFavorite } = useFavorites();
  const t = useTranslations();

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="rounded-full bg-white/5 px-5 py-2.5 text-white ring-1 ring-white/10 hover:bg-white/10"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="mr-1">{t.common.favorites}</span>
        {favorites.length > 0 && (
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-white/20 px-2 text-xs font-bold">
            {favorites.length}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 z-30 mt-3 w-80 max-w-md rounded-2xl bg-white p-4 text-slate-900 shadow-2xl ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-900">{t.favoritesMenu.title}</p>
            <button
              type="button"
              className="text-xs font-semibold text-slate-500 transition hover:text-slate-700"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          {favorites.length === 0 ? (
            <p className="mt-3 text-sm text-slate-600">{t.favoritesMenu.empty}</p>
          ) : (
            <ul className="mt-3 space-y-3 max-h-96 overflow-auto pr-1">
              {favorites.map((favorite) => (
                <li
                  key={favorite.id}
                  className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                >
                  <div className="h-16 w-12 overflow-hidden rounded-lg bg-slate-100">
                  <div className="h-16 w-12 overflow-hidden rounded-lg bg-slate-100">
                    <ImageViewer
                      src={favorite.imageUrl}
                      alt={favorite.title ?? t.common.coverFallback}
                      fallbackLabel={null}
                      className="h-full"
                      imgClassName="h-full w-full object-cover"
                    />
                  </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-1 text-sm">
                    <p className="line-clamp-2 font-semibold text-slate-900">
                      {favorite.title ?? t.common.coverFallback}
                    </p>
                    <p className="text-xs text-slate-500">
                      {favorite.author || t.common.unknownAuthor}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                      <Link
                        href={favorite.slug ? `/books/${favorite.slug}` : "#"}
                        className={`rounded-full px-3 py-1 ring-1 ring-slate-200 transition hover:bg-slate-100 ${
                          favorite.slug ? "text-indigo-700" : "pointer-events-none text-slate-300"
                        }`}
                        onClick={() => setIsOpen(false)}
                        aria-disabled={!favorite.slug}
                      >
                        {t.favoritesMenu.goToBook}
                      </Link>
                      <button
                        type="button"
                        className="rounded-full px-3 py-1 text-rose-600 ring-1 ring-rose-200 transition hover:bg-rose-50"
                        onClick={() => removeFavorite(favorite.id)}
                      >
                        {t.favoritesMenu.remove}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
