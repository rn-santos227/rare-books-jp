import { ReturnsPageClient } from "@/components/info/ReturnsPageClient";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";
import { TranslatedInfoPageHeader } from "@/components/layouts/TranslatedInfoPageHeader";

export default function ReturnsPage() {
  return (
    <PageLayout
      header={<TranslatedInfoPageHeader section="returns" />}
      footer={<SiteFooter />}
      contentGap="gap-12"
      contentPadding="px-6 py-12"
      backgroundTone="muted"
    >
      <ReturnsPageClient />
    </PageLayout>
  );
}
