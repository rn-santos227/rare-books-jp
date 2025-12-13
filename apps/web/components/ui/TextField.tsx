import { ForwardedRef, TextareaHTMLAttributes, forwardRef } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
  error?: string;
};

export const TextArea = forwardRef(function TextArea(
  { label, helperText, error, className, rows = 4, ...props }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const fieldClasses = [
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100",
    error ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
      {label && <span>{label}</span>}
      <textarea ref={ref} className={fieldClasses} rows={rows} {...props} />
      {error ? (
        <span className="text-xs font-normal text-rose-600">{error}</span>
      ) : helperText ? (
        <span className="text-xs font-normal text-gray-500">{helperText}</span>
      ) : null}
    </label>
  );
});
