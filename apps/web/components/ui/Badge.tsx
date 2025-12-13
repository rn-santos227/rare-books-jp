import { HTMLAttributes } from "react";

type BadgeTone = "neutral" | "success" | "warning" | "info";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

const toneStyles: Record<BadgeTone, string> = {
  neutral: "bg-gray-100 text-gray-900 ring-gray-200",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  warning: "bg-amber-50 text-amber-700 ring-amber-100",
  info: "bg-indigo-50 text-indigo-700 ring-indigo-100",
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  const classes = [
    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
    toneStyles[tone],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes} {...props} />;
}
