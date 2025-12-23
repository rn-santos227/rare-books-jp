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

}
