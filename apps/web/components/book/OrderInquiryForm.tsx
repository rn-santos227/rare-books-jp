"use client";

import { useState } from "react";

import { ToastStack } from "@/components/toast/ToastStack";
import { useToast } from "@/components/toast/hooks/useToast";
import { Button, Modal, TextArea, TextField } from "@/components/ui";
import { useTranslations } from "@/context/LanguageContext";

import { useOrderForm } from "./hooks/useOrderForm";

type OrderInquiryFormProps = {
  bookId: string;
  marketplaceUrl?: string | null;
};

export function OrderInquiryForm({ bookId, marketplaceUrl }: OrderInquiryFormProps) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const { toasts, show, dismiss, toneStyles } = useToast();
  const { formState, setFormState, errors, isSubmitting, handleSubmit } = useOrderForm({
    bookId,
    onSuccess: (message) => {
      show({
        title: t.order.successTitle,
        description: message || t.order.successBody,
        tone: "success",
      });
      setIsOpen(false);
    },
    onError: (message) =>
      show({
        title: t.order.errorTitle,
        description: message || t.order.errorBody,
        tone: "warning",
      }),
  });

  return (
    <>
     <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-slate-900">{t.order.heading}</h2>
            <p className="text-sm text-slate-600">{t.order.intro}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {marketplaceUrl && (
              <Button
                variant="secondary"
                href={marketplaceUrl}
                className="bg-white"
                target="_blank"
                rel="noreferrer"
              >
                {t.order.marketplaceCta}
              </Button>
            )}
            <Button className="px-6 shadow-md shadow-indigo-200 hover:shadow-lg" onClick={() => setIsOpen(true)}>
              {t.order.openFormLabel}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
