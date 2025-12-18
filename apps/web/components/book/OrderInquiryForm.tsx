"use client";

import { ToastStack } from "@/components/toast/ToastStack";
import { useToast } from "@/components/toast/hooks/useToast";
import { Button, TextArea, TextField } from "@/components/ui";
import { useTranslations } from "@/context/LanguageContext";

import { useOrderForm } from "./hooks/useOrderForm";

type OrderInquiryFormProps = {
  bookId: string;
  marketplaceUrl?: string | null;
};

export function OrderInquiryForm({ bookId, marketplaceUrl }: OrderInquiryFormProps) {
  const t = useTranslations();
  const { toasts, show, dismiss, toneStyles } = useToast();
  const { formState, setFormState, errors, isSubmitting, handleSubmit } = useOrderForm({
    bookId,
    onSuccess: (message) =>
      show({
        title: t.order.successTitle,
        description: message || t.order.successBody,
        tone: "success",
      }),
    onError: (message) =>
      show({
        title: t.order.errorTitle,
        description: message || t.order.errorBody,
        tone: "warning",
      }),
  });

  return (
    <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">{t.order.heading}</h2>
        <p className="text-sm text-slate-600">{t.order.intro}</p>
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
      </div>

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
        <div className="flex items-center justify-end">
          <Button type="submit" disabled={isSubmitting} className="px-6">
            {isSubmitting ? t.order.submitting : t.order.submit}
          </Button>
        </div>
      </form>

      <ToastStack toasts={toasts} dismiss={dismiss} toneStyles={toneStyles} />
    </div>
  );
}
