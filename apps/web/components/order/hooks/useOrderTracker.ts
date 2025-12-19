import { FormEvent, useState } from "react";

import { lookupOrder } from "@/lib/api/orders";
import { TrackedOrder } from "@/types/order";

export type OrderTrackerFormState = {
  trackingCode: string;
  buyerEmail: string;
};

export type OrderTrackerErrors = Partial<Record<keyof OrderTrackerFormState, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useOrderTracker() {
  const [formState, setFormState] = useState<OrderTrackerFormState>({
    trackingCode: "",
    buyerEmail: "",
  });
  const [errors, setErrors] = useState<OrderTrackerErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): OrderTrackerErrors => {
    const validationErrors: OrderTrackerErrors = {};

    if (!formState.trackingCode.trim()) {
      validationErrors.trackingCode = "Enter your tracking code.";
    }

    if (!formState.buyerEmail.trim()) {
      validationErrors.buyerEmail = "Please enter an email.";
    } else if (!EMAIL_REGEX.test(formState.buyerEmail.trim())) {
      validationErrors.buyerEmail = "Enter a valid email address.";
    }

    return validationErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    const validationErrors = validate();
    setErrors(validationErrors);
    setServerError(null);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await lookupOrder({
        trackingCode: formState.trackingCode.trim(),
        buyerEmail: formState.buyerEmail.trim(),
      });
      setOrder(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to find order.";
      setServerError(message);
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formState,
    setFormState,
    errors,
    isLoading,
    order,
    serverError,
    handleSubmit,
  } as const;
}
