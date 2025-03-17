"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { LoadingIcon } from "@/components/ui/loading-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Data } from "@/data";
import { useQuranSettings } from "@/hooks/use-quran-settings";
import { Database } from "@/types/generated/database.types";
import { Suspense } from "react";
import clsx from "clsx";

export default function VerseComponent({
  verse,
  isLink,
}: {
  verse: Database["public"]["Tables"]["DataQuran"]["Row"];
  isLink?: boolean;
}) {
  const useSettings = useQuranSettings();
  const searchParams = useSearchParams();
  const [isHighlighted, setIsHighlighted] = useState(false);

  const verseSearchParam = searchParams.get("verse");

  const wordByWordData = Data.DataQuranWordByWord.filter(
    (i) => i.verse_id === verse.verse_id,
  );

  const renderHighlightedText = (text?: string | null) => {
    if (!text) return null; // Prevent rendering "null" or "undefined"

    return text.split(/(\*\*.*?\*\*)/g).map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <span
          key={index}
          className={`bg-yellow-300 dark:bg-yellow-800 rounded`}
        >
          {part.slice(2, -2)}
        </span>
      ) : (
        part
      ),
    );
  };

  useEffect(() => {
    if (verse && verse.verse_number.toString() === verseSearchParam) {
      const element = document.getElementById(verseSearchParam);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });

        // Add highlight effect.
        setIsHighlighted(true);
        setTimeout(() => {
          setIsHighlighted(false);
        }, 2000);
      }
    }
  }, [verseSearchParam]);

  return (
    <div
      key={verse.verse_id}
      id={verse.verse_number.toString()}
      className={clsx(
        "mb-1 space-y-4 border p-3 rounded-lg bg-white dark:bg-black transition duration-500",
        isHighlighted ? "bg-slate-200 dark:bg-slate-900 shadow-lg" : "",
      )}
    >
      <section>
        <div className="flex flex-col">
          <div className="flex justify-between mb-2">
            <Badge variant="secondary" className="text-md w-fit">
              <span className="font-light">{verse.verse_id}</span>
            </Badge>
            {isLink && (
              <Badge variant="secondary" className="mb-2 text-md w-fit">
                <span className="font-light">
                  <a
                    href={`/dashboard/quran/reader/chapter/${verse.chapter_number}?verse=${verse.verse_number}`}
                  >
                    <span className="font-light">Go to verse →</span>
                  </a>
                </span>
              </Badge>
            )}
          </div>
          {useSettings.settings.showSubtitles &&
            verse.verse_subtitle_english &&
            verse.verse_subtitle_english !== "null" && (
              <span className="mb-4 italic text-violet-600 dark:text-violet-500 dark:text-violet-700 justify-center text-center items-center">
                {renderHighlightedText(verse.verse_subtitle_english)}
              </span>
            )}
        </div>
        <div className="mx-2 flex justify-between items-start font-light">
          <p className="w-3/6 pr-4">
            {renderHighlightedText(verse.verse_text_english)}
          </p>

          {useSettings.settings.showArabic && (
            <div className="flex flex-wrap justify-end gap-1 text-left w-3/6 pl-4">
              <div className="flex flex-wrap gap-2 pl-4" dir="rtl">
                {verse.verse_text_arabic.split(" ").map((word, wordIndex) => (
                  <TooltipProvider delayDuration={0} key={wordIndex}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <p className="text-xl hover:text-yellow-500">
                            {word}
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent asChild>
                        <Badge>
                          <span dir="ltr">
                            {wordByWordData
                              ?.filter((i) => i.verse_id === verse.verse_id)
                              .map((w) => w.english_text)[wordIndex] ?? "–"}
                          </span>
                        </Badge>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          )}
        </div>
        {useSettings.settings.showTransliteration && (
          <section className="flex mx-2 mt-2 text-left font-light text-violet-600 md:w-1/2">
            {verse.verse_text_arabic_transliteration}
          </section>
        )}
        {useSettings.settings.showFootnotes &&
          verse.verse_footnote_english &&
          verse.verse_footnote_english !== "null" && (
            <section className="mx-2 mt-2 text-left text-sm italic font-light text-slate-500 dark:text-slate-500">
              {renderHighlightedText(verse.verse_footnote_english)}
            </section>
          )}
      </section>
      {useSettings.settings.showWordByWord && (
        <Suspense fallback={<LoadingIcon />}>
          <section>
            <div className="flex flex-col space-y-1 md:w-3/6">
              {wordByWordData
                .filter((w) => w.verse_id == verse.verse_id)
                ?.map((w, idx) => (
                  <div key={`${w.verse_id}:${w.id}:${idx}`}>
                    <Badge variant="outline" className="flex grid grid-cols-3">
                      <span>
                        {idx + 1}. {w.english_text}
                      </span>
                      <span dir="rtl">{w.arabic_text}</span>
                      <span className="italic" dir="rtl">
                        {w.transliterated_text}
                      </span>
                    </Badge>
                  </div>
                ))}
            </div>
          </section>
        </Suspense>
      )}
    </div>
  );
}
