"use client";
import { NameStore } from "@/hooks/use-name";
import { NamesOfGod } from "./God-attributes";
import { NamesOfGodGrid } from "./components/grid";

export function GridCarouselSwitcher() {
  const { currentView } = NameStore();

  return (
    <div className="grid-carousel-switcher">
      {currentView == "carousel" ? <NamesOfGod /> : <NamesOfGodGrid />}
    </div>
  );
}
