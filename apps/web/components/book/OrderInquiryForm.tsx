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


      <Modal open={isOpen} onClose={() => setIsOpen(false)} title={t.order.heading} description={t.order.intro}>
        {marketplaceUrl && (
          <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-indigo-50 px-4 py-3 text-indigo-800 ring-1 ring-indigo-100">
            <div className="flex-1 text-sm font-medium">{t.order.marketplaceHelper}</div>
            <Button
              href={marketplaceUrl}
              variant="secondary"
              className="bg-white"
              target="_blank"
              rel="noreferrer"
            >
              {t.order.marketplaceCta}
            </Button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <TextField
            label={t.order.buyerNameLabel}
            placeholder="Tanaka Hiro"
            value={formState.buyerName}
            onChange={(event) => setFormState((prev) => ({ ...prev, buyerName: event.target.value }))}
            error={errors.buyerName}
          />
          <TextField
            label={t.order.buyerEmailLabel}
            placeholder="name@email.com"
            type="email"
            value={formState.buyerEmail}
            onChange={(event) => setFormState((prev) => ({ ...prev, buyerEmail: event.target.value }))}
            error={errors.buyerEmail}
          />
          <TextArea
            label={t.order.messageLabel}
            placeholder={t.order.messagePlaceholder}
            rows={4}
            value={formState.message}
            onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
            error={errors.message}
          />
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              className="px-4 text-slate-600 hover:text-slate-800"
              onClick={() => setIsOpen(false)}
            >
              {t.common.close}
            </Button>
            <Button type="submit" disabled={isSubmitting} className="px-6">
              {isSubmitting ? t.order.submitting : t.order.submit}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
