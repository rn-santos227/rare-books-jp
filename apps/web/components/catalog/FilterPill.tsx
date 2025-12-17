import React from "react";

type PillState = "include" | "exclude" | "inactive";

type Props = {
  state?: PillState;
  label: string;
  onClick: () => void;
};

export function FilterPill({ state = "inactive", label, onClick }: Props) {
  const stateStyles: Record<PillState, string> = {
    include: "border-indigo-500 bg-indigo-50 text-indigo-700",
    exclude: "border-rose-400 bg-rose-50 text-rose-700",
    inactive: "border-gray-200 bg-white text-slate-700",
  };

  const symbol = state === "include" ? "＋" : state === "exclude" ? "−" : null;

  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-sm ${
        stateStyles[state]
      }`}
    >
      <span className="flex items-center gap-2">
        {symbol && <span className="text-base leading-none">{symbol}</span>}
        <span>{label}</span>
      </span>
    </button>
  );
}
