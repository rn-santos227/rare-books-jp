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

  const ratingNumber = useMemo(() => Number(formState.rating) || 0, [formState.rating]);
  const validate = (): ReviewFormErrors => {
    const validationErrors: ReviewFormErrors = {};

    if (!formState.bodyText.trim()) {
      validationErrors.bodyText = "Please share a few words about the book.";
    } else if (formState.bodyText.trim().length < MIN_REVIEW_LENGTH) {
      validationErrors.bodyText = `Reviews should be at least ${MIN_REVIEW_LENGTH} characters.`;
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
      if (validationErrors.bodyText) {
        onError?.(validationErrors.bodyText);
      }
      return;
    }

  };
}
