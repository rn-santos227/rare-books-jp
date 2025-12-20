"use client";

import { useMemo, useState } from "react";

import { ToastStack } from "@/components/toast/ToastStack";
import { useToast } from "@/components/toast/hooks/useToast";
import { Button, TextArea, TextField } from "@/components/ui";
import { useTranslations } from "@/context/LanguageContext";

import { useSupportForm } from "./hooks/useSupportForm";

export function SupportPageClient() {
  const t = useTranslations();
  const { toasts, show, dismiss, toneStyles } = useToast();
  const [feedbackTone, setFeedbackTone] = useState<"success" | "warning" | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const { formState, setFormState, errors, isSubmitting, handleSubmit } = useSupportForm({
    onSuccess: (message) => {
      const description = message || t.support.successBody;
      setFeedbackTone("success");
      setFeedbackMessage(description);
      show({
        title: t.support.successTitle,
        description,
        tone: "success",
      });
    },
    onError: (message) => {
      const description = message || t.support.errorBody;
      setFeedbackTone("warning");
      setFeedbackMessage(description);
      show({
        title: t.support.errorTitle,
        description,
        tone: "warning",
      });
    },
  });

  const topicOptions = useMemo(
    () => [
      { value: "order", label: t.support.topicOptions.order },
      { value: "catalog", label: t.support.topicOptions.catalog },
      { value: "shipping", label: t.support.topicOptions.shipping },
      { value: "account", label: t.support.topicOptions.account },
      { value: "other", label: t.support.topicOptions.other },
    ],
    [t.support.topicOptions],
  );


  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-3xl bg-linear-to-br from-indigo-600 via-indigo-700 to-slate-900 p-8 text-white shadow-lg ring-1 ring-indigo-500/40">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-200">
            {t.support.badge}
          </p>
          <h1 className="mt-2 text-3xl font-bold">{t.support.heading}</h1>
          <p className="mt-4 text-indigo-100">{t.support.intro}</p>

          <div className="mt-6 space-y-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg">
                ⏱️
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  {t.support.responseTimeTitle}
                </p>
                <p className="text-xs text-indigo-100">{t.support.responseTimeBody}</p>
              </div>
            </div>

            <ul className="list-disc list-inside space-y-2 text-sm text-indigo-100">
              {t.support.commitments.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="rounded-xl bg-white/10 px-4 py-3 text-sm text-indigo-100 ring-1 ring-white/10">
              <p className="font-semibold text-white">{t.support.secondaryTitle}</p>
              <p className="mt-1">{t.support.secondaryBody}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label={t.support.nameLabel}
                placeholder="Yuki Mori"
                value={formState.name}
                onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                error={errors.name}
              />
              <TextField
                label={t.support.emailLabel}
                type="email"
                placeholder="you@email.com"
                value={formState.email}
                onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                error={errors.email}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                <span>{t.support.topicLabel}</span>
                <select
                  className={`w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${errors.topic ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : ""}`}
                  value={formState.topic}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, topic: event.target.value as typeof prev.topic }))
                  }
                >
                  {topicOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.topic ? (
                  <span className="text-xs font-normal text-rose-600">{errors.topic}</span>
                ) : (
                  <span className="text-xs font-normal text-gray-500">
                    {t.support.topicHelper}
                  </span>
                )}
              </label>

              <TextField
                label={t.support.trackingLabel}
                placeholder="a1b2c3d4e5"
                value={formState.orderTrackingCode}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, orderTrackingCode: event.target.value }))
                }
                helperText={t.support.trackingHelper}
              />
            </div>

            <TextArea
              label={t.support.messageLabel}
              placeholder={t.support.messagePlaceholder}
              rows={5}
              value={formState.message}
              onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
              error={errors.message}
            />

            {feedbackMessage ? (
              <p
                className={`rounded-xl px-4 py-3 text-sm ${
                  feedbackTone === "success"
                    ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100"
                    : "bg-amber-50 text-amber-800 ring-1 ring-amber-100"
                }`}
              >
                {feedbackMessage}
              </p>
            ) : null}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t.support.submitting : t.support.submit}
            </Button>
          </form>
        </div>
      </div>

      <ToastStack toasts={toasts} dismiss={dismiss} toneStyles={toneStyles} />
    </>
  );
}
