import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Loader2, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NameStore } from "@/hooks/use-name";

/**
 * AutocompleteInput
 * - Shadcn + cmdk powered input with suggestion popover
 * - Features: debounce, async search, keyboard nav, recent items, loading/empty states, clear button
 * - Uses Zustand store for recent items storage
 */

export type AutocompleteItem = {
  id: string;
  label: string;
  index: number;
  hint?: string;
  group?: string; // optional grouping label
  icon?: React.ReactNode;
};

export type AutocompleteInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (item: AutocompleteItem) => void;
  onSearch?: (query: string) => Promise<AutocompleteItem[]>;
  placeholder?: string;
  recentKey?: string; // store key for recents
  debounceMs?: number;
  disabled?: boolean;
  className?: string;
  emptyLabel?: string;
  maxHeight?: number; // px
};

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function groupBy<T extends AutocompleteItem>(items: T[]) {
  const map = new Map<string, T[]>();
  for (const it of items) {
    const g = it.group ?? "Suggestions";
    if (!map.has(g)) map.set(g, []);
    map.get(g)!.push(it);
  }
  return Array.from(map.entries());
}

export function AutocompleteInput({
  value: controlled,
  onChange,
  onSelect,
  onSearch,
  placeholder = "Search…",
  recentKey = "autocomplete.recents",
  debounceMs = 250,
  disabled,
  className,
  emptyLabel = "No results",
  maxHeight = 300,
}: AutocompleteInputProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(controlled ?? "");
  const [suggestion, setSuggestion] = useState<AutocompleteItem | null>(null);
  const [highlighted, setHighlighted] = useState(false);
  const debounced = useDebouncedValue(input, debounceMs);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AutocompleteItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { getRecents, addRecent } = NameStore();

  // Controlled vs uncontrolled
  useEffect(() => {
    if (controlled !== undefined) setInput(controlled);
  }, [controlled]);

  // Fetch suggestions
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setError(null);
      if (!onSearch) return;
      if (!debounced.trim()) {
        setResults([]);
        setSuggestion(null);
        return;
      }
      setLoading(true);
      try {
        const out = await onSearch(debounced.trim());
        if (!cancelled) {
          setResults(out);
          // Set first result as suggestion
          if (out.length > 0) {
            setSuggestion(out[0]);
          } else {
            setSuggestion(null);
          }
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message ?? "Search failed");
          setSuggestion(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [debounced, onSearch]);

  // Handle clicks outside the search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setHighlighted(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearInput = () => {
    setInput("");
    onChange?.("");
    setResults([]);
    setSuggestion(null);
    setOpen(false);
    inputRef.current?.focus();
  };

  const handleSelect = (item: AutocompleteItem) => {
    addRecent(recentKey, item);
    onSelect?.(item);
    setOpen(false);
    setInput(item.label);
    onChange?.(item.label);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open && (results.length > 0 || getRecents(recentKey).length > 0)) {
        setOpen(true);
      }
      setHighlighted(true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted(false);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlighted && suggestion) {
        handleSelect(suggestion);
      } else if (input.trim()) {
        // Handle direct enter without selection
        const firstResult = results[0] || getRecents(recentKey)[0];
        if (firstResult) {
          handleSelect(firstResult);
        }
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlighted(false);
      inputRef.current?.blur();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestion && highlighted) {
      handleSelect(suggestion);
    } else if (input.trim()) {
      const firstResult = results[0] || getRecents(recentKey)[0];
      if (firstResult) {
        handleSelect(firstResult);
      }
    }
  };

  const showPopover =
    open && (loading || error || input.trim().length > 0 || getRecents(recentKey).length > 0);
  const allItems = input.trim() ? results : getRecents(recentKey);

  return (
    <div ref={containerRef} className={"relative w-full " + (className ?? "")}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            onChange?.(e.target.value);
            setOpen(true);
            setHighlighted(false);
          }}
          onFocus={() => {
            if (input.trim() || getRecents(recentKey).length > 0) {
              setOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="rounded-lg border-2 py-3 pl-10 pr-10 text-base transition-all duration-200 focus:border-primary"
          autoComplete="off"
        />
        <AnimatePresence>
          {!!input && (
            <motion.button
              type="button"
              onClick={clearInput}
              className="absolute right-3 top-2 -translate-y-1/2 rounded-full p-1 hover:bg-muted"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {showPopover && (
        <div className="absolute left-0 right-0 z-[60] mt-2">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="max-h-[300px] overflow-y-auto">
              {loading && (
                <div className="space-y-2 p-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Searching…
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-11/12" />
                    <Skeleton className="h-8 w-10/12" />
                  </div>
                </div>
              )}

              {!loading && error && (
                <div className="p-4 text-sm text-red-600 dark:text-red-400">Error: {error}</div>
              )}

              {!loading && !error && results.length > 0 && input.trim() && (
                <>
                  {groupBy(results).map(([group, items], groupIndex) => (
                    <div key={group}>
                      {groupIndex > 0 && (
                        <div className="border-t border-gray-100 dark:border-gray-700" />
                      )}
                      <div className="px-3 py-2">
                        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {group}
                        </div>
                        {items.map((item, itemIndex) => (
                          <Button
                            key={item.id}
                            type="button"
                            variant="ghost"
                            className={`h-auto w-full justify-start rounded-md px-3 py-2 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                              highlighted && suggestion?.id === item.id
                                ? "bg-gray-50 dark:bg-gray-700"
                                : ""
                            }`}
                            onClick={() => handleSelect(item)}
                          >
                            <div className="flex w-full items-center gap-3">
                              {item.icon && <div className="flex-shrink-0">{item.icon}</div>}
                              <div className="min-w-0 flex-1">
                                <div className="truncate font-medium text-gray-900 dark:text-gray-100">
                                  {item.label}
                                </div>
                                {item.hint && (
                                  <div className="text-xs text-muted-foreground">{item.hint}</div>
                                )}
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {!loading && !error && results.length === 0 && input.trim().length > 0 && (
                <div className="p-4 text-center text-sm text-muted-foreground">{emptyLabel}</div>
              )}

              {!loading &&
                !error &&
                input.trim().length === 0 &&
                getRecents(recentKey).length > 0 && (
                  <div className="px-3 py-2">
                    <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Recent
                    </div>
                    {getRecents(recentKey).map((item) => (
                      <Button
                        key={item.id}
                        type="button"
                        variant="ghost"
                        className="h-auto w-full justify-start rounded-md px-3 py-2 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                        onClick={() => handleSelect(item)}
                      >
                        <div className="flex w-full items-center gap-3">
                          {item.icon && <div className="flex-shrink-0">{item.icon}</div>}
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-medium text-gray-900 dark:text-gray-100">
                              {item.label}
                            </div>
                            {item.hint && (
                              <div className="text-xs text-muted-foreground">{item.hint}</div>
                            )}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Demo component showing usage
// export default function AutocompleteDemo() {
//   // Mock data
//   const DATA: AutocompleteItem[] = useMemo(
//     () => [
//       { id: "1", label: "Project Alpha", hint: "Portfolio", group: "Projects" },
//       { id: "2", label: "Project Beta", hint: "Logistics", group: "Projects" },
//       { id: "3", label: "Budget Overview", hint: "Report", group: "Dashboards" },
//       { id: "4", label: "Risk Register", hint: "Compliance", group: "Dashboards" },
//       { id: "5", label: "Sprints", hint: "Scrum", group: "Pages" },
//       { id: "6", label: "People", hint: "Directory", group: "Pages" },
//       { id: "7", label: "Settings", hint: "Preferences", group: "System" },
//     ],
//     []
//   );

//   // Mock search function
//   const search = async (q: string) => {
//     await new Promise((r) => setTimeout(r, 300)); // simulate latency
//     const s = q.toLowerCase();
//     return DATA.filter(
//       (d) => d.label.toLowerCase().includes(s) || d.hint?.toLowerCase().includes(s)
//     );
//   };

//   // Mock Zustand store
//   const mockNameStore = {
//     getRecents: (key: string): AutocompleteItem[] => {
//       try {
//         const stored = JSON.parse(localStorage.getItem(key) || "[]");
//         return Array.isArray(stored) ? stored.slice(0, 8) : [];
//       } catch {
//         return [];
//       }
//     },
//     addRecent: (key: string, item: AutocompleteItem) => {
//       try {
//         const current = JSON.parse(localStorage.getItem(key) || "[]");
//         const filtered = Array.isArray(current)
//           ? current.filter((r: AutocompleteItem) => r.id !== item.id)
//           : [];
//         const updated = [item, ...filtered].slice(0, 12);
//         localStorage.setItem(key, JSON.stringify(updated));
//       } catch {
//         // ignore
//       }
//     },
//   };

//   const [selected, setSelected] = useState<AutocompleteItem | null>(null);

//   return (
//     <div className="flex min-h-screen w-full items-start justify-center bg-gradient-to-b from-white to-slate-50 p-8">
//       <div className="w-full max-w-2xl space-y-6">
//         <h1 className="text-3xl font-semibold tracking-tight">Fixed Autocomplete Input</h1>
//         <p className="text-sm text-muted-foreground">
//           Type to search. Use ↑/↓ to navigate, Enter to select. Esc to close. Click × to clear.
//         </p>

//         <AutocompleteInput
//           placeholder="Chapter, verse, or text"
//           onSearch={search}
//           onSelect={(item) => setSelected(item)}
//           recentKey="demo.autocomplete.recents"
//           emptyLabel="No matches. Try a different keyword."
//           maxHeight={320}
//         />

//         <AnimatePresence>
//           {selected && (
//             <motion.div
//               initial={{ opacity: 0, y: -4 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -4 }}
//             >
//               <div className="flex items-center gap-2">
//                 <Badge variant="secondary" className="rounded-2xl px-3 py-1">
//                   <Check className="mr-1 h-3.5 w-3.5" /> Selected
//                 </Badge>
//                 <span className="text-sm text-muted-foreground">{selected.label}</span>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }
