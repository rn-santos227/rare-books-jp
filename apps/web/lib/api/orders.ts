import type { TrackedOrder } from "@/types/order";

export type OrderSubmission = {
  bookId: string;
  buyerName: string;
  buyerEmail: string;
  contactNumber: string;
  message?: string;
};

export type OrderSubmissionResponse = {
  message?: string;
  trackingCode?: string;
};

export type OrderLookupRequest = {
  trackingCode: string;
  buyerEmail: string;
};

export async function submitOrder({
  bookId,
  buyerName,
  buyerEmail,
  contactNumber,
  message,
}: OrderSubmission): Promise<OrderSubmissionResponse> {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bookId,
      buyerName,
      buyerEmail,
      contactNumber,
      message,
    }),
  });

  const payload = await response.json().catch(() => ({ message: "Failed to submit" }));

  if (!response.ok) {
    throw new Error(payload.message || "Unable to send order");
  }

  return {
    message: typeof payload.message === "string" ? payload.message : undefined,
    trackingCode: typeof payload.trackingCode === "string" ? payload.trackingCode : undefined,
  };
}

export async function lookupOrder({ trackingCode, buyerEmail }: OrderLookupRequest): Promise<TrackedOrder> {
  const response = await fetch("/api/orders/lookup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trackingCode, buyerEmail }),
  });

  const payload = await response.json().catch(() => ({ message: "Failed to look up order" }));

  if (!response.ok) {
    throw new Error(payload.message || "Unable to find order");
  }

  if (!payload.order) {
    throw new Error(payload.message || "Order not found");
  }

  return payload.order as TrackedOrder;
}
