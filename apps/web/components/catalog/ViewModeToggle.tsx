"use client";

import { ReactNode, useState } from "react";

export type ViewMode = "list" | "panel" | "compact";

type ViewModeToggleProps = {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
  labels: { list: string; panel: string; compact: string };
};

const BUTTON_BASE =
  "flex items-center gap-2 px-3 py-2 transition rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500";

export function useViewToggle(initialMode: ViewMode = "panel") {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);
  return { viewMode, setViewMode } as const;
}

export function ViewModeToggle({ value, onChange, labels }: ViewModeToggleProps) {
  const options: { mode: ViewMode; label: string; icon: ReactNode }[] = [
    {
      mode: "list",
      label: labels.list,
      icon: (
        <span className="flex h-5 w-5 flex-col justify-center gap-0.5">
          <span className="h-1 rounded-sm bg-current" />
          <span className="h-1 rounded-sm bg-current" />
          <span className="h-1 rounded-sm bg-current" />
        </span>
      ),
    },
    {
      mode: "panel",
      label: labels.panel,
      icon: (
        <span className="grid h-5 w-5 grid-rows-2 gap-0.5">
          <span className="rounded-sm bg-current" />
          <span className="rounded-sm bg-current" />
        </span>
      ),
    },
    {
      mode: "compact",
      label: labels.compact,
      icon: (
        <span className="grid h-5 w-5 grid-cols-2 gap-0.5">
          <span className="rounded-sm bg-current" />
          <span className="rounded-sm bg-current" />
          <span className="rounded-sm bg-current" />
          <span className="rounded-sm bg-current" />
        </span>
      ),
    },
  ];

  return (
    <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs font-semibold text-slate-600 shadow-inner ring-1 ring-gray-200">
      {options.map((option) => (
        <button
          key={option.mode}
          type="button"
          onClick={() => onChange(option.mode)}
          className={`${BUTTON_BASE} ${
            value === option.mode ? "bg-slate-900 text-white shadow-sm" : "hover:bg-white"
          }`}
          aria-pressed={value === option.mode}
          aria-label={option.label}
          title={option.label}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}
