import { ContactPageClient } from "@/components/info/ContactPageClient";
import { TranslatedInfoPageHeader } from "@/components/layouts/TranslatedInfoPageHeader";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";

export default function ContactPage() {
  return (
    <PageLayout
      header={<TranslatedInfoPageHeader section="contact" />}
      footer={<SiteFooter />}
      contentGap="gap-12"
      contentPadding="px-6 py-12"
      backgroundTone="muted"
    >
      <ContactPageClient />
    </PageLayout>
  );
}
