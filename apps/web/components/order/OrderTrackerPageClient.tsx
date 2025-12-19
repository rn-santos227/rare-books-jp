"use client";

import { Button, TextField } from "@/components/ui";
import { useTranslations } from "@/context/LanguageContext";

import { OrderResultCard } from "./OrderResultCard";
import { useOrderTracker } from "./hooks/useOrderTracker";

export function OrderTrackerPageClient() {
  const t = useTranslations();
  const { formState, setFormState, errors, isLoading, order, serverError, handleSubmit } =
    useOrderTracker();

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-3xl bg-linear-to-br from-indigo-600 via-indigo-700 to-slate-900 p-8 text-white shadow-lg ring-1 ring-indigo-400/40">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-200">
          {t.order.trackerHeading}
        </p>
        <h1 className="mt-3 text-3xl font-bold">{t.order.trackerHeading}</h1>
        <p className="mt-4 text-indigo-100">{t.order.trackerIntro}</p>
        <div className="mt-6 space-y-3 rounded-2xl bg-white/10 p-4 text-indigo-100 ring-1 ring-white/15">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-lg">
              🔒
            </span>
            {t.order.trackerProtectNote}
          </div>
          <p className="text-sm text-indigo-200">{t.order.trackingCodeHelper}</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <TextField
            label={t.order.trackingCodeLabel}
            placeholder="e.g. a1b2c3d4e5"
            value={formState.trackingCode}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, trackingCode: event.target.value }))
            }
            error={errors.trackingCode}
          />
          <TextField
            label={t.order.buyerEmailLabel}
            type="email"
            placeholder="name@email.com"
            value={formState.buyerEmail}
            onChange={(event) => setFormState((prev) => ({ ...prev, buyerEmail: event.target.value }))}
            error={errors.buyerEmail}
          />
          {serverError ? (
            <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 ring-1 ring-rose-100">
              {serverError}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t.order.submitting : t.order.trackerSubmit}
          </Button>
        </form>

        {order ? (
          <div className="mt-6">
            <OrderResultCard order={order} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
