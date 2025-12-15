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


const MIN_REVIEW_LENGTH = 10;

export function useReviewForm({ bookId, onSuccess, onError }: UseReviewFormParams) {
  const [formState, setFormState] = useState<ReviewFormState>({
    reviewerName: "",
    rating: "5",
    bodyText: "",
  });
  const [errors, setErrors] = useState<ReviewFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
}
