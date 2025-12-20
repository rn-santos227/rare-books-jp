import { GENRES_QUERY } from "@/constants/queries";
import { GenresPageClient } from "@/components/info/GenresPageClient";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";
import { TranslatedInfoPageHeader } from "@/components/layouts/TranslatedInfoPageHeader";
import { sanityClient } from "@/lib/sanity.client";
import { Genre } from "@/types/genre";

export const dynamic = "force-dynamic";

export default async function GenresPage() {
  const genres = await sanityClient.fetch<Genre[]>(GENRES_QUERY);

  return (
    <PageLayout
      header={<TranslatedInfoPageHeader section="genres" />}
      footer={<SiteFooter />}
      contentGap="gap-12"
      contentPadding="px-6 py-12"
      backgroundTone="muted"
    >
      <GenresPageClient genres={genres} />
    </PageLayout>
  );
}
