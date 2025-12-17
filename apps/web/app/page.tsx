import { HomePageClient } from "@/components/home/HomePageClient";
import {
  BOOKS_QUERY,
  CATEGORIES_QUERY,
  GENRES_QUERY,
  PROMOTIONS_QUERY,
} from "@/constants/queries";
import { sanityClient } from "@/lib/sanity.client";
import { Book } from "@/types/book";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";
import { Promotion } from "@/types/promotion";

export default async function Home() {
  const [books, categories, genres, promotions] = await Promise.all([
    sanityClient.fetch<Book[]>(BOOKS_QUERY),
    sanityClient.fetch<Category[]>(CATEGORIES_QUERY),
    sanityClient.fetch<Genre[]>(GENRES_QUERY),
    sanityClient.fetch<Promotion[]>(PROMOTIONS_QUERY),
  ]);

  return (
    <HomePageClient
      books={books}
      categories={categories}
      genres={genres}
      promotions={promotions}
    />
  );
}

