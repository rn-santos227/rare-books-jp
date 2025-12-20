import { CareersPageClient } from "@/components/info/CareersPageClient";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";
import { TranslatedInfoPageHeader } from "@/components/layouts/TranslatedInfoPageHeader";
import { CAREERS_QUERY } from "@/constants/queries";
import { sanityClient } from "@/lib/sanity.client";
import { Career } from "@/types/career";

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const openings = (await sanityClient.fetch<Career[]>(CAREERS_QUERY)) ?? [];

  return (
    <PageLayout
      header={<TranslatedInfoPageHeader section="careers" />}
      footer={<SiteFooter />}
      contentGap="gap-12"
      contentPadding="px-6 py-12"
      backgroundTone="muted"
    >
      <CareersPageClient openings={openings} />
    </PageLayout>
  );
}
