"use client";

import clsx from "clsx";
import {
  FocusEvent,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
  cloneElement,
  useId,
  useState,
} from "react";

type TooltipPlacement = "top" | "bottom" | "left" | "right";

type TooltipProps<T extends HTMLElement = HTMLElement> = {
  content: ReactNode;
  children: ReactElement<HTMLAttributes<T>>;
  placement?: TooltipPlacement;
  className?: string;
};

const placementClasses: Record<TooltipPlacement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export function Tooltip<T extends HTMLElement = HTMLElement>({
  content,
  children,
  placement = "top",
  className,
}: TooltipProps<T>) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mergedChild = cloneElement(children, {
    ...children.props,
    onFocus: (event: FocusEvent<T>) => {
      children.props.onFocus?.(event);
      handleOpen();
    },
    onBlur: (event: FocusEvent<T>) => {
      children.props.onBlur?.(event);
      handleClose();
    },
    onMouseEnter: (event: MouseEvent<T>) => {
      children.props.onMouseEnter?.(event);
      handleOpen();
    },
    onMouseLeave: (event: MouseEvent<T>) => {
      children.props.onMouseLeave?.(event);
      handleClose();
    },
    "aria-describedby": tooltipId,
  });

  return (
    <span className="relative inline-flex">
      {mergedChild}
      <span
        role="tooltip"
        id={tooltipId}
        aria-hidden={!open}
        className={clsx(
          "pointer-events-none absolute z-30 max-w-xs rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white shadow-lg ring-1 ring-black/5 transition-all duration-150",
          "transform-gpu",
          open ? "opacity-100 scale-100" : "opacity-0 scale-95",
          placementClasses[placement],
          className,
        )}
      >
        {content}
      </span>
    </span>
  );
}
