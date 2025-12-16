import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type SharedProps = {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
};

type NativeButtonProps =
  SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type AnchorButtonProps =
  SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    type?: never;
  };

type ButtonProps = NativeButtonProps | AnchorButtonProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600",
  secondary:
    "bg-white text-gray-900 ring-1 ring-inset ring-gray-200 hover:ring-gray-300",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    fullWidth,
    className,
  } = props;

  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variantStyles[variant],
    fullWidth ? "w-full" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props) {
    const anchorProps = props as AnchorButtonProps;
    return (
      <a
        className={classes}
        {...anchorProps}
      />
    );
  }

  const buttonProps = props as NativeButtonProps;
  return (
    <button
      className={classes}
      {...buttonProps}
    />
  );
}
