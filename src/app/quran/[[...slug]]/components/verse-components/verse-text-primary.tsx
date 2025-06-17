"use client";

import { WQuranVerse } from "@/types/w-quran";
import { highlightMarkdown } from "@/utils/highlight-markdown";
import { useQuranAudio } from "@/hooks/use-quran-audio";

export default function VerseTextPrimary({ verse }: { verse: WQuranVerse }) {
  const audio = useQuranAudio();

  const isCurrentVerse = audio.currentVerse?.verse_id === verse.verse_id;
  const isPlaying = isCurrentVerse && audio.isPlaying;

  return (
    <section>
      <p
        className={`text-lg leading-relaxed text-gray-800 dark:text-gray-200 transition-all duration-300 ${
          isPlaying
            ? "bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-950/30 dark:to-blue-950/30 px-4 py-3 rounded-lg border-l-4 border-violet-500 shadow-sm"
            : ""
        }`}
      >
        {highlightMarkdown(verse.verse_text_english)}
      </p>
    </section>
  );
}
