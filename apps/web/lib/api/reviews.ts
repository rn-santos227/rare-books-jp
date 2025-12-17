export type ReviewSubmission = {
  bookId: string;
  reviewerName: string;
  rating: number;
  bodyText: string;
};

export async function submitReview({ bookId, reviewerName, rating, bodyText }: ReviewSubmission) {
  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bookId,
      reviewerName,
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
