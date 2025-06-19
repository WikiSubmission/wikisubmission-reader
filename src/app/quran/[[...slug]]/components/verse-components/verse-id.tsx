"use client";

import { WQuranVerse } from "@/types/w-quran";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerseId({ verse }: { verse: WQuranVerse }) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const verseSearchParam = useSearchParams().get("verse");
  const chapterSearchParam = useSearchParams().get("chapter"); // optional

  useEffect(() => {
    let shouldScroll = false;

    if (verseSearchParam) {
      if (chapterSearchParam === null) {
        // No chapter specified - match verse number only (for single chapter contexts)
        shouldScroll = verse.verse_number.toString() === verseSearchParam;
      } else {
        // Both chapter and verse specified - match both
        shouldScroll =
          verse.chapter_number.toString() === chapterSearchParam &&
          verse.verse_number.toString() === verseSearchParam;
      }
    }

    if (shouldScroll) {
      const element = document.getElementById(`verse-${verse.verse_number}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        setIsHighlighted(true);
        setTimeout(() => setIsHighlighted(false), 2000);
      }
    }
  }, [verse, verseSearchParam, chapterSearchParam]);

  const highlightClass = isHighlighted ? "text-red-500" : "";

  return (
    <section id={`verse-${verse.verse_number}`}>
      <p className={`font-medium text-lg ${highlightClass}`}>
        {verse.chapter_number}:
        <span className={highlightClass}>{verse.verse_number}</span>
      </p>
    </section>
  );
}
