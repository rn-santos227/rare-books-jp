import clsx from "clsx";

const STARS = [1, 2, 3, 4, 5];

type RatingInputProps = {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  error?: string;
};

