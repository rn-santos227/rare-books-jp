import { NextRequest, NextResponse } from "next/server";

import { sanityWriteClient } from "@/lib/sanity.client";

const MODERATION_MESSAGE = "Thank you! Your review will appear after moderation.";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_REVIEW_LENGTH = 10;

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
    const { bookId, reviewerName, reviewerEmail, title, rating, bodyText } =
      (await request.json()) as {
        bookId?: string;
        reviewerName?: string;
        reviewerEmail?: string;
        title?: string;
        rating?: number;
        bodyText?: string;
      };

    if (!bookId || !bodyText?.trim() || typeof rating !== "number" || !reviewerEmail?.trim()) {
      return NextResponse.json(
        { message: "Missing required fields for creating a review." },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(reviewerEmail.trim())) {
      return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
    }

    if (bodyText.trim().length < MIN_REVIEW_LENGTH) {
      return NextResponse.json(
        { message: `Reviews should be at least ${MIN_REVIEW_LENGTH} characters.` },
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
      reviewerName: reviewerName || "Anonymous Reader",
      buyerName: reviewerName || "Anonymous Reader",
      reviewerEmail: reviewerEmail.trim(),
      buyerEmail: reviewerEmail.trim(),
      rating: safeRating,
      title: title?.trim(),
      status: "pending",
      book: {
        _type: "reference",
        _ref: bookId,
      },
      body: buildBodyBlock(bodyText.trim()),
    });

    return NextResponse.json({ message: MODERATION_MESSAGE, status: "pending" }, { status: 202 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit review.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
