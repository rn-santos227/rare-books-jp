import { CookiesPageClient } from "@/components/info/CookiesPageClient";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";
import { TranslatedInfoPageHeader } from "@/components/layouts/TranslatedInfoPageHeader";

export default function CookiesPage() {
  return (
    <PageLayout
      header={<TranslatedInfoPageHeader section="cookies" />}
      footer={<SiteFooter />}
      contentGap="gap-12"
      contentPadding="px-6 py-12"
      backgroundTone="muted"
    >
      <CookiesPageClient />
    </PageLayout>
  );
}
