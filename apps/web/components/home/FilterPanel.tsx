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

