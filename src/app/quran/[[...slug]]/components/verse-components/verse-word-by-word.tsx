"use client";

import { useQuranSettings } from "@/hooks/use-quran-settings";
import { WQuranVerse } from "@/types/w-quran";

export default function VerseWordByWord({ verse }: { verse: WQuranVerse }) {
  const quranSettings = useQuranSettings();

  if (
    quranSettings.settings.showWordByWord &&
    verse.word_by_word &&
    verse.word_by_word.length > 0
  ) {
    return (
      <section>
        <details className="mt-4" open>
          <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
            Word-by-word
          </summary>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {verse.word_by_word.map((word, index) => (
              <div key={index} className="p-2 bg-muted rounded text-center">
                <div className="text-sm">{word.arabic_text}</div>
                <div className="text-xs text-muted-foreground">
                  {word.transliteration}
                </div>
                <div className="text-sm text-muted-foreground">
                  {word.transliterated_text}
                </div>
                <div className="text-sm text-primary font-semibold">
                  {word.english_text}
                </div>
              </div>
            ))}
          </div>
        </details>
      </section>
    );
  }
}
