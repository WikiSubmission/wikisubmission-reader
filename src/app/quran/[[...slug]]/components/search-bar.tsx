"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { parseQuranQuery } from "@/utils/parse-quran-query";
import { Button } from "@/components/ui/button";
import { Search, Book, Hash, FileText, RefreshCcw } from "lucide-react";
import { QuranPageStore } from "@/hooks/use-quran-page";

function toReadableURL(query: string) {
  return query
    .trim()
    .replace(/[^a-zA-Z0-9:\-,\s]/g, "") // allow colon, dash, comma, space
    .replace(/\s+/g, "+");
}

export default function SearchBar() {
  const { query, setQuery } = QuranPageStore();
  const [suggestion, setSuggestion] = useState<{
    label: string;
    url: string;
    type: string;
    icon: React.ComponentType<any>;
  } | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      if (!query.trim()) return setSuggestion(null);
      try {
        const parsed = parseQuranQuery(query.trim(), {});
        const label = getLabelFromParsedQuery(parsed);
        const icon = getIconFromType(parsed.type);

        if (label) {
          setSuggestion({
            label,
            url: `/quran/${toReadableURL(query)}`,
            type: parsed.type,
            icon,
          });
        } else {
          setSuggestion(null);
        }
      } catch {
        setSuggestion(null);
      }
    }, 150);

    return () => clearTimeout(timeout.current);
  }, [query]);

  // Handle clicks outside the search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setHighlighted(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLabelFromParsedQuery = (parsed: any): string | null => {
    switch (parsed.type) {
      case "chapter":
        return `Chapter ${parsed.parsed_query.chapter}`;
      case "verse":
        return `Verse ${parsed.parsed_query.chapter}:${parsed.parsed_query.verse}`;
      case "verse_range":
        return `Verses ${parsed.parsed_query.chapter}:${parsed.parsed_query.verse}-${parsed.parsed_query.verse_end}`;
      case "multiple_verses":
        const count = parsed.parsed_query.length;
        return `${count} verse${count > 1 ? "s" : ""} selected`;
      case "search":
        return `Search for "${parsed.parsed_query}"`;
      default:
        return null;
    }
  };

  const getIconFromType = (type: string) => {
    switch (type) {
      case "chapter":
        return Book;
      case "verse":
      case "verse_range":
      case "multiple_verses":
        return Hash;
      case "search":
        return Search;
      default:
        return FileText;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" && suggestion) {
      e.preventDefault();
      setHighlighted(true);
    } else if (e.key === "ArrowUp" && suggestion) {
      e.preventDefault();
      setHighlighted(false);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/quran/${toReadableURL(query)}`);
        reset();
      }
    } else if (e.key === "Escape") {
      reset();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/quran/${toReadableURL(query)}`);
      reset();
    }
  };

  const reset = () => {
    setShowSuggestions(false);
    setHighlighted(false);
  };

  return (
    <main className="relative mx-auto w-full max-w-2xl" ref={searchRef}>
      <div className="mb-2 flex items-center justify-end">
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="h-6 justify-start gap-1 rounded-md px-2 text-xs text-muted-foreground transition hover:bg-gray-100 hover:text-violet-600 dark:hover:bg-gray-800 dark:hover:text-violet-400"
            onClick={() => {
              const timestamp = Date.now().toString();
              router.push(`/quran/random-chapter?t=${timestamp}`);
            }}
          >
            <RefreshCcw className="h-3 w-3" />
            Random Chapter
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="h-6 justify-start gap-1 rounded-md px-2 text-xs text-muted-foreground transition hover:bg-gray-100 hover:text-violet-600 dark:hover:bg-gray-800 dark:hover:text-violet-400"
            onClick={() => {
              const timestamp = Date.now().toString();
              router.push(`/quran/random-verse?t=${timestamp}`);
            }}
          >
            <RefreshCcw className="h-3 w-3" />
            Random Verse
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="relative items-center">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            placeholder="Chapter, verse, or text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
              setHighlighted(false);
            }}
            onFocus={() => {
              if (query.trim()) {
                setShowSuggestions(true);
              }
            }}
            onKeyDown={handleKeyDown}
            className="rounded-lg border-2 py-3 pl-10 pr-4 text-base transition-all duration-200 focus:border-primary"
            autoComplete="off"
          />
        </div>

        {showSuggestions && suggestion && query.trim() && (
          <div className="absolute left-0 right-0 z-[60] mt-2">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <Button
                type="button"
                variant="ghost"
                className={`h-auto w-full justify-start rounded-none px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  highlighted ? "bg-gray-50 dark:bg-gray-700" : ""
                }`}
                onClick={() => {
                  router.push(suggestion.url);
                  reset();
                }}
              >
                <div className="flex w-full items-center gap-3">
                  <div className="flex-shrink-0">
                    <suggestion.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-gray-900 dark:text-gray-100">
                      {suggestion.label}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">Tap or Press Enter</div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="rounded bg-gray-100 px-2 py-1 font-mono text-xs text-muted-foreground dark:bg-gray-700">
                      {suggestion.type}
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        )}

        {!query.trim() && !showSuggestions && searchParams.size === 0 && pathname === "/quran" && (
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { text: "Chapter 13", query: "13", icon: Book },
              { text: "Verse 2:255", query: "2:255", icon: Hash },
              { text: "Search 'angels'", query: "angels", icon: Search },
              { text: "Range 74:16–37", query: "74:16-37", icon: Hash },
            ].map((example, index) => (
              <Button
                key={index}
                type="button"
                variant="secondary"
                size="sm"
                className="h-9 justify-start gap-2 rounded-full text-sm transition hover:text-violet-600 dark:hover:text-violet-400"
                onClick={() => router.push(`/quran/${toReadableURL(example.query)}`)}
              >
                <example.icon className="h-4 w-4" />
                {example.text}
              </Button>
            ))}
          </div>
        )}
      </form>
    </main>
  );
}
