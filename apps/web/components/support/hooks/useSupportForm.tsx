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

  const validationRules = useMemo(
    () => ({
      name: (value: string) => value.trim().length > 0 || "Please enter your name.",
      email: (value: string) => {
        if (!value.trim()) return "Please enter an email.";
        return EMAIL_REGEX.test(value.trim()) || "Enter a valid email address.";
      },
      message: (value: string) => value.trim().length > 0 || "Please add a short message.",
      topic: (value: string) => value.trim().length > 0 || "Please choose a topic.",
    }),
    [],
  );

  const validate = (): SupportFormErrors => {
    const validationErrors: SupportFormErrors = {};

    (Object.keys(validationRules) as Array<keyof typeof validationRules>).forEach((key) => {
      const result = validationRules[key](formState[key]);
      if (result !== true) {
        validationErrors[key] = result as string;
      }
    });

    return validationErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      onError?.(Object.values(validationErrors)[0] ?? "Please double-check your details.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: SupportInquiry = {
        name: formState.name.trim(),
        email: formState.email.trim(),
        topic: formState.topic,
        message: formState.message.trim(),
        orderTrackingCode: formState.orderTrackingCode.trim() || undefined,
      };

      const { message } = await submitSupportInquiry(payload);

      setFormState({
        name: "",
        email: "",
        topic: DEFAULT_TOPIC,
        orderTrackingCode: "",
        message: "",
      });
      setErrors({});
      onSuccess?.(message);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send your inquiry right now.";
      onError?.(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formState, setFormState, errors, isSubmitting, handleSubmit } as const;
}
