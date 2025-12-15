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

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Failed to submit" }));
    throw new Error(error.message || "Unable to send review");
  }
}
