import { HomePageClient } from "@/components/home/HomePageClient";
import { HomePageHeader } from "@/components/home/HomePageHeader";
import { PromotionHero } from "@/components/home/PromotionHero";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";
import {
  CATEGORIES_QUERY,
  GENRES_QUERY,
  HOME_BOOKS_QUERY,
  PROMOTIONS_QUERY,
} from "@/constants/queries";
import { sanityClient } from "@/lib/sanity.client";
import { Book } from "@/types/book";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";
import { Promotion } from "@/types/promotion";

export default async function Home() {
  const [books, categories, genres, promotions] = await Promise.all([
    sanityClient.fetch<Book[]>(HOME_BOOKS_QUERY),
    sanityClient.fetch<Category[]>(CATEGORIES_QUERY),
    sanityClient.fetch<Genre[]>(GENRES_QUERY),
    sanityClient.fetch<Promotion[]>(PROMOTIONS_QUERY),
  ]);

  return (
    <PageLayout
      header={<HomePageHeader categories={categories} genres={genres} />}
      hero={
        <PromotionHero
          categoriesCount={categories.length}
          genresCount={genres.length}
          promotions={promotions ?? []}
        />
      }
      footer={<SiteFooter />}
      maxWidthClassName="max-w-[1200px] w-full"
      contentPadding="px-10 sm:px-16 py-16"
      contentGap="gap-16"
      contentClassName="w-full"
    >
      <HomePageClient books={books} categories={categories} genres={genres} />
    </PageLayout>
  );
}

