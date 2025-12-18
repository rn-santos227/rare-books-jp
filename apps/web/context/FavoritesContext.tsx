"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

import { Book } from "@/types/book";
import { FavoriteItem, Favorites } from "@/types/favorite";

export type FavoritesContextValue = {
  favorites: Favorites;
  toggleFavorite: (book: Book) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id?: string) => boolean;
};

const COOKIE_KEY = "favoriteBooks";
export const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

function parseFavoritesFromCookie(): Favorites {
  if (typeof document === "undefined") return [];
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_KEY}=`));

  if (!cookie) return [];

  try {
    const value = decodeURIComponent(cookie.split("=")[1] ?? "");
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.error("Unable to parse favorites cookie", error);
  }

  return [];
}

function persistFavorites(favorites: Favorites) {
  const encoded = encodeURIComponent(JSON.stringify(favorites));
  const maxAge = 60 * 60 * 24 * 30;
  document.cookie = `${COOKIE_KEY}=${encoded}; path=/; max-age=${maxAge}`;
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Favorites>(() => parseFavoritesFromCookie());

  useEffect(() => {
    persistFavorites(favorites);
  }, [favorites]);

  const toggleFavorite = (book: Book) => {
    if (!book?._id) return;

    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === book._id);
      if (exists) {
        return prev.filter((fav) => fav.id !== book._id);
      }

      const next: FavoriteItem = {
        id: book._id,
        slug: book.slug,
        title: book.title,
        author: book.author,
        imageUrl: book.imageUrl,
        price: book.price,
        marketplaceUrl: book.marketplaceUrl,
      };

      return [...prev, next];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const isFavorite = (id?: string) => {
    if (!id) return false;
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
