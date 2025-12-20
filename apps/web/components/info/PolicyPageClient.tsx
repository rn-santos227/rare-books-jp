"use client";

type PolicySection = {
  title: string;
  body: string;
};

type PolicyContent = {
  eyebrow: string;
  title: string;
  updated: string;
  sections: PolicySection[];
  contact: string;
  preferences?: string;
};

type PolicyPageClientProps = {
  policy: PolicyContent;
};

export function PolicyPageClient({ policy }: PolicyPageClientProps) {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          {policy.eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{policy.title}</h1>
        <p className="mt-2 text-sm font-semibold text-slate-500">{policy.updated}</p>

        <div className="mt-6 space-y-4">
          {policy.sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4"
            >
              <h2 className="text-base font-semibold text-slate-900">{section.title}</h2>
              <p className="mt-2 text-sm text-slate-700">{section.body}</p>
            </div>
          ))}
        </div>

        {policy.preferences ? (
          <div className="mt-6 rounded-2xl bg-indigo-50 px-5 py-4 text-sm text-indigo-900 ring-1 ring-indigo-100">
            {policy.preferences}
          </div>
        ) : null}

        <p className="mt-6 text-sm font-semibold text-indigo-700">{policy.contact}</p>
      </section>
    </div>
  );
}
