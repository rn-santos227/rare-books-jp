import { AboutPageClient } from "@/components/info/AboutPageClient";
import { TranslatedInfoPageHeader } from "@/components/layouts/TranslatedInfoPageHeader";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";

export default function AboutPage() {
  return (
    <PageLayout
      header={<TranslatedInfoPageHeader section="about" />}
      footer={<SiteFooter />}
      contentGap="gap-12"
      contentPadding="px-6 py-12"
      backgroundTone="muted"
    >
      <AboutPageClient />
    </PageLayout>
  );
}
