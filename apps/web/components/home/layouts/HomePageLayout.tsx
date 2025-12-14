import { ReactNode } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";

interface HomePageLayoutProps {
  header: ReactNode;
  banner: ReactNode;
  children: ReactNode;
}

export function HomePageLayout({ header, banner, children }: HomePageLayoutProps) {
  return (
    <PageLayout header={header} hero={banner}>
      {children}
    </PageLayout>
  );
}
