import { ReactNode } from "react";

type PageBackgroundTone = "muted" | "plain";

interface PageLayoutProps {
  header?: ReactNode;
  hero?: ReactNode;
  children: ReactNode;
  maxWidthClassName?: string;
  contentPadding?: string;
  contentGap?: string;
  contentClassName?: string;
  backgroundTone?: PageBackgroundTone;
  mainClassName?: string;
}
