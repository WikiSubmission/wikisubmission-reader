"use client";

import { useQuranSettings } from "@/hooks/use-quran-settings";
import { WQuranVerse } from "@/types/w-quran";

export default function VerseTextTransliterated({
  verse,
}: {
  verse: WQuranVerse;
}) {
  const quranSettings = useQuranSettings();
  if (quranSettings.settings.showTransliteration) {
    return (
      <section>
        <p className="text-lg leading-relaxed text-gray-500 dark:text-gray-400">
          {verse.verse_text_transliterated}
        </p>
      </section>
    );
  }
}
