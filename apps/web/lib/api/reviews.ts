export type ReviewSubmission = {
  bookId: string;
  reviewerName: string;
  reviewerEmail: string;
  title?: string;
  rating: number;
  bodyText: string;
};

export async function submitReview({
  bookId,
  reviewerName,
  reviewerEmail,
  title,
  rating,
  bodyText,
}: ReviewSubmission) {
  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bookId,
      reviewerName,
      reviewerEmail,
      title,
      rating,
      bodyText,
    }),
  });

  const payload = await response.json().catch(() => ({ message: "Failed to submit" }));

  if (!response.ok) {
    throw new Error(payload.message || "Unable to send review");
  }

  return typeof payload.message === "string" ? payload.message : undefined;
}
