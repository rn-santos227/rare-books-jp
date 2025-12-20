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

}
