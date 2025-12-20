import { PrivacyPageClient } from "@/components/info/PrivacyPageClient";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";
import { TranslatedInfoPageHeader } from "@/components/layouts/TranslatedInfoPageHeader";

export default function PrivacyPage() {
  return (
    <PageLayout
      header={<TranslatedInfoPageHeader section="privacy" />}
      footer={<SiteFooter />}
      contentGap="gap-12"
      contentPadding="px-6 py-12"
      backgroundTone="muted"
    >
      <PrivacyPageClient />
    </PageLayout>
  );
}
