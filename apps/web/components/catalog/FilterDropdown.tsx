"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Badge, Button } from "@/components/ui";
import { SupportedLanguage } from "@/constants/translations";
import { FiltersState } from "@/hooks/useFilters";
import { getLocalizedText } from "@/lib/localization";
import { FilterPill } from "./FilterPill";

type LocalizedEntity = {
  _id: string;
  name: string;
  nameJa?: string | null;
};

type FilterDropdownProps = {
  label: string;
  placeholder: string;
  items: LocalizedEntity[];
  selection: FiltersState["categories"];
  language: SupportedLanguage;
  helper: string;
  badgeTone: "info" | "neutral";
  clearLabel: string;
  resetLabel: string;
  includeLabel: string;
  excludeLabel: string;
  matchAnyLabel: string;
  matchAllLabel: string;
  onChange: (selection: FiltersState["categories"]) => void;
};


export function FilterDropdown({
  label,
  placeholder,
  items,
  selection,
  language,
  helper,
  badgeTone,
  clearLabel,
  resetLabel,
  includeLabel,
  excludeLabel,
  matchAnyLabel,
  matchAllLabel,
  onChange,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const resolvePillState = (id: string) => {
    if (selection.include.includes(id)) return "include" as const;
    if (selection.exclude.includes(id)) return "exclude" as const;
    return "inactive" as const;
  };

  const togglePill = (id: string) => {
    const state = resolvePillState(id);

    if (state === "include") {
      onChange({
        ...selection,
        include: selection.include.filter((value) => value !== id),
        exclude: [...selection.exclude, id],
      });
      return;
    }

    if (state === "exclude") {
      onChange({
        ...selection,
        exclude: selection.exclude.filter((value) => value !== id),
      });
      return;
    }

    onChange({ ...selection, include: [...selection.include, id] });
  };

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
