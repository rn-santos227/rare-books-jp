"use client";

import Link from "next/link";

import { Button } from "@/components/ui";
import { useTranslations } from "@/context/LanguageContext";

export function ContactPageClient() {
  const t = useTranslations();
  const contact = t.pages.contact;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          {contact.eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{contact.title}</h1>
        <p className="mt-3 max-w-3xl text-slate-600">{contact.description}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {contact.channels.map((channel) => (
            <div
              key={channel.title}
              className="flex h-full flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-5"
            >
              <div>
                <p className="text-xs uppercase tracking-wide text-indigo-600">{channel.title}</p>
                <p className="text-base font-semibold text-slate-900">{channel.detail}</p>
              </div>
              <p className="text-sm text-slate-600">{channel.helper}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="text-sm text-slate-600">{contact.responseTime}</span>
          <Button href="/support" variant="secondary" className="font-semibold">
            {contact.supportCta}
          </Button>
          <Link href="/orders/track" className="text-sm font-semibold text-indigo-600">
            {contact.supportHelper}
          </Link>
        </div>
      </section>
    </div>
  );
}
