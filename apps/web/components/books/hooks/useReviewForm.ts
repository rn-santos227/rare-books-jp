import { FormEvent, useMemo, useState } from "react";

export type ReviewFormState = {
  reviewerName: string;
  rating: string;
  bodyText: string;
};

export type ReviewFormErrors = Partial<Record<keyof ReviewFormState, string>>;

type UseReviewFormParams = {
  bookId: string;
  onSuccess?: () => void;
  onError?: (message: string) => void;
};

