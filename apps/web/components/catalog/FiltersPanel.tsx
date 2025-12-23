"use client";

import { Badge, Button, TextField } from "@/components/ui";
import { useLanguage, useTranslations } from "@/context/LanguageContext";
import { FiltersState } from "@/hooks/useFilters";
import { getConditionLabel } from "@/lib/localization";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";
import { FilterDropdown } from "./FilterDropdown";
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
}: FiltersPanelProps) {
  const { language } = useLanguage();
  const t = useTranslations();

  const updateSelection = (
    key: "categories" | "genres",
    nextSelection: FiltersState["categories"],
  ) => updateFilter(key, nextSelection);

  return (
    <aside className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-indigo-600">{t.filters.title}</p>
          <p className="text-xs text-slate-500">{t.filters.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="text-sm font-semibold text-indigo-700"
            onClick={resetFilters}
          >
            {t.filters.reset}
          </Button>
        </div>
      </div>

      <TextField
        placeholder={t.filters.searchPlaceholder}
        value={filters.searchQuery}
        onChange={(event) => updateFilter("searchQuery", event.target.value)}
      />

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-800">{t.filters.categories}</h3>
          <Badge tone="info">{categories.length}</Badge>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <p>{t.filters.selectionHint}</p>
          {renderModeToggle("categories", filters.categories.mode)}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <FilterPill
              key={category._id}
              label={getLocalizedText(language, category.name, category.nameJa)}
              state={resolvePillState(
                filters.categories.include,
                filters.categories.exclude,
                category._id,
              )}
              onClick={() => cycleSelection("categories", category._id)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-800">{t.filters.genres}</h3>
          <Badge tone="neutral">{genres.length}</Badge>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <p>{t.filters.selectionHint}</p>
          {renderModeToggle("genres", filters.genres.mode)}
        </div>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <FilterPill
              key={genre._id}
              label={getLocalizedText(language, genre.name, genre.nameJa)}
              state={resolvePillState(
                filters.genres.include,
                filters.genres.exclude,
                genre._id,
              )}
              onClick={() => cycleSelection("genres", genre._id)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-800">{t.filters.condition}</h3>
          <Badge tone="warning">{conditions.length}</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {conditions.map((condition) => (
            <FilterPill
              key={condition.value}
              label={getConditionLabel(language, condition.value)}
              state={
                filters.condition === condition.value ? "include" : "inactive"
              }
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

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">{t.filters.price}</h3>
          <Badge tone="neutral">
            {t.filters.priceHelper(filters.priceRange[0], filters.priceRange[1])}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <label className="flex flex-col gap-1 text-slate-600">
            <span>{t.filters.min}</span>
            <input
              type="number"
              min={priceBounds[0]}
              max={priceBounds[1]}
              value={filters.priceRange[0]}
              onChange={(event) =>
                updateFilter("priceRange", [
                  Number(event.target.value),
                  filters.priceRange[1],
                ])
              }
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
          <label className="flex flex-col gap-1 text-slate-600">
            <span>{t.filters.max}</span>
            <input
              type="number"
              min={filters.priceRange[0]}
              max={priceBounds[1]}
              value={filters.priceRange[1]}
              onChange={(event) =>
                updateFilter("priceRange", [
                  filters.priceRange[0],
                  Number(event.target.value) || priceBounds[1],
                ])
              }
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
        </div>
      </div>
    </aside>
  );
}
