"use client";
import { NameStore } from "@/hooks/use-name";
import { NamesOfGod } from "./God-attributes";
import { NamesOfGodGrid } from "./components/grid";
import { GodAttributesCardDataType } from "./types";
import { useEffect } from "react";
export const runtime = "nodejs";

interface GridCarouselSwitcherProps {
  attributes: GodAttributesCardDataType[];
  lastUpdated?: string | null;
}

export function GridCarouselSwitcher({ attributes, lastUpdated }: GridCarouselSwitcherProps) {
  const { currentView, setData } = NameStore();
  console.log("attributes: ", attributes);
  useEffect(() => {
    setData(attributes);
  }, [attributes, setData]);
  return (
    <div className="grid-carousel-switcher">
      {currentView == "carousel" ? <NamesOfGod /> : <NamesOfGodGrid />}
    </div>
  );
}
