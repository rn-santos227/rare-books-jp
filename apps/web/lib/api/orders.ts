export type OrderSubmission = {
  bookId: string;
  buyerName: string;
  buyerEmail: string;
  message?: string;
};

export async function submitOrder({ bookId, buyerName, buyerEmail, message }: OrderSubmission) {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bookId,
      buyerName,
      buyerEmail,
      message,
    }),
  });

  const payload = await response.json().catch(() => ({ message: "Failed to submit" }));

  if (!response.ok) {
    throw new Error(payload.message || "Unable to send order");
  }

  return typeof payload.message === "string" ? payload.message : undefined;
}
