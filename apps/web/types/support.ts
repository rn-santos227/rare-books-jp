export type SupportTopic = "order" | "catalog" | "shipping" | "account" | "other";

export type SupportInquiry = {
  name: string;
  email: string;
  topic: SupportTopic;
  message: string;
  orderTrackingCode?: string;
};
