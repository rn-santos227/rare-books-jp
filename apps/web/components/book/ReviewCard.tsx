"use client";

import { Badge, RatingDisplay } from "@/components/ui";
import { useTranslations } from "@/context/LanguageContext";
import { Review } from "@/types/review";

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  const t = useTranslations();
  const reviewer = review.reviewerName || t.reviews.anonymous;
  const body = review.bodyText?.trim() || t.reviews.noBody;
  const date = review.createdAt ? new Date(review.createdAt).toLocaleDateString() : null;
  const reviewTone = review.reviewType === "editorial" ? "info" : "neutral";
  const reviewTypeLabel = review.reviewType === "editorial" ? t.reviews.editorial : t.reviews.reader;

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm ring-1 ring-inset ring-slate-100">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-slate-900">{review.title || reviewer}</p>
            <Badge tone={reviewTone}>{reviewTypeLabel}</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
            <span className="font-medium text-slate-700">{reviewer}</span>
            {date && (
              <span className="flex items-center gap-1 text-slate-500" aria-label={`Reviewed on ${date}`}>
                <span aria-hidden>•</span>
                {date}
              </span>
            )}
          </div>
        </div>
        <RatingDisplay
          rating={review.rating}
          showValue={false}
          ariaLabel={`Rating: ${review.rating ?? "no"} out of 5`}
        />
      </header>

      <p className="text-sm leading-relaxed text-slate-700">{body}</p>
    </article>
  );
}
