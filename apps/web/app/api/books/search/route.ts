import { NextRequest, NextResponse } from "next/server";

import { BOOK_SEARCH_QUERY } from "@/constants/queries";
import { sanityClient } from "@/lib/sanity.client";
import { Book } from "@/types/book";

const MIN_QUERY_LENGTH = 2;

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim().toLowerCase();

  if (!query || query.length < MIN_QUERY_LENGTH) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await sanityClient.fetch<Book[]>(BOOK_SEARCH_QUERY, {
      term: `${query}*`,
    });

    return NextResponse.json({ results });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to search for books.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
