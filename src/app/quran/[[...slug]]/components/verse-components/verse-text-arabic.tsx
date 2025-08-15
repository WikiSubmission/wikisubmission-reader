"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { WQuranVerse, WQuranWordByWord } from "@/types/w-quran";
import { RootWordView } from "../root-word-modal";
import { useState, useEffect } from "react";
import { useQuranSettings } from "@/hooks/use-quran-settings";
import { useSearchParams, useParams } from "next/navigation";

export default function VerseTextArabic({ verse }: { verse: WQuranVerse }) {
  const quranSettings = useQuranSettings();
  const searchParams = useSearchParams();
  const params = useParams();
  const wordSearchParam = searchParams.get("word");

  // Get query from URL path (/quran/{q} or /quran/?q={q})
  const pathQuery = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;
  const searchQuery = searchParams.get("q");

  // Only use pathQuery if it doesn't look like a verse reference (e.g., "1", "1:1", "1-10")
  const isVerseReference = (query: string) => {
    return /^[\d]+(?:[\:\-][\d]+)?(?:[\-][\d]+)?$/.test(query);
  };

  const queryHighlight =
    searchQuery || (pathQuery && !isVerseReference(pathQuery) ? pathQuery : null);

  const wordIndexToHighlight = wordSearchParam ? parseInt(wordSearchParam, 10) : null;

  if (quranSettings.settings.showArabic) {
    return (
      <section>
        <div
          className={`text-right text-2xl leading-relaxed text-gray-900 dark:text-gray-100 ${
            quranSettings.settings.showWordByWord ? "py-2 leading-loose" : ""
          }`}
          dir="rtl"
        >
          <HoverableArabicText
            verse={verse}
            highlightWordIndex={wordIndexToHighlight}
            showWordByWord={quranSettings.settings.showWordByWord}
            queryHighlight={queryHighlight}
          />
        </div>
      </section>
    );
  }
}

const HoverableArabicText = ({
  verse,
  highlightWordIndex,
  showWordByWord,
  queryHighlight,
}: {
  verse: WQuranVerse;
  highlightWordIndex?: number | null;
  showWordByWord: boolean;
  queryHighlight?: string | null;
}) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (highlightWordIndex !== undefined) {
      // Trigger fade after short delay
      const timeout = setTimeout(() => setFade(true), 1500);
      return () => clearTimeout(timeout);
    }
  }, [highlightWordIndex]);

  if (!verse.word_by_word || verse.word_by_word.length === 0) {
    return <>{verse.verse_text_arabic}</>;
  }

  // Sort words by word_index to ensure correct order
  const sortedWords = [...verse.word_by_word].sort((a, b) => a.word_index - b.word_index);

  const normalize = (str: string): string =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[^\w\s]/g, "")
      .trim();

  const wordMatchesQuery = (word: WQuranWordByWord): boolean => {
    if (!queryHighlight || !word.english_text) return false;

    // Decode URL and replace + with spaces
    const decodedQuery = decodeURIComponent(queryHighlight).replace(/\+/g, " ");
    const queryWords = normalize(decodedQuery).split(/\s+/).filter(Boolean);
    const englishWords = normalize(word.english_text).split(/\s+/).filter(Boolean);

    return queryWords.some((qWord) => englishWords.some((eWord) => eWord.includes(qWord)));
  };

  return (
    <span className="select-text">
      {sortedWords.map((word) => {
        const isQueryMatch = wordMatchesQuery(word);
        const isWordIndexHighlight = highlightWordIndex === word.word_index;

        return (
          <span key={word.word_index}>
            <WordTooltip word={word} showWordByWord={showWordByWord}>
              <span
                className={`${
                  showWordByWord
                    ? "mx-2 mb-4 inline-flex flex-col items-center text-center"
                    : "inline"
                } ${
                  isWordIndexHighlight
                    ? "rounded-lg bg-yellow-300 p-1 transition-all dark:bg-yellow-800"
                    : ""
                }`}
                data-query-match={isQueryMatch ? "true" : "false"}
                data-word-highlight={isWordIndexHighlight ? "true" : "false"}
              >
                <span
                  className={`${showWordByWord ? "text-3xl leading-none" : ""} ${
                    isQueryMatch && !isWordIndexHighlight
                      ? "rounded bg-violet-300 px-1 dark:bg-violet-800"
                      : ""
                  }`}
                >
                  {word.arabic_text?.replace(/�/g, "")}
                </span>
                {showWordByWord && (
                  <>
                    <span
                      className="mt-1 mt-2 max-w-[80px] hyphens-auto break-words text-center text-xs font-normal italic leading-tight text-gray-500 dark:text-gray-500"
                      dir="ltr"
                    >
                      {word.transliterated_text}
                    </span>
                    <span
                      className="mt-0.5 mt-1 max-w-[80px] hyphens-auto break-words text-center text-xs font-medium leading-tight text-gray-600 dark:text-gray-400"
                      dir="ltr"
                    >
                      {word.english_text}
                    </span>
                  </>
                )}
              </span>
            </WordTooltip>
            {!showWordByWord && word.word_index < sortedWords.length - 1 && "\u00A0"}
          </span>
        );
      })}
    </span>
  );
};

