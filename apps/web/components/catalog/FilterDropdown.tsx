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

  const handleModeChange = (mode: FiltersState["categories"]["mode"]) =>
    onChange({ ...selection, mode });

  const clearSelection = () =>
    onChange({ ...selection, include: [], exclude: [], mode: "any" });

  const selectedLabel = useMemo(() => {
    const hasAny = selection.include.length > 0 || selection.exclude.length > 0;
    if (!hasAny) return placeholder;

    const includeCount = selection.include.length;
    const excludeCount = selection.exclude.length;
    const includeText = includeCount > 0 ? `${includeLabel}: ${includeCount}` : "";
    const excludeText = excludeCount > 0 ? `${excludeLabel}: ${excludeCount}` : "";

    return [includeText, excludeText].filter(Boolean).join(" · ");
  }, [excludeLabel, selection.exclude.length, selection.include.length, includeLabel, placeholder]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow focus-visible:outline focus-visible:outline-indigo-200"
      >
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </span>
          <span className="text-sm font-semibold text-slate-800">{selectedLabel}</span>
          <span className="text-[11px] text-slate-500">{helper}</span>
        </div>
        <div className="flex flex-col items-end gap-1 text-right text-xs">
          <Badge tone={badgeTone} className="w-fit bg-slate-50 px-2 py-1 text-[11px]">
            {selection.include.length} / {items.length}
          </Badge>
          {selection.exclude.length > 0 && (
            <Badge tone="warning" className="w-fit bg-amber-50 px-2 py-1 text-[11px] text-amber-700">
              -{selection.exclude.length}
            </Badge>
          )}
          <span className="text-slate-400">{isOpen ? "▴" : "▾"}</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-20 mt-2 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-800">{label}</span>
              <Badge tone={badgeTone} className="bg-slate-50 text-xs text-slate-700">
                +{selection.include.length}
              </Badge>
              <Badge tone="warning" className="bg-amber-50 text-xs text-amber-700">
                -{selection.exclude.length}
              </Badge>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 text-xs font-semibold text-slate-600">
              {(["any", "all"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleModeChange(mode)}
                  className={`rounded-full px-3 py-1 transition ${
                    selection.mode === mode
                      ? "bg-white text-slate-900 shadow"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  {mode === "any" ? matchAnyLabel : matchAllLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {items.map((item) => (
              <FilterPill
                key={item._id}
                label={getLocalizedText(language, item.name, item.nameJa)}
                state={resolvePillState(item._id)}
                onClick={() => togglePill(item._id)}
              />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <span>{helper}</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="px-3 py-1 text-xs" onClick={clearSelection}>
                {clearLabel}
              </Button>
              <Button variant="secondary" className="px-3 py-1 text-xs" onClick={() => setIsOpen(false)}>
                {resetLabel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
