"use client";

import { useState, useEffect } from "react";
import BackButton from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { WQuranAPIResponse } from "@/types/w-quran";
import { stringifyRequestType } from "@/utils/stringify-request-type";
import QuranSettingsButton from "./settings-button";
import PlayAllButton from "./play-all-button";

export default function UtilitySection({
  result,
}: {
  result: WQuranAPIResponse;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 180);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      className={`rounded-full sticky top-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-white/20 dark:bg-gray-950/50 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-700/200 py-2 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div
        className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "px-2" : "px-0"
        }`}
      >
        {/* Left side */}
        <section className="flex gap-2 items-center">
          {/* [Button: Back] */}
          <BackButton />
          {/* [Badge: Request type] */}
          <Badge
            variant="default"
            className={`transition-all duration-300 ${
              isScrolled ? "text-xs px-2 py-1" : ""
            }`}
          >
            {stringifyRequestType(result.request.type)}
          </Badge>
          {/* [Badge: Verse count] */}
          {result.request.type === "chapter" && (
            <Badge
              variant="secondary"
              className={`transition-all duration-300 ${
                isScrolled ? "text-xs px-2 py-1" : ""
              }`}
            >
              {result.response.data.map((v) => v.verse_number >= 1).length - 1}{" "}
              verse{result.response.data.length !== 1 ? "s" : ""}
            </Badge>
          )}
        </section>
        {/* Right side */}
        <section className="flex gap-2 items-center">
          {/* [Button: Play All] */}
          <PlayAllButton verses={result.response.data} />
          {/* [Button: Settings] */}
          <QuranSettingsButton />
        </section>
      </div>
    </main>
  );
}
