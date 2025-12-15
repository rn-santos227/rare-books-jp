import clsx from "clsx";

const STARS = [1, 2, 3, 4, 5];

type RatingDisplayProps = {
  rating?: number | null;
  showValue?: boolean;
  className?: string;
  emptyLabel?: string;
  ariaLabel?: string;
};

export function RatingDisplay({
  rating,
  showValue = true,
  className,
  emptyLabel = "No ratings yet",
  ariaLabel,
}: RatingDisplayProps) {
  if (!rating) {
    return <span className="text-sm text-slate-500">{emptyLabel}</span>;
  }

  return (
    <div
      className={clsx("flex items-center gap-1 text-amber-500", className)}
      aria-label={ariaLabel ?? `Rating: ${rating.toFixed(1)} out of 5`}
    >
      {STARS.map((value) => (
        <span key={value} aria-hidden>
          {value <= Math.round(rating) ? "★" : "☆"}
        </span>
      ))}
      {showValue && <span className="text-sm font-semibold text-slate-700">{rating.toFixed(1)} / 5</span>}
    </div>
  );
}

