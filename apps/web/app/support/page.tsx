import { PageLayout } from "@/components/layouts/PageLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";
import { SupportHeader } from "@/components/support/SupportHeader";
import { SupportPageClient } from "@/components/support/SupportPageClient";

export const dynamic = "force-dynamic";

export default function SupportPage() {
  return (
    <PageLayout
      header={<SupportHeader />}
      footer={<SiteFooter />}
      contentGap="gap-12"
      contentPadding="px-6 py-12"
      backgroundTone="muted"
    >
      <SupportPageClient />
    </PageLayout>
  );
}
