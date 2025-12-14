import React from "react";

type Props = {
  active: boolean;
  label: string;
  onClick: () => void;
};

export function FilterPill({ active, label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-sm ${
        active
          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
          : "border-gray-200 bg-white text-slate-700"
      }`}
    >
      {label}
    </button>
  );
}
