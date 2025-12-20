export type SupportTopic = "order" | "catalog" | "tracking" | "account" | "other";

export type SupportInquiry = {
  name: string;
  email: string;
  topic: SupportTopic;
  message: string;
  orderTrackingCode?: string;
};
