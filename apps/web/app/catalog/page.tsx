import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { CatalogPageClient } from "@/components/catalog/CatalogPageClient";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";
import { BOOKS_QUERY, CATEGORIES_QUERY, GENRES_QUERY } from "@/constants/queries";
import { sanityClient } from "@/lib/sanity.client";
import { Book } from "@/types/book";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";

export default async function CatalogPage() {
  const [books, categories, genres] = await Promise.all([
    sanityClient.fetch<Book[]>(BOOKS_QUERY),
    sanityClient.fetch<Category[]>(CATEGORIES_QUERY),
    sanityClient.fetch<Genre[]>(GENRES_QUERY),
  ]);

  return (
    <PageLayout
      header={<CatalogHeader />}
      footer={<SiteFooter />}
      contentGap="gap-12"
      contentPadding="px-6 py-12"
    >
      <CatalogPageClient books={books} categories={categories} genres={genres} />
    </PageLayout>
  );
}
