import { NextRequest, NextResponse } from "next/server";

import { sanityWriteClient } from "@/lib/sanity.client";
import { Order } from "@/types/order";

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

    await sanityWriteClient.create({
      _type: "order",
      book: {
        _type: "reference",
        _ref: bookId,
      },
      buyerName: buyerName.trim(),
      buyerEmail: buyerEmail.trim(),
      message: message?.trim() || undefined,
      status: "new",
    });

    return NextResponse.json({ message: "Order received" }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit order.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
