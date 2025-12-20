import { ReactNode } from "react";

type PageBackgroundTone = "muted" | "plain";
interface PageLayoutProps {
  header?: ReactNode;
  hero?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  maxWidthClassName?: string;
  contentPadding?: string;
  contentGap?: string;
  contentClassName?: string;
  backgroundTone?: PageBackgroundTone;
  mainClassName?: string;
}

function composeClassName(parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function PageLayout({
  header,
  hero,
  children,
  footer,
  maxWidthClassName = "max-w-7xl",
  contentPadding = "px-8 py-12",
  contentGap = "gap-10",
  contentClassName,
  backgroundTone = "muted",
  mainClassName,
}: PageLayoutProps) {
  const backgroundClasses =
    backgroundTone === "plain"
      ? "bg-white text-slate-900"
      : "bg-slate-50 text-slate-900";

  return (
    <main
      className={composeClassName([
        "flex min-h-screen flex-col transition-colors",
        backgroundClasses,
        mainClassName,
      ])}
    >
      {header}
      {hero}
      <div
        className={composeClassName([
          "mx-auto flex flex-1 flex-col",
          maxWidthClassName,
          contentPadding,
          contentGap,
          contentClassName,
        ])}
      >
        {children}
      </div>
      {footer}
    </main>
  );
}
