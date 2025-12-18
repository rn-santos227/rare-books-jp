"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { Book } from "@/types/book";

export type FavoriteItem = {
  id: string;
  slug?: string;
  title?: string | null;
  author?: string | null;
  imageUrl?: string | null;
  price?: number | null;
  marketplaceUrl?: string | null;
};

type FavoritesContextValue = {
  favorites: FavoriteItem[];
  toggleFavorite: (book: Book) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id?: string) => boolean;
};

const COOKIE_KEY = "favoriteBooks";
const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

function parseFavoritesFromCookie(): FavoriteItem[] {
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

function persistFavorites(favorites: FavoriteItem[]) {
  const encoded = encodeURIComponent(JSON.stringify(favorites));
  const maxAge = 60 * 60 * 24 * 30; // 30 days
  document.cookie = `${COOKIE_KEY}=${encoded}; path=/; max-age=${maxAge}`;
}

