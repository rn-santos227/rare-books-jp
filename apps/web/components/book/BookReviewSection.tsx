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


  const averageRating = useMemo(() => {
    if (!reviews.length) return null;
    const total = reviews.reduce((sum, review) => sum + (review.rating ?? 0), 0);
    return total / reviews.length;
  }, [reviews]);

  const ratingValue = Number(formState.rating) || 0;
  const reviewCountLabel = reviews.length === 1 ? "1 review" : `${reviews.length} reviews`;

  return (
    <section className="space-y-6 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Reviews</h2>
          <p className="text-sm text-slate-600">{reviewCountLabel}</p>
        </div>
        <RatingDisplay rating={averageRating} />
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-100">
        <div className="grid gap-4 sm:grid-cols-[1fr,140px] sm:items-end">
          <TextField
            label="Your name"
            placeholder="How should we credit you?"
            value={formState.reviewerName}
            onChange={(event) => setFormState((prev) => ({ ...prev, reviewerName: event.target.value }))}
          />
          <RatingInput
            value={ratingValue}
            onChange={(value) => setFormState((prev) => ({ ...prev, rating: String(value) }))}
            error={errors.rating}
          />
        </div>
        <TextArea
          label="Your review"
          placeholder="What did you enjoy, notice, or wish was different about this book?"
          value={formState.bodyText}
          onChange={(event) => setFormState((prev) => ({ ...prev, bodyText: event.target.value }))}
          rows={5}
          error={errors.bodyText}
        />
        <div className="flex items-center justify-end gap-3">
          <p className="text-xs text-slate-500">Reviews are published after a quick moderation check.</p>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Submit review"}
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-sm text-slate-600">No reviews yet. Be the first to share your thoughts.</p>
        ) : (
          reviews.map((review) => <ReviewCard key={review._id} review={review} />)
        )}
      </div>

      <ToastStack toasts={toasts} dismiss={dismiss} toneStyles={toneStyles} />
    </section>
  );
}
