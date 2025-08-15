"use client";

import { useQuranSettings } from "@/hooks/use-quran-settings";
import { WQuranVerse } from "@/types/w-quran";
import { highlightMarkdown } from "@/utils/highlight-markdown";

export default function VerseSubtitle({ verse }: { verse: WQuranVerse }) {
  const quranSettings = useQuranSettings();
  if (
    quranSettings.settings.showSubtitles &&
    verse.verse_subtitle_english &&
    verse.verse_subtitle_english !== "null"
  ) {
    return (
      <section>
        <div className="rounded text-center text-sm font-medium italic text-violet-600 dark:text-violet-700">
          {highlightMarkdown(verse.verse_subtitle_english)}
        </div>
      </section>
    );
  }
}
