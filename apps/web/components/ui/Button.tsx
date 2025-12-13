import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600",
  secondary:
    "bg-white text-gray-900 ring-1 ring-inset ring-gray-200 hover:ring-gray-300",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
};

export function Button({
  className,
  variant = "primary",
  fullWidth,
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variantStyles[variant],
    fullWidth ? "w-full" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <button className={classes} {...props} />;
}
