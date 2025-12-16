import { ReactNode } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";

interface HomePageLayoutProps {
  header: ReactNode;
  banner: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export function HomePageLayout({ header, banner, children, footer }: HomePageLayoutProps) {
  return (
    <PageLayout header={header} hero={banner} footer={footer}>
      {children}
    </PageLayout>
  );
}
