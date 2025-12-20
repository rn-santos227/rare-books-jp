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

