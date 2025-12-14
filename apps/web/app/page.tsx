import { DiscoverySections } from "@/components/home/DiscoverySections";
import { HomeHeader, QuickFilterItem } from "@/components/home/HomeHeader";
import { PromotionHero } from "@/components/home/PromotionHero";
import { HomePageLayout } from "@/components/home/layouts/HomePageLayout";
import { GeneralHeaderLayout } from "@/components/layouts/GeneralHeaderLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";
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

  const quickFilters: QuickFilterItem[] = genres.length
    ? genres.map((genre) => ({ key: genre._id, label: genre.name }))
    : categories.slice(0, 7).map((category) => ({
        key: category._id,
        label: category.name,
      }));

  const promotion = promotions[0];

  return (
    <HomePageLayout
      header={
        <GeneralHeaderLayout>
          <HomeHeader quickFilters={quickFilters} />
        </GeneralHeaderLayout>
      }
      banner={
        <PromotionHero
          categoriesCount={categories.length}
          genresCount={genres.length}
          promotion={promotion}
        />
      }
      footer={<SiteFooter />}
    >
      <DiscoverySections books={books} categories={categories} genres={genres} />
    </HomePageLayout>
  );
}

