"use client";

import BookCard from "@/components/home/BookCard";
import { FiltersPanel } from "@/components/home/FiltersPanel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCatalog } from "./hooks/useCatalog"
import { Book } from "@/types/book";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";

type CatalogGridProps = {
  books: Book[];
  categories: Category[];
  genres: Genre[];
};

