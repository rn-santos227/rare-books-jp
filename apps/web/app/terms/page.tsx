import { TermsPageClient } from "@/components/info/TermsPageClient";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";
import { TranslatedInfoPageHeader } from "@/components/layouts/TranslatedInfoPageHeader";

export default function TermsPage() {
  return (
    <PageLayout
      header={<TranslatedInfoPageHeader section="terms" />}
      footer={<SiteFooter />}
      contentGap="gap-12"
      contentPadding="px-6 py-12"
      backgroundTone="muted"
    >
      <TermsPageClient />
    </PageLayout>
  );
}
