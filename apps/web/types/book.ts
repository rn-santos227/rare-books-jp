import { Category } from "./category";
import { Genre } from "./genre";

export type Book = {
  _id: string;
  title: string;
  titleJa?: string | null;
  author?: string;
  authorJa?: string | null;
  description?: string;
  descriptionJa?: string | null;
  price?: number | null;
  condition?: string | null;
  featured?: boolean;
  inventory?: number | null;
  slug?: string;
  imageUrl?: string | null;
  coverAlt?: string | null;
  gallery?: string[];
  marketplaceUrl?: string | null;
  category?: Category | null;
  genres?: Genre[];
  createdAt?: string;
};
