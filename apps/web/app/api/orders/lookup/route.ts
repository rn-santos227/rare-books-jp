import { NextRequest, NextResponse } from "next/server";

import { ORDER_BY_TRACKING_QUERY } from "@/constants/queries";
import { sanityClient } from "@/lib/sanity.client";
import { TrackedOrder } from "@/types/order";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}
