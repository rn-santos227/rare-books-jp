import { CareersPageClient } from "@/components/info/CareersPageClient";
import { TranslatedInfoPageHeader } from "@/components/layouts/TranslatedInfoPageHeader";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";

export default function CareersPage() {
  return (
    <PageLayout
      header={<TranslatedInfoPageHeader section="careers" />}
      footer={<SiteFooter />}
      contentGap="gap-12"
      contentPadding="px-6 py-12"
      backgroundTone="muted"
    >
      <CareersPageClient />
    </PageLayout>
  );
}
