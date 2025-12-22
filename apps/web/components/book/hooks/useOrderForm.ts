import { FormEvent, useState } from "react";

import { submitOrder } from "@/lib/api/orders";
import { Order } from "@/types/order";

export type OrderFormState = {
  buyerName: string;
  buyerEmail: string;
  contactNumber: string;
  message: string;
};

export type OrderFormErrors = Partial<Record<keyof OrderFormState, string>>;

type UseOrderFormParams = {
  bookId: string;
  onSuccess?: (message?: string, trackingCode?: string) => void;
  onError?: (message: string) => void;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useOrderForm({ bookId, onSuccess, onError }: UseOrderFormParams) {
  const [formState, setFormState] = useState<OrderFormState>({
    buyerName: "",
    buyerEmail: "",
    contactNumber: "",
    message: "",
  });
  const [errors, setErrors] = useState<OrderFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): OrderFormErrors => {
    const validationErrors: OrderFormErrors = {};

    if (!formState.buyerName.trim()) {
      validationErrors.buyerName = "Please enter your name.";
    }

    if (!formState.buyerEmail.trim()) {
      validationErrors.buyerEmail = "Please enter an email.";
    } else if (!EMAIL_REGEX.test(formState.buyerEmail.trim())) {
      validationErrors.buyerEmail = "Enter a valid email address.";
    }

    const phoneDigits = formState.contactNumber.replace(/\D/g, "");
    if (!formState.contactNumber.trim() || phoneDigits.length < 7) {
      validationErrors.contactNumber = "Please enter a valid contact number.";
    }

    return validationErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      onError?.(Object.values(validationErrors)[0] ?? "Unable to send order");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: Order = {
        bookId,
        buyerName: formState.buyerName.trim(),
        buyerEmail: formState.buyerEmail.trim(),
        contactNumber: formState.contactNumber.trim(),
        message: formState.message.trim(),
      };

      const { message, trackingCode } = await submitOrder(payload);

      setFormState({ buyerName: "", buyerEmail: "", contactNumber: "", message: "" });
      setErrors({});
      onSuccess?.(message, trackingCode);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try again shortly.";
      onError?.(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formState, setFormState, errors, isSubmitting, handleSubmit } as const;
}
