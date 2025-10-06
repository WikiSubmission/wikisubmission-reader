"use client";

import { WQuranVerse } from "@/types/w-quran";
import { useQuranSettings } from "@/hooks/use-quran-settings";
import { highlightMarkdown } from "@/utils/highlight-markdown";
import { Languages } from "@/hooks/use-quran-page";

export default function VerseFootnote({
  verse,
  language,
}: {
  verse: WQuranVerse;
  language: Languages;
}) {
  const quranSettings = useQuranSettings();

  // Dynamically build the field name (e.g. verse_footnote_french)
  const normalizedLang = language?.trim().toLowerCase() ?? "english";
  const key = `verse_footnote_${normalizedLang}` as keyof WQuranVerse;
  const footnote = verse[key] || verse.verse_footnote_english; // fallback to English

  if (quranSettings.settings.showFootnotes && typeof footnote === "string" && footnote !== "null") {
    return (
      <section>
        <div className="text-grey-600 rounded border-l-4 border-gray-500 bg-violet-50 p-3 text-xs italic dark:bg-violet-900/20">
          {highlightMarkdown(footnote)}
        </div>
      </section>
    );
  }

  return null;
}