export const WordTooltip = ({
  word,
  children,
  showWordByWord,
}: {
  word: WQuranWordByWord;
  children: React.ReactNode;
  showWordByWord: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<"left" | "center" | "right">("center");

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (timeoutId) clearTimeout(timeoutId);
    if (!modalOpen && !showWordByWord) {
      // Calculate tooltip position based on mouse position
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const tooltipWidth = 192; // w-48 = 192px
      const wordCenter = rect.left + rect.width / 2;

      // Check if tooltip would overflow on the right
      if (wordCenter + tooltipWidth / 2 > viewportWidth - 16) {
        setTooltipPosition("right");
      }
      // Check if tooltip would overflow on the left
      else if (wordCenter - tooltipWidth / 2 < 16) {
        setTooltipPosition("left");
      }
      // Safe to center
      else {
        setTooltipPosition("center");
      }

      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setIsVisible(false), 57);
    setTimeoutId(id);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (word.root_word && !modalOpen) {
      setIsVisible(false);
      setModalOpen(true);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      setIsVisible(false);
      if (timeoutId) clearTimeout(timeoutId);
    }
  };

  // Dynamic positioning classes
  const getTooltipClasses = () => {
    const baseClasses =
      "absolute bottom-full mb-3 w-48 bg-white/30 dark:bg-gray-900/40 border border-gray-200/20 dark:border-gray-700/30 text-gray-900 dark:text-gray-100 text-sm rounded-xl p-4 shadow-xl backdrop-blur-lg z-10 select-text animate-in fade-in-0 zoom-in-95 duration-200";

    switch (tooltipPosition) {
      case "left":
        return `${baseClasses} left-0`;
      case "right":
        return `${baseClasses} right-0`;
      case "center":
      default:
        return `${baseClasses} left-1/2 transform -translate-x-1/2`;
    }
  };

  // Dynamic arrow positioning
  const getArrowClasses = () => {
    const baseClasses =
      "absolute top-full w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-white/30 dark:border-t-gray-900/40";

    switch (tooltipPosition) {
      case "left":
        return `${baseClasses} left-6`;
      case "right":
        return `${baseClasses} right-6`;
      case "center":
      default:
        return `${baseClasses} left-1/2 transform -translate-x-1/2`;
    }
  };

  return (
    <div
      className="relative inline-block overflow-visible"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className={`${
          word.root_word ? "cursor-pointer" : ""
        } rounded p-1 transition-colors hover:text-violet-600 dark:hover:text-violet-400`}
        onClick={handleClick}
      >
        {children}
      </span>

      {/* Hover Tooltip - only show when not in word-by-word mode */}
      {isVisible && !modalOpen && !showWordByWord && (
        <div
          className={getTooltipClasses()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-3">
            {/* Transliteration */}
            {word.transliteration && (
              <div
                className="text-center text-xs font-medium tracking-wide text-gray-500 drop-shadow-sm dark:text-gray-400"
                dir="ltr"
              >
                {word.transliteration}
              </div>
            )}

            {/* Transliterated Text */}
            {word.transliterated_text && (
              <div
                className="text-center text-xs font-normal italic text-gray-600 drop-shadow-sm dark:text-gray-300"
                dir="ltr"
              >
                {word.transliterated_text}
              </div>
            )}

            {/* English Text - Main focus */}
            {word.english_text && (
              <div
                className="text-center text-sm font-semibold leading-tight text-violet-700 drop-shadow-md dark:text-violet-300"
                dir="ltr"
              >
                {word.english_text}
              </div>
            )}

            {/* Root Word */}
            {word.root_word && (
              <div className="">
                <div
                  className="text-center text-sm text-gray-700 drop-shadow-sm dark:text-gray-300"
                  dir="rtl"
                >
                  {word.root_word}
                </div>
              </div>
            )}
          </div>
          <div className={getArrowClasses()}></div>
        </div>
      )}

      {/* Clickable Dialog */}
      <Dialog open={modalOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md">
          <RootWordView root={word.root_word!} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
