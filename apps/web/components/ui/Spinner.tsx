type SpinnerSize = "sm" | "md" | "lg";

type SpinnerProps = {
  size?: SpinnerSize;
  label?: string;
  className?: string;
};

const sizeStyles: Record<SpinnerSize, string> = {
  sm: "h-6 w-6 border-2",
  md: "h-10 w-10 border-[3px]",
  lg: "h-14 w-14 border-4",
};

export function Spinner({ size = "md", label, className }: SpinnerProps) {
  const spinnerClasses = [
    "inline-flex items-center justify-center rounded-full border border-indigo-200 border-t-indigo-600",
    "animate-spin",
    sizeStyles[size],
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperClasses = ["flex items-center gap-3 text-slate-700", className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={wrapperClasses} role="status" aria-live="polite">
      <span className={spinnerClasses} aria-hidden />
      {label && <span className="text-sm font-medium">{label}</span>}
      <span className="sr-only">{label ?? "Loading"}</span>
    </div>
  );
}
