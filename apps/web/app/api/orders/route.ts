import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { sanityWriteClient } from "@/lib/sanity.client";
import { Order } from "@/types/order";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function generateTrackingCode() {
  return crypto.randomBytes(6).toString("hex");
}

export async function POST(request: NextRequest) {
  try {
    const { bookId, buyerName, buyerEmail, message } = (await request.json()) as Order;

    if (!bookId || !buyerName?.trim() || !buyerEmail?.trim()) {
      return NextResponse.json(
        { message: "Missing required fields for creating an order." },
        { status: 400 },
      );
    }

    if (!sanityWriteClient.config().token) {
      return NextResponse.json(
        { message: "Sanity write token is not configured." },
        { status: 500 },
      );
    }

    const trackingCode = generateTrackingCode();
    const buyerEmailNormalized = normalizeEmail(buyerEmail);

    await sanityWriteClient.create({
      _type: "order",
      book: {
        _type: "reference",
        _ref: bookId,
      },
      buyerName: buyerName.trim(),
      buyerEmail: buyerEmail.trim(),
      buyerEmailNormalized,
      message: message?.trim() || undefined,
      trackingCode,
      status: "new",
    });

    return NextResponse.json(
      { message: "Order received", trackingCode },
      { status: 201 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit order.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
