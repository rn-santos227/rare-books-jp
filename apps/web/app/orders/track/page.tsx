import { OrderTrackerPageClient } from "@/components/order/OrderTrackerPageClient";
import { OrderTrackerHeader } from "@/components/order/OrderTrackerHeader";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";

export const dynamic = "force-dynamic";

export default function OrderTrackerPage() {
  return (
    <PageLayout
      header={<OrderTrackerHeader />}
      footer={<SiteFooter />}
      contentGap="gap-12"
      contentPadding="px-6 py-12"
    >
      <OrderTrackerPageClient />
    </PageLayout>
  );
}
