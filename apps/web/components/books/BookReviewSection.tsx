"use client";

import { useMemo } from "react";

import { ToastStack } from "@/components/toast/ToastStack";
import { useToast } from "@/components/toast/hooks/useToast";
import { Button } from "@/components/ui/Button";
import { RatingDisplay } from "@/components/ui/RatingDisplay";
import { RatingInput } from "@/components/ui/RatingInput";
import { TextArea } from "@/components/ui/TextArea";
import { TextField } from "@/components/ui/TextField";
import { useReviewForm } from "./hooks/useReviewForm";
import { Review } from "@/types/review";

type BookReviewSectionProps = {
  bookId: string;
  reviews: Review[];
};

function ReviewCard({ review }: { review: Review }) {
  const reviewer = review.reviewerName || "Anonymous reader";
  const body = review.bodyText || "No written feedback.";
  const date = review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{review.title || reviewer}</p>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {review.reviewType === "editorial" ? "Editorial" : "Reader review"}
          </p>
        </div>
        <RatingDisplay rating={review.rating} showValue={false} ariaLabel={`Rating: ${review.rating ?? "no"} out of 5`} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{body}</p>
      {date && <p className="mt-3 text-xs text-slate-400">{date}</p>}
    </article>
  );
}


export function BookReviewSection({ bookId, reviews }: BookReviewSectionProps) {
  const { toasts, show, dismiss, toneStyles } = useToast();
  const { formState, setFormState, errors, isSubmitting, handleSubmit } = useReviewForm({
    bookId,
    onSuccess: () =>
      show({
        title: "Review submitted",
        description: "Thanks! New reviews appear after they are approved.",
        tone: "success",
      }),
    onError: (message) =>
      show({
        title: "Could not submit review",
        description: message,
        tone: "warning",
      }),
  });
}
