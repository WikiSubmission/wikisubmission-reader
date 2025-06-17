"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { WQuranVerse, WQuranWordByWord } from "@/types/w-quran";
import { RootWordView } from "../root-word-modal";
import { useState, useEffect } from "react";
import { useQuranSettings } from "@/hooks/use-quran-settings";
import { useSearchParams } from "next/navigation";

export default function VerseTextArabic({ verse }: { verse: WQuranVerse }) {
  const quranSettings = useQuranSettings();
  const searchParams = useSearchParams();
  const wordSearchParam = searchParams.get("word");
  const wordIndexToHighlight = wordSearchParam
    ? parseInt(wordSearchParam, 10)
    : null;

  if (quranSettings.settings.showArabic) {
    return (
      <section>
        <div
          className="text-2xl leading-relaxed font-arabic text-gray-900 dark:text-gray-100 text-right"
          dir="rtl"
        >
          <HoverableArabicText
            verse={verse}
            highlightWordIndex={wordIndexToHighlight}
          />
        </div>
      </section>
    );
  }
}

const HoverableArabicText = ({
  verse,
  highlightWordIndex,
}: {
  verse: WQuranVerse;
  highlightWordIndex?: number | null;
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

  return (
    <span className="select-text">
      {verse.word_by_word.map((word, index) => (
        <span key={index}>
          <WordTooltip word={word}>
            <span
              className={
                highlightWordIndex === index
                  ? "bg-yellow-300 dark:bg-yellow-800 rounded-lg p-1 transition-all"
                  : ""
              }
            >
              {word.arabic_text}
            </span>
          </WordTooltip>
          {index < (verse.word_by_word?.length ?? 0) - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
};

export const WordTooltip = ({
  word,
  children,
}: {
  word: WQuranWordByWord;
  children: React.ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (!modalOpen) setIsVisible(true);
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

  return (
    <div
      className="relative inline-block overflow-visible"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className="cursor-pointer hover:bg-violet-100 dark:hover:bg-violet-900 p-1 rounded transition-colors"
        onClick={handleClick}
      >
        {children}
      </span>

      {/* Hover Tooltip */}
      {isVisible && !modalOpen && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white dark:bg-violet-100 text-white dark:text-violet-900 text-xs rounded p-1 shadow-lg z-10 select-text"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-1 p-1">
            <div
              className="text-gray-600 dark:text-gray-600 text-center text-xs"
              dir="ltr"
            >
              {word.transliteration}
            </div>
            <div
              className="text-gray-600 dark:text-gray-600 text-center text-xs"
              dir="ltr"
            >
              {word.transliterated_text}
            </div>
            <div
              className="font-semibold text-lg text-center text-primary dark:text-secondary"
              dir="ltr"
            >
              {word.english_text}
            </div>
            {word.root_word && (
              <div
                className="text-gray-400 dark:text-gray-500 text-xs text-center font-arabic"
                dir="rtl"
              >
                {word.root_word}
              </div>
            )}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
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
