import { CATEGORIES_QUERY } from "@/constants/queries";
import { CollectionsPageClient } from "@/components/info/CollectionsPageClient";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";
import { TranslatedInfoPageHeader } from "@/components/layouts/TranslatedInfoPageHeader";
import { sanityClient } from "@/lib/sanity.client";
import { Category } from "@/types/category";

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const categories = await sanityClient.fetch<Category[]>(CATEGORIES_QUERY);

  return (
    <PageLayout
      header={<TranslatedInfoPageHeader section="collections" />}
      footer={<SiteFooter />}
      contentGap="gap-12"
      contentPadding="px-6 py-12"
      backgroundTone="muted"
    >
      <CollectionsPageClient categories={categories} />
    </PageLayout>
  );
}
