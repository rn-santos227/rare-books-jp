import clsx from "clsx";

const STARS = [1, 2, 3, 4, 5];

type RatingInputProps = {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  error?: string;
};

export function RatingInput({ value, onChange, label = "Rating", error }: RatingInputProps) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
      <span>{label}</span>
      <div className="flex items-center gap-2">
        {STARS.map((star) => {
          const selected = star <= value;
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className={clsx(
                "flex h-10 w-10 items-center justify-center rounded-full border text-lg transition",
                selected
                  ? "border-amber-200 bg-amber-50 text-amber-500 shadow-sm"
                  : "border-slate-200 bg-white text-slate-400 hover:border-amber-200 hover:text-amber-500"
              )}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              aria-pressed={selected}
            >
              {selected ? "★" : "☆"}
            </button>
          );
        })}
      </div>
      {error && <span className="text-xs font-normal text-rose-600">{error}</span>}
    </label>
  );
}
