import clsx from "clsx";

const STARS = [1, 2, 3, 4, 5];

type RatingDisplayProps = {
  rating?: number | null;
  showValue?: boolean;
  className?: string;
  emptyLabel?: string;
  ariaLabel?: string;
};

