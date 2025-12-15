import { notFound } from "next/navigation";

import { BookPageClient } from "@/components/book/BookPageClient";
import { BOOK_BY_SLUG_QUERY, REVIEWS_BY_BOOK_QUERY } from "@/constants/queries";
import { sanityClient } from "@/lib/sanity.client";
import { Book } from "@/types/book";
import { Review } from "@/types/review";

type PageParams = {
  params: {
    slug: string;
  };
};

export default async function BookPage({ params }: PageParams) {
  const { slug } = params;
  const [book, reviews] = await Promise.all([
    sanityClient.fetch<Book | null>(BOOK_BY_SLUG_QUERY, { slug }),
    sanityClient.fetch<Review[]>(REVIEWS_BY_BOOK_QUERY, { slug }),
  ]);

  if (!book) {
    notFound();
  }

  return <BookPageClient book={book} reviews={reviews} />;
}
