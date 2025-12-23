"use client";

import { Badge } from "@/components/ui";
import { SupportedLanguage } from "@/constants/translations";
import { getLocalizedText } from "@/lib/localization";

type LocalizedEntity = {
  _id: string;
  name: string;
  nameJa?: string | null;
};

type FilterDropdownProps = {
  label: string;
  placeholder: string;
  items: LocalizedEntity[];
  selected: string[];
  language: SupportedLanguage;
  helper: string;
  badgeTone: "info" | "neutral";
  clearLabel: string;
  resetLabel: string;
  onChange: (ids: string[]) => void;
  onClear: () => void;
};


export function FilterDropdown({
  label,
  placeholder,
  items,
  selected,
  language,
  helper,
  badgeTone,
  clearLabel,
  resetLabel,
  onChange,
  onClear,
}: FilterDropdownProps) {
  return (
    <label className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-slate-50/60 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-slate-800">{label}</span>
        <Badge tone={badgeTone} className="text-xs">
          {selected.length} / {items.length}
        </Badge>
      </div>
      <select
        multiple
        value={selected}
        onChange={(event) =>
          onChange(Array.from(event.target.selectedOptions).map((option) => option.value))
        }
        className="h-24 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-inner focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {items.map((item) => (
          <option key={item._id} value={item._id}>
            {getLocalizedText(language, item.name, item.nameJa)}
          </option>
        ))}
      </select>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{helper}</span>
        <button
          type="button"
          onClick={onClear}
          className="font-semibold text-indigo-600 hover:text-indigo-700"
        >
          {selected.length > 0 ? clearLabel : resetLabel}
        </button>
      </div>
    </label>
  );
}
