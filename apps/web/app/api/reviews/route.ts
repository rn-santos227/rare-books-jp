import { NextRequest, NextResponse } from "next/server";

import { sanityWriteClient } from "@/lib/sanity.client";

const MODERATION_MESSAGE = "Thank you! Your review will appear after moderation.";

function buildBodyBlock(text: string) {
  return [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text,
        },
      ],
      markDefs: [],
    },
  ];
}

export async function POST(request: NextRequest) {
  try {
    const { bookId, reviewerName, rating, bodyText } = await request.json();

    if (!bookId || !bodyText || typeof rating !== "number") {
      return NextResponse.json(
        { message: "Missing required fields for creating a review." },
        { status: 400 },
      );
    }

    if (!sanityWriteClient.config().token) {
      return NextResponse.json(
        { message: "Sanity write token is not configured." },
        { status: 500 },
      );
    }

    const safeRating = Math.min(Math.max(Math.round(rating), 1), 5);

    await sanityWriteClient.create({
      _type: "review",
      reviewType: "user",
      reviewerName: reviewerName || "Anonymous reader",
      rating: safeRating,
      status: "pending",
      book: {
        _type: "reference",
        _ref: bookId,
      },
      body: buildBodyBlock(bodyText),
    });

    return NextResponse.json({ message: MODERATION_MESSAGE, status: "pending" }, { status: 202 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit review.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
