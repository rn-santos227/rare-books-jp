import { FormEvent, useMemo, useState } from "react";

import { submitReview } from "@/lib/api/reviews";

export type ReviewFormState = {
  reviewerName: string;
  reviewerEmail: string;
  title: string;
  rating: string;
  bodyText: string;
};

export type ReviewFormErrors = Partial<Record<keyof ReviewFormState, string>>;

type UseReviewFormParams = {
  bookId: string;
  onSuccess?: (message?: string) => void;
  onError?: (message: string) => void;
};

const MIN_REVIEW_LENGTH = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useReviewForm({ bookId, onSuccess, onError }: UseReviewFormParams) {
  const [formState, setFormState] = useState<ReviewFormState>({
    reviewerName: "",
    reviewerEmail: "",
    title: "",
    rating: "5",
    bodyText: "",
  });
  const [errors, setErrors] = useState<ReviewFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ratingNumber = useMemo(() => Number(formState.rating) || 0, [formState.rating]);
  const validate = (): ReviewFormErrors => {
    const validationErrors: ReviewFormErrors = {};

    if (!formState.bodyText.trim()) {
      validationErrors.bodyText = "Please share a few words about the book.";
    } else if (formState.bodyText.trim().length < MIN_REVIEW_LENGTH) {
      validationErrors.bodyText = `Reviews should be at least ${MIN_REVIEW_LENGTH} characters.`;
    }

    if (!formState.reviewerEmail.trim()) {
      validationErrors.reviewerEmail = "Please enter your email.";
    } else if (!EMAIL_REGEX.test(formState.reviewerEmail.trim())) {
      validationErrors.reviewerEmail = "Enter a valid email address.";
    }

    if (ratingNumber < 1 || ratingNumber > 5) {
      validationErrors.rating = "Choose a rating between 1 and 5.";
    }

    return validationErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstError =
        validationErrors.bodyText || validationErrors.reviewerEmail || validationErrors.rating;
      if (firstError) {
        onError?.(firstError);
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const message = await submitReview({
        bookId,
        reviewerName: formState.reviewerName || "Anonymous Reader",
        reviewerEmail: formState.reviewerEmail.trim(),
        title: formState.title.trim(),
        rating: ratingNumber,
        bodyText: formState.bodyText,
      });

      setFormState({ reviewerName: "", reviewerEmail: "", title: "", rating: "5", bodyText: "" });
      setErrors({});
      onSuccess?.(message);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try again shortly.";
      onError?.(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formState,
    setFormState,
    errors,
    isSubmitting,
    handleSubmit,
    setErrors,
  };
}
