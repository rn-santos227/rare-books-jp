export type OrderStatus = "new" | "contacted" | "discussion" | "completed" | "cancelled";

export type Order = {
  bookId: string;
  buyerName: string;
  buyerEmail: string;
  message?: string;
  status?: OrderStatus;
  trackingCode?: string;
  buyerEmailNormalized?: string;
};

export type TrackedOrder = {
  trackingCode: string;
  status: OrderStatus;
  submittedAt: string;
  bookTitle: string;
  bookSlug?: string | null;
  hasMessage: boolean;
};
