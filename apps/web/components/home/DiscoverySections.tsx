import BookCard from "@/components/home/BookCard";
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

export function DiscoverySections({ books, categories, genres }: DiscoverySectionsProps) {
  return (
    <>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-lg font-semibold text-black">Popular genres</span>
            <Badge tone="info" className="bg-white/5 text-slate-500 ring-1 ring-white/10">
              Browse the shelf
            </Badge>
          </div>
          <Button
            variant="ghost"
            href="/catalog"
            className="text-sm text-slate-200 hover:bg-white/10"
          >
            See all
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {genres.slice(0, 12).map((genre) => (
            <div
              key={genre._id}
              className="group flex flex-col items-center gap-2 rounded-2xl bg-[#161922]/70 px-4 py-5 text-center shadow-[0_10px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/5 hover:bg-white/5"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-xl">
                <span role="img" aria-label={genre.name}>
                  ⭐
                </span>
              </div>
              <p className="text-sm font-semibold text-white">{genre.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-lg font-semibold text-black">Popular categories</span>
            <Badge tone="info" className="bg-white/5 text-slate-500 ring-1 ring-white/10">
              Live from Studio
            </Badge>
          </div>
          <Button
            variant="ghost"
            href="/catalog"
            className="text-sm text-slate-200 hover:bg-white/10"
          >
            See all
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {categories.slice(0, 12).map((category) => (
            <div
              key={category._id}
              className="flex flex-col items-center gap-2 rounded-2xl bg-[#161922]/70 px-4 py-5 text-center shadow-[0_10px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/5 hover:bg-white/5"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-lg text-white">
                {category.name.slice(0, 2).toUpperCase()}
              </div>
              <p className="text-sm font-semibold text-white">{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <div>
              <span className="text-lg font-semibold text-black">Latest arrivals</span>
              <p className="text-sm text-slate-600">Freshly added books from our shelves.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge tone="info" className="bg-white/5 text-slate-500 ring-1 ring-white/10">
              {books.length} new
            </Badge>
            <Button variant="secondary" href="/catalog" className="text-sm font-semibold">
              Browse catalog
            </Button>
          </div>
        </div>

        <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
          {books.slice(0, 6).map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </section>
    </>
  );
}

