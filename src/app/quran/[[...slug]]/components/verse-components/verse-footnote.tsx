"use client";

import { WQuranVerse } from "@/types/w-quran";
import { useQuranSettings } from "@/hooks/use-quran-settings";
import { highlightMarkdown } from "@/utils/highlight-markdown";

export default function VerseFootnote({ verse }: { verse: WQuranVerse }) {
  const quranSettings = useQuranSettings();
  if (
    quranSettings.settings.showFootnotes &&
    verse.verse_footnote_english &&
    verse.verse_footnote_english !== "null"
  ) {
    return (
      <section>
        <div className="text-xs italic text-grey-600 p-3 bg-violet-50 dark:bg-violet-900/20 rounded border-l-4 border-gray-500">
          {highlightMarkdown(verse.verse_footnote_english)}
        </div>
      </section>
    );
  }
}
