import { NextRequest, NextResponse } from "next/server";

import { sanityWriteClient } from "@/lib/sanity.client";

const MODERATION_MESSAGE = "New reviews are published after approval.";

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

