export type FavoriteItem = {
  id: string;
  slug?: string;
  title?: string | null;
  author?: string | null;
  imageUrl?: string | null;
  price?: number | null;
  marketplaceUrl?: string | null;
};

export type Favorites = FavoriteItem[];
