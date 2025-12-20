import { NextRequest, NextResponse } from "next/server";

import { sanityWriteClient } from "@/lib/sanity.client";
import { SupportTopic } from "@/types/support";

type SupportRequestBody = {
  name?: string;
  email?: string;
  topic?: SupportTopic;
  message?: string;
  orderTrackingCode?: string;
};

const ALLOWED_TOPICS: SupportTopic[] = ["order", "catalog", "shipping", "account", "other"];

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isValidTopic(topic?: string): topic is SupportTopic {
  return !!topic && ALLOWED_TOPICS.includes(topic as SupportTopic);
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, topic, message, orderTrackingCode } =
      (await request.json()) as SupportRequestBody;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { message: "Please provide your name, email, and message." },
        { status: 400 },
      );
    }

    if (!sanityWriteClient.config().token) {
      return NextResponse.json(
        { message: "Sanity write token is not configured." },
        { status: 500 },
      );
    }

    const normalizedEmail = normalizeEmail(email);
    const selectedTopic: SupportTopic = isValidTopic(topic) ? topic : "other";

    await sanityWriteClient.create({
      _type: "support",
      requesterName: name.trim(),
      requesterEmail: email.trim(),
      requesterEmailNormalized: normalizedEmail,
      topic: selectedTopic,
      orderTrackingCode: orderTrackingCode?.trim() || undefined,
      message: message.trim(),
      status: "new",
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Thanks! Our team will be in touch shortly." },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to send your inquiry right now.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
