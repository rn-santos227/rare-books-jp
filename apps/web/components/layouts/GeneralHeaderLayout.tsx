import { ReactNode } from "react";

interface GeneralHeaderLayoutProps {
  children: ReactNode;
  maxWidthClassName?: string;
  padding?: string;
  className?: string;
  containerClassName?: string;
}

function composeClassName(parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function GeneralHeaderLayout({
  children,
  maxWidthClassName = "max-w-6xl",
  padding = "px-6 py-5",
  className,
  containerClassName,
}: GeneralHeaderLayoutProps) {
  return (
    <header
      className={composeClassName([
        "sticky top-0 z-50 border-b border-white/5 bg-[#121420]/95 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur",
        className,
      ])}
    >
      <div
        className={composeClassName([
          "mx-auto flex w-full flex-col gap-4",
          maxWidthClassName,
          padding,
          containerClassName,
        ])}
      >
        {children}
      </div>
    </header>
  );
}
