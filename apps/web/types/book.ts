import { Category } from "./category";
import { Genre } from "./genre";

export type Book = {
  _id: string;
  title: string;
  author?: string;
  description?: string;
  price?: number | null;
  condition?: string | null;
  featured?: boolean;
  inventory?: number | null;
  slug?: string;
  imageUrl?: string | null;
  category?: Category | null;
  genres?: Genre[];
};
