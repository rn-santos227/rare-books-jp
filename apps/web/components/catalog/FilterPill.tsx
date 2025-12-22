import React from "react";

type PillState = "include" | "exclude" | "inactive";

type Props = {
  state?: PillState;
  label: string;
  onClick: () => void;
};

export function FilterPill({ state = "inactive", label, onClick }: Props) {
  const stateStyles: Record<PillState, string> = {
    include: "border-emerald-400 bg-emerald-50 text-emerald-800 shadow-sm",
    exclude: "border-rose-400 bg-rose-50 text-rose-700 shadow-sm",
    inactive: "border-gray-200 bg-white text-slate-700 hover:border-indigo-200",
  };

  const symbol = state === "include" ? "＋" : state === "exclude" ? "−" : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-200 ${
        stateStyles[state]
      }`}
      aria-pressed={state !== "inactive"}
    >
      <span className="flex items-center gap-2">
        {symbol && <span className="text-base leading-none">{symbol}</span>}
        <span>{label}</span>
      </span>
    </button>
  );
}
