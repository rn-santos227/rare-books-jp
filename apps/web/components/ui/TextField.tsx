import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: string;
};

export const TextField = forwardRef(function TextField(
  { label, helperText, error, className, ...props }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
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
      <input ref={ref} className={fieldClasses} {...props} />
      {error ? (
        <span className="text-xs font-normal text-rose-600">{error}</span>
      ) : helperText ? (
        <span className="text-xs font-normal text-gray-500">{helperText}</span>
      ) : null}
    </label>
  );
});
