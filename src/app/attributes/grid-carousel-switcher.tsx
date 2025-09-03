"use client";
import { NameStore } from "@/hooks/use-name";
import { NamesOfGod } from "./God-attributes";
import { NamesOfGodGrid } from "./components/grid";
import { GodAttributesCardDataType } from "./types";
import { useEffect, useState } from "react";

export const runtime = "nodejs";

interface GridCarouselSwitcherProps {
  attributes: GodAttributesCardDataType[] | null;
  lastUpdated?: string | null;
}

export function GridCarouselSwitcher({ attributes, lastUpdated }: GridCarouselSwitcherProps) {
  const { currentView, setData } = NameStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setData(attributes);

    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [attributes, setData]);

  return (
    <div className="grid-carousel-switcher">
      {isMobile || currentView === "carousel" ? <NamesOfGod /> : <NamesOfGodGrid />}
    </div>
  );
}
