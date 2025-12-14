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
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="text-sm font-semibold text-indigo-700"
            onClick={resetFilters}
          >
            Reset
          </Button>
          <Button variant="secondary" onClick={onCollapse}>
            Collapse
          </Button>
        </div>
      </div>

      <TextField
        placeholder="Search by title or author"
        value={filters.searchQuery}
        onChange={(event) => updateFilter("searchQuery", event.target.value)}
      />

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-800">Categories</h3>
          <Badge tone="info">{categories.length}</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <FilterPill
              key={category._id}
              label={category.name}
              active={filters.categoryId === category._id}
              onClick={() =>
                updateFilter(
                  "categoryId",
                  filters.categoryId === category._id ? null : category._id,
                )
              }
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-800">Genres</h3>
          <Badge tone="neutral">{genres.length}</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <FilterPill
              key={genre._id}
              label={genre.name}
              active={filters.genreId === genre._id}
              onClick={() =>
                updateFilter(
                  "genreId",
                  filters.genreId === genre._id ? null : genre._id,
                )
              }
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-800">Condition</h3>
          <Badge tone="warning">{conditions.length}</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {conditions.map((condition) => (
            <FilterPill
              key={condition.value}
              label={condition.label}
              active={filters.condition === condition.value}
              onClick={() =>
                updateFilter(
                  "condition",
                  filters.condition === condition.value
                    ? null
                    : condition.value,
                )
              }
            />
          ))}
        </div>
      </div>
   </aside>
  )
}
