export type Review = {
  _id: string;
  reviewerName?: string | null;
  title?: string | null;
  rating?: number | null;
  reviewType?: "editorial" | "user";
  bodyText?: string;
  createdAt?: string;
};
