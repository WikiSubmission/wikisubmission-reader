"use client";

import { Languages } from "@/hooks/use-quran-page";
import { WQuranVerse } from "@/types/w-quran";
import { highlightMarkdown } from "@/utils/highlight-markdown";
import { useQuranAudio } from "@/hooks/use-quran-audio";

export default function VerseTextPrimary({
  verse,
  language,
}: {
  verse: WQuranVerse;
  language: Languages;
}) {
  const audio = useQuranAudio();

  const isCurrentVerse = audio.currentVerse?.verse_id === verse.verse_id;
  const isPlaying = isCurrentVerse && audio.isPlaying;

  // Construct the dynamic field name based on the language
  const normalizedLang = language?.trim().toLowerCase() ?? "english";
  const textKey = `verse_text_${normalizedLang}` as keyof WQuranVerse;
  const verseText = verse[textKey] || verse.verse_text_english; // fallback to English if missing

  return (
    <section>
      <p
        className={`text-lg leading-relaxed text-gray-800 transition-all duration-300 dark:text-gray-200 ${
          isPlaying
            ? "rounded-lg border-l-4 border-violet-500 bg-gradient-to-r from-violet-50 to-blue-50 px-4 py-3 shadow-sm dark:from-violet-950/30 dark:to-blue-950/30"
            : ""
        }`}
      >
        {highlightMarkdown(verseText as string)}
      </p>
    </section>
  );
}
