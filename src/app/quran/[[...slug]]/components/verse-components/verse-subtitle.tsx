"use client";

import { Languages } from "@/hooks/use-quran-page";
import { useQuranSettings } from "@/hooks/use-quran-settings";
import { WQuranVerse } from "@/types/w-quran";
import { highlightMarkdown } from "@/utils/highlight-markdown";

export default function VerseSubtitle({
  verse,
  language,
}: {
  verse: WQuranVerse;
  language: Languages;
}) {
  const quranSettings = useQuranSettings();

  // Construct dynamic key
  const normalizedLang = language?.trim().toLowerCase() ?? "english";
  const key = `verse_subtitle_${normalizedLang}` as keyof WQuranVerse;
  const subtitle = verse[key];

  if (quranSettings.settings.showSubtitles && typeof subtitle === "string" && subtitle !== "null") {
    return (
      <section>
        <div className="rounded text-center text-sm font-medium italic text-violet-600 dark:text-violet-700">
          {highlightMarkdown(subtitle)}
        </div>
      </section>
    );
  }

  return null;
}
