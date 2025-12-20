import type { SupportInquiry } from "@/types/support";

export type SupportSubmissionResponse = {
  message?: string;
};

export async function submitSupportInquiry({
  name,
  email,
  topic,
  message,
  orderTrackingCode,
}: SupportInquiry): Promise<SupportSubmissionResponse> {
  const response = await fetch("/api/support", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      topic,
      message,
      orderTrackingCode,
    }),
  });

  const payload = await response.json().catch(() => ({ message: "Failed to submit inquiry" }));

  if (!response.ok) {
    throw new Error(payload.message || "Unable to send inquiry");
  }

  return {
    message: typeof payload.message === "string" ? payload.message : undefined,
  };
}
