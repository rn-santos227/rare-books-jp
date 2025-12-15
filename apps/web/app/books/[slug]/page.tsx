import { notFound } from "next/navigation";

import { BookPageClient } from "@/components/book/BookPageClient";
import { BOOK_BY_SLUG_QUERY, REVIEWS_BY_BOOK_QUERY } from "@/constants/queries";
import { sanityClient } from "@/lib/sanity.client";
import { Book } from "@/types/book";
import { Review } from "@/types/review";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageParams = {
  params: Promise<{ slug?: string | string[] }>;
};

export default async function BookPage({ params }: PageParams) {
  const resolvedParams = await params;
  const slug = Array.isArray(resolvedParams?.slug)
    ? resolvedParams.slug[0]
    : resolvedParams?.slug;

  if (!slug) {
    return notFound();
  }

  const [book, reviews] = await Promise.all([
    sanityClient.fetch<Book | null>(BOOK_BY_SLUG_QUERY, { slug }),
    sanityClient.fetch<Review[]>(REVIEWS_BY_BOOK_QUERY, { slug }),
  ]);

  if (!book) {
    return notFound();
  }

  return <BookPageClient book={book} reviews={reviews} />;
}
