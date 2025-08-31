"use client";
import { Button } from "@/components/ui/button";
import { NameStore } from "@/hooks/use-name";
import { useState, useMemo } from "react";
import { AutocompleteInput, AutocompleteItem } from "./auto-complete-input";
import { toast } from "@/hooks/use-toast";

export function Header() {
  const { currentLanguage, handleCyclingLanguages, currentView, handleCyclingViews } = NameStore();
  const [selected, setSelected] = useState<AutocompleteItem | null>(null);
  const { applyFilter, setActiveCard, data } = NameStore();

  // Map names of God to autocomplete items in the current language
  const items: AutocompleteItem[] = useMemo(() => {
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

  const onSearch = async (q: string) => {
    const s = q.toLowerCase();
    // applyFilter(s);
    return items.filter(
      (i) => i.label.toLowerCase().includes(s) || i.hint?.toLowerCase().includes(s)
    );
  };

  return (
    <div className="grid h-fit w-full grid-cols-12 items-center justify-between gap-3 border-b p-2">
      <div className="relative col-span-6 col-start-2">
        <AutocompleteInput
          placeholder="Search attributes of God..."
          onSearch={onSearch}
          onSelect={(item) => {
            setActiveCard(item.index - 1);
            setSelected(item);
            alert(`clicked ${item.label}`);
          }}
          recentKey="attributesofgod.recents"
          // className="rounded-lg border-2 py-3 pl-10 pr-4 text-base transition-all duration-200 focus:border-primary"
        />
      </div>

      <Button variant="special" onClick={handleCyclingLanguages} className="col-span-1 col-end-11">
        {currentLanguage}
      </Button>
      <Button variant="special" onClick={handleCyclingViews} className="col-span-1">
        {currentView}
      </Button>
    </div>
  );
}
