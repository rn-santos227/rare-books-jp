import HomePageClient from "@/components/home/HomePageClient";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Book } from "@/types/book";
import { Category } from "@/types/category";
import { Genre } from "@/types/genre";

interface DiscoverySectionsProps {
  books: Book[];
  categories: Category[];
  genres: Genre[];
}


