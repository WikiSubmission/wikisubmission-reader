"use client";
import { Button } from "@/components/ui/button";
import { NameStore } from "@/hooks/use-name";
import { useState, useMemo, useCallback, useEffect, useState as useReactState } from "react";
import { AutocompleteInput, AutocompleteItem } from "./auto-complete-input";

export function Header() {
  const { currentLanguage, handleCyclingLanguages, handleCyclingViews, currentView } = NameStore();
  const { setActiveCard, data } = NameStore();
  const [isMobile, setIsMobile] = useReactState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobile]);

  const items: AutocompleteItem[] = useMemo(() => {
    if (!data?.length) return [];
    console.log("all data: ", data);
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

  const onSearch = useCallback(
    async (q: string) => {
      const s = q.toLowerCase();
      return items.filter(
        (item) => item.label.toLowerCase().includes(s) || item.hint?.toLowerCase().includes(s)
      );
    },
    [items]
  );

  const handleSelect = useCallback(
    (item: AutocompleteItem) => {
      setActiveCard(item.index);
      console.log("active index: ", item.index);
    },
    [setActiveCard]
  );

  return (
    <div className="flex flex-col gap-2 border-b p-2 sm:grid sm:h-fit sm:w-full sm:grid-cols-12 sm:items-center sm:justify-between sm:gap-3">
      {/* Search bar */}
      <div className="relative w-full sm:col-span-6 sm:col-start-2">
        <AutocompleteInput
          placeholder="Search attributes of God..."
          onSearch={onSearch}
          onSelect={handleSelect}
          recentKey="attributesofgod.recents"
        />
      </div>

      {/* Buttons row */}
      <div className="flex w-full justify-end gap-2 sm:col-span-2 sm:col-end-13 sm:justify-end">
        {/* Always visible */}
        <Button variant="special" onClick={handleCyclingLanguages} className="flex-1 sm:flex-none">
          {currentLanguage}
        </Button>

        {/* Only visible on desktop */}
        {!isMobile && (
          <Button variant="special" onClick={handleCyclingViews} className="sm:flex sm:flex-none">
            {currentView}
          </Button>
        )}
      </div>
    </div>
  );
}
