"use client";

import Link from "next/link";

import { Badge } from "@/components/ui";
import { useLanguage, useTranslations } from "@/context/LanguageContext";
import { OrderStatus, TrackedOrder } from "@/types/order";

const statusTone: Record<OrderStatus, "info" | "success" | "warning" | "neutral"> = {
  new: "info",
  contacted: "info",
  discussion: "warning",
  completed: "success",
  cancelled: "neutral",
};

function formatDate(dateString: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

type OrderResultCardProps = {
  order: TrackedOrder;
};

export function OrderResultCard({ order }: OrderResultCardProps) {
  const t = useTranslations();
  const { language } = useLanguage();
  const statusLabel = t.order.statusLabels[order.status];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {t.order.trackerResultTitle}
          </p>
          <p className="text-base font-semibold text-slate-900">{order.bookTitle}</p>
        </div>
        <Badge tone={statusTone[order.status]}>{statusLabel}</Badge>
      </div>

      <dl className="mt-4 grid gap-3 text-sm text-slate-700">
        <div className="flex items-start justify-between gap-3">
          <dt className="text-slate-500">{t.order.trackerStatusLabel}</dt>
          <dd className="font-semibold">{statusLabel}</dd>
        </div>
        <div className="flex items-start justify-between gap-3">
          <dt className="text-slate-500">{t.order.trackerSubmittedLabel}</dt>
          <dd className="font-medium">
            {formatDate(order.submittedAt, language === "ja" ? "ja-JP" : "en-US")}
          </dd>
        </div>
        <div className="flex items-start justify-between gap-3">
          <dt className="text-slate-500">{t.order.trackingCodeLabel}</dt>
          <dd className="font-mono text-xs text-slate-900">{order.trackingCode}</dd>
        </div>
        <div className="flex items-start justify-between gap-3">
          <dt className="text-slate-500">{t.order.messageLabel}</dt>
          <dd className="font-medium">
            {order.hasMessage ? t.order.trackerHasMessage : t.order.trackerNoMessage}
          </dd>
        </div>
        {order.bookSlug ? (
          <div className="flex items-start justify-between gap-3">
            <dt className="text-slate-500">{t.book.breadcrumbBooks}</dt>
            <dd>
              <Link
                className="text-indigo-600 underline underline-offset-4 hover:text-indigo-700"
                href={`/books/${order.bookSlug}`}
              >
                {t.common.viewDetails}
              </Link>
            </dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}
