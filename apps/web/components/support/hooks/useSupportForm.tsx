"use client";

import { FormEvent, useMemo, useState } from "react";

import { submitSupportInquiry } from "@/lib/api/support";
import { SupportInquiry, SupportTopic } from "@/types/support";

export type SupportFormState = {
  name: string;
  email: string;
  topic: SupportTopic;
  orderTrackingCode: string;
  message: string;
};

export type SupportFormErrors = Partial<Record<keyof SupportFormState, string>>;

type UseSupportFormParams = {
  onSuccess?: (message?: string) => void;
  onError?: (message: string) => void;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_TOPIC: SupportTopic = "order";


export function useSupportForm({ onSuccess, onError }: UseSupportFormParams = {}) {
  const [formState, setFormState] = useState<SupportFormState>({
    name: "",
    email: "",
    topic: DEFAULT_TOPIC,
    orderTrackingCode: "",
    message: "",
  });
  const [errors, setErrors] = useState<SupportFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

}
