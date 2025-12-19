import { FormEvent, useState } from "react";

import { lookupOrder } from "@/lib/api/orders";
import { TrackedOrder } from "@/types/order";

export type OrderTrackerFormState = {
  trackingCode: string;
  buyerEmail: string;
};

export type OrderTrackerErrors = Partial<Record<keyof OrderTrackerFormState, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


