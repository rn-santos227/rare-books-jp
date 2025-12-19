import { NextRequest, NextResponse } from "next/server";

import { ORDER_BY_TRACKING_QUERY } from "@/constants/queries";
import { sanityClient } from "@/lib/sanity.client";
import { TrackedOrder } from "@/types/order";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function POST(request: NextRequest) {
  try {
    const { trackingCode, buyerEmail } = (await request.json()) as {
      trackingCode?: string;
      buyerEmail?: string;
    };

    if (!trackingCode?.trim() || !buyerEmail?.trim()) {
      return NextResponse.json(
        { message: "Tracking code and email are required." },
        { status: 400 },
      );
    }

    const buyerEmailNormalized = normalizeEmail(buyerEmail);

    const order = await sanityClient.fetch<TrackedOrder | null>(ORDER_BY_TRACKING_QUERY, {
      trackingCode: trackingCode.trim(),
      buyerEmailNormalized,
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to find order.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
