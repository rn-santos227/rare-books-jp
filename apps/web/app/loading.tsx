import { GeneralHeaderLayout } from "@/components/layouts/GeneralHeaderLayout";
import { PageLayout } from "@/components/layouts/PageLayout";
import { SiteFooter } from "@/components/layouts/SiteFooter";
import { Spinner } from "@/components/ui";

export default function Loading() {
  return (
    <PageLayout
      backgroundTone="plain"
      header={
        <GeneralHeaderLayout>
          <div className="flex items-center justify-between gap-4">
            <div className="text-lg font-semibold text-white">The Rare Books JP</div>
            <div className="text-sm font-semibold text-indigo-100">Loading experience</div>
          </div>
        </GeneralHeaderLayout>
      }
      footer={<SiteFooter />}
      contentPadding="px-6 py-12"
      contentGap="gap-8"
    >
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-10 shadow-sm ring-1 ring-slate-200">
        <Spinner size="lg" label="Loading products and announcements" />
        <p className="text-sm text-slate-600">Please hold on while we prepare the latest details.</p>
      </div>
    </PageLayout>
  );
}
