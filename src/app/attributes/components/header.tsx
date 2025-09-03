"use client";
import { Button } from "@/components/ui/button";
import { NameStore } from "@/hooks/use-name";
import { useState, useMemo, useCallback } from "react";
import { AutocompleteInput, AutocompleteItem } from "./auto-complete-input";

export function Header() {
  const { currentLanguage, handleCyclingLanguages, currentView, handleCyclingViews } = NameStore();
  const [selected, setSelected] = useState<AutocompleteItem | null>(null);
  const { setActiveCard, data } = NameStore();

  // Map names of God to autocomplete items in the current language
  const items: AutocompleteItem[] = useMemo(() => {
    if (!data?.length) return [];

    return data.map((name) => {
      const entry = name.text.find((t) => t.language === currentLanguage);
      return {
        id: String(name.order_in_revelation),
        label: entry?.text ?? "",
        hint: name.article?.title,
        group: "Attributes of God",
        index: name.order_in_revelation,
      };
    });
  }, [currentLanguage, data]);

  // Memoize the search function to prevent recreation on every render
  const onSearch = useCallback(
    async (q: string) => {
      const s = q.toLowerCase();

      return items.filter(
        (item) => item.label.toLowerCase().includes(s) || item.hint?.toLowerCase().includes(s)
      );
    },
    [items]
  );

  // Memoize the select handler
  const handleSelect = useCallback(
    (item: AutocompleteItem) => {
      setActiveCard(item.index - 1);
      setSelected(item);
    },
    [setActiveCard]
  );

  // Memoize button labels to avoid inline string operations
  const languageLabel = currentLanguage;
  const viewLabel = currentView;

  return (
    <div className="grid h-fit w-full grid-cols-12 items-center justify-between gap-3 border-b p-2">
      <div className="relative col-span-6 col-start-2">
        <AutocompleteInput
          placeholder="Search attributes of God..."
          onSearch={onSearch}
          onSelect={handleSelect}
          recentKey="attributesofgod.recents"
          // className="rounded-lg border-2 py-3 pl-10 pr-4 text-base transition-all duration-200 focus:border-primary"
        />
      </div>
      <Button variant="special" onClick={handleCyclingLanguages} className="col-span-1 col-end-11">
        {languageLabel}
      </Button>
      <Button variant="special" onClick={handleCyclingViews} className="col-span-1">
        {viewLabel}
      </Button>
    </div>
  );
}
