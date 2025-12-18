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


