"use client";

import { useLanguage, useTranslations } from "@/context/LanguageContext";
import { getLocalizedText } from "@/lib/localization";
import { Book } from "@/types/book";
import { useBookSearch } from "./hooks/useBookSearch";

type BookSearchFieldProps = {
  books: Book[];
};

export function BookSearchField({ books }: BookSearchFieldProps) {
  const { language } = useLanguage();
  const t = useTranslations();

  const {
    query,
    setQuery,
    isFocused,
    setIsFocused,
    suggestions,
    handleSelect,
    handleSubmit,
  } = useBookSearch(books);

  return (
    <div className="relative flex-1">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 rounded-full bg-white/5 px-4 py-3 text-sm text-slate-300 ring-1 ring-white/10"
      >
        <span className="text-slate-500">🔍</span>
        <input
          className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          placeholder={t.common.searchPlaceholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 120)}
        />
      </form>

      {isFocused && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-3 overflow-hidden rounded-2xl bg-slate-950/90 text-white shadow-xl ring-1 ring-white/10 backdrop-blur">
          <div className="border-b border-white/10 px-4 py-3 text-xs uppercase tracking-wide text-slate-400">
            {t.home.latestArrivals}
          </div>
          <ul className="divide-y divide-white/5">
            {suggestions.map((book) => {
              const title = getLocalizedText(language, book.title, book.titleJa);
              const author = getLocalizedText(
                language,
                book.author,
                book.authorJa,
              );

              return (
                <li key={book._id}>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left transition hover:bg-white/5"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSelect(book)}
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="text-xs text-slate-400">
                        {author || t.common.unknownAuthor}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-indigo-200">
                      {t.common.viewDetails}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
