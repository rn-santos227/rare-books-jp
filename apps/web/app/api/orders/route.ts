import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { buildOrderTrackingEmail } from "@/constants/email";
import { sanityWriteClient } from "@/lib/sanity.client";
import { sendEmail } from "@/lib/smtp.client";
import { Order } from "@/types/order";

async function sendOrderTrackingEmail({
  buyerEmail,
  buyerName,
  trackingCode,
}: {
  buyerEmail: string;
  buyerName: string;
  trackingCode: string;
}) {
  const email = buildOrderTrackingEmail({ buyerName, trackingCode });

  await sendEmail({
    to: buyerEmail,
    subject: email.subject,
    text: email.text,
  });
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function generateTrackingCode() {
  return crypto.randomBytes(6).toString("hex");
}

export async function POST(request: NextRequest) {
  try {
    const { bookId, buyerName, buyerEmail, contactNumber, message } = (await request.json()) as Order;

    if (!bookId || !buyerName?.trim() || !buyerEmail?.trim() || !contactNumber?.trim()) {
      return NextResponse.json(
        { message: "Missing required fields for creating an order." },
        { status: 400 },
      );
    }

    const digitsOnly = contactNumber.replace(/\D/g, "");
    if (digitsOnly.length < 7) {
      return NextResponse.json(
        { message: "Enter a valid contact number with at least 7 digits." },
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
      contactNumber: contactNumber.trim(),
      message: message?.trim() || undefined,
      trackingCode,
      status: "new",
    });

    await sendOrderTrackingEmail({
      buyerEmail: buyerEmail.trim(),
      buyerName: buyerName.trim(),
      trackingCode,
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
