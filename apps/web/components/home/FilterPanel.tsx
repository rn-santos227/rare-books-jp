"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextArea";
import { FiltersState } from "@/hooks/useFilters";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";
import { FilterPill } from "./FilterPill";

type FiltersPanelProps = {
  filters: FiltersState;
  categories: Category[];
  genres: Genre[];
  priceBounds: [number, number];
  updateFilter: <Key extends keyof FiltersState>(
    key: Key,
    value: FiltersState[Key],
  ) => void;
  resetFilters: () => void;
  onCollapse: () => void;
};

const conditions: { label: string; value: string }[] = [
  { label: "New", value: "new" },
  { label: "Like New", value: "like_new" },
  { label: "Used", value: "used" },
  { label: "Damaged", value: "damaged" },
];

export function FiltersPanel({
  filters,
  categories,
  genres,
  priceBounds,
  updateFilter,
  resetFilters,
  onCollapse,
}: FiltersPanelProps) {
  return (
   <aside className="flex flex-col gap-6 rounded-3xl bg-white/95 p-6 shadow-sm ring-1 ring-gray-200">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-indigo-600">Filters</p>
          <p className="text-xs text-slate-500">Craft the perfect shelf</p>
        </div>
      </div>
   </aside>
  )
}
