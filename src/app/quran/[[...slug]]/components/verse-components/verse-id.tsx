"use client";

import { WQuranVerse } from "@/types/w-quran";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerseId({ verse }: { verse: WQuranVerse }) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const verseSearchParam = useSearchParams().get("verse");

  useEffect(() => {
    if (verse.verse_number.toString() === verseSearchParam) {
      const element = document.getElementById(verse.verse_id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        setIsHighlighted(true);
        setTimeout(() => setIsHighlighted(false), 2000);
      }
    }
  }, [verse, verseSearchParam]);

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
