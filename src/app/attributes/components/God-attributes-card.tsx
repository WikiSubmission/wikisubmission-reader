import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, isObject, motion } from "framer-motion";
import { Volume2, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DEFAULT_LANGUAGES, GodAttributesCardDataType, Languages } from "../types";
import { MouseEvent } from "react";
import { NameStore } from "@/hooks/use-name";

const getFontSizeClass = (text: string | undefined, isExpanded: boolean) => {
  if (!text) return "";

  const len = text.length;

  if (isExpanded) {
    if (len <= 6) return "text-6xl lg:text-7xl";
    if (len <= 10) return "text-5xl lg:text-6xl";
    if (len <= 14) return "text-4xl lg:text-5xl";
    return "text-3xl lg:text-4xl";
  } else {
    if (len <= 6) return "text-3xl lg:text-5xl";
    if (len <= 10) return "text-2xl lg:text-4xl";
    if (len <= 14) return "text-xl lg:text-3xl";
    return "text-lg lg:text-2xl";
  }
};

interface Props {
  name: GodAttributesCardDataType;
  isExpanded?: boolean;
  onCardClick?: (index: number) => void;
  index?: number;
  className?: string;
}

export function NamesOfGodCard({ name, isExpanded, onCardClick, index, className }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOccurrences, setShowOccurrences] = useState(false);
  const [showGematria, setShowGematria] = useState(false);
  const [defaultLang] = useState("ENGLISH");
  const { currentLanguage, setCurrentLanguage, handleCyclingLanguages, currentView } = NameStore();

  const word = name.text.find((text) => text.language === currentLanguage);
  const defaultWord = name.text.find((text) => text.language === defaultLang);

  const playSound = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const toggleOccurrences = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowOccurrences(!showOccurrences);
  };

  const toggleGematria = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowGematria(!showGematria);
  };

  const handleCyclingLanguage = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleCyclingLanguages();
  };

  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    if (currentView === "carousel") {
      handleCyclingLanguage(e);
    } else if (currentView === "grid") {
      if (onCardClick && index) onCardClick(index);
    }
  };

  return (
    <motion.div
      layout
      className={cn(
        "group relative",
        "cursor-pointer",
        isExpanded ? "z-20 col-span-2 row-span-2" : "col-span-1 row-span-1",
        "select-none",
        className
      )}
      animate={{
        scale: isExpanded ? 1 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card className="relative h-full w-full overflow-hidden rounded-2xl border border-white/30 bg-gradient-to-br from-white/20 via-white/10 to-white/5 text-center shadow-2xl backdrop-blur-xl transition-all duration-300 hover:ring-2 hover:ring-violet-700/40 hover:ring-offset-2 dark:border-white/20 dark:from-white/15 dark:shadow-black/40 dark:hover:ring-violet-300 sm:rounded-3xl">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-gray-400/20 via-gray-500/20 to-gray-600/20 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100 dark:from-gray-300/20 dark:via-gray-200/20 dark:to-gray-100/20 sm:rounded-3xl" />

        {/* Overlay for Occurrences */}
        <AnimatePresence>
          {showOccurrences && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-white/20 p-2 text-xs text-slate-800 backdrop-blur-xl dark:bg-black/30 dark:text-white sm:rounded-3xl sm:p-4 sm:text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-2 top-2 rounded-full bg-violet-500/80 p-1 text-white hover:bg-violet-600 sm:right-3 sm:top-3"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowOccurrences(false);
                }}
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
              <h3 className="mb-1 text-xs font-semibold text-violet-700 dark:text-violet-300 sm:mb-2 sm:text-sm">
                Occurrences
              </h3>
              <ul className="max-h-24 w-full overflow-y-auto px-2 text-[10px] sm:max-h-40 sm:text-xs">
                {name.occurences.map((occ, i) => (
                  <li
                    key={i}
                    className="mb-1 rounded-md bg-white/30 px-1 py-0.5 text-slate-700 backdrop-blur-sm dark:bg-white/10 dark:text-slate-200 sm:px-2 sm:py-1"
                  >
                    Ch {occ.chapter_index}, V {occ.verse_index}, W {occ.word_index}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay for Gematria */}
        <AnimatePresence>
          {showGematria && name.gematria_breakdown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-white/20 p-2 text-xs text-slate-800 backdrop-blur-xl dark:bg-black/30 dark:text-white sm:rounded-3xl sm:p-4 sm:text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-2 top-2 rounded-full bg-violet-500/80 p-1 text-white hover:bg-violet-600 sm:right-3 sm:top-3"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowGematria(false);
                }}
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
              <h3 className="mb-1 text-xs font-semibold text-violet-700 dark:text-violet-300 sm:mb-2 sm:text-sm">
                Gematria
              </h3>
              <ul className="grid grid-cols-2 gap-1 text-[10px] sm:gap-2 sm:text-xs">
                {name.gematria_breakdown.map((g, i) => (
                  <li
                    key={i}
                    className="rounded-md bg-white/30 px-1 py-0.5 text-slate-700 backdrop-blur-sm dark:bg-white/10 dark:text-slate-200 sm:px-2 sm:py-1"
                  >
                    <span className="font-bold">{g.letter}</span> → {g.value}
                  </li>
                ))}
              </ul>
              <div className="mt-2 text-xs font-semibold text-violet-600 dark:text-violet-300 sm:mt-3 sm:text-sm">
                Total = {name.gematria}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="relative z-10 flex h-full flex-col">
          {/* Header */}
          <CardHeader className="p-2 sm:p-3 md:p-4">
            <CardTitle className="flex flex-row items-center justify-between">
              <Badge
                variant="outline"
                className="cursor-pointer border-slate-300 bg-slate-100 text-[10px] text-slate-700 hover:bg-slate-200 dark:border-white/20 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/20 sm:text-xs"
                onClick={toggleOccurrences}
              >
                {name.occurences[0]?.chapter_index}:{name.occurences[0]?.verse_index}
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer border-slate-300 bg-slate-100 text-[10px] text-slate-700 hover:bg-slate-200 dark:border-white/20 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/20 sm:text-xs"
                onClick={toggleGematria}
              >
                G: {name.gematria}
              </Badge>
            </CardTitle>
          </CardHeader>

          {/* Arabic & English */}
          <CardContent
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 px-2 py-2 sm:gap-2 sm:px-4 sm:py-3 md:gap-3 md:px-6 md:py-4"
            )}
            onClick={handleCardClick}
          >
            <motion.div
              className={cn(
                "font-[Scheherazade] font-bold text-slate-800 drop-shadow-lg dark:text-white",
                getFontSizeClass(word?.text, isExpanded ?? false)
                // isExpanded
                //   ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                //   : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              )}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {word ? word.text : "Undefined"}
            </motion.div>
            <motion.div
              className={cn(
                "italic text-slate-600 dark:text-slate-300",
                isExpanded ? "text-sm sm:text-base md:text-lg" : "text-[10px] sm:text-xs md:text-sm"
              )}
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {defaultWord?.text}
            </motion.div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex w-full items-center justify-between p-2 sm:p-3 md:p-4">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 sm:text-xs">
              #{name.order_in_revelation}
            </div>

            {/* Sound button */}
            <motion.button
              onClick={playSound}
              className={cn(
                "group/sound relative rounded-full transition-all duration-300",
                isExpanded ? "p-2 sm:p-2.5" : "p-1 sm:p-1.5",
                isPlaying
                  ? "bg-violet-200 text-violet-700 dark:bg-violet-400/30 dark:text-violet-400"
                  : "border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-white/10 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/20"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={isPlaying}
            >
              <motion.div
                animate={isPlaying ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.6, repeat: isPlaying ? Infinity : 0 }}
              >
                <Volume2
                  className={cn(
                    "transition-colors duration-200",
                    isExpanded ? "h-4 w-4 sm:h-5 sm:w-5" : "h-3 w-3 sm:h-4 sm:w-4",
                    isPlaying
                      ? "text-violet-700 dark:text-violet-400"
                      : "group-hover/sound:text-slate-800 dark:group-hover/sound:text-white"
                  )}
                />
              </motion.div>

              {/* Sound wave animation */}
              {isPlaying && (
                <div className="absolute -inset-2 rounded-full border border-violet-400/30 dark:border-violet-300/30">
                  <motion.div
                    className="absolute inset-0 rounded-full border border-violet-400/20 dark:border-violet-300/20"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-violet-400/20 dark:border-violet-300/20"
                    animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                  />
                </div>
              )}
            </motion.button>
          </CardFooter>
        </div>

        {/* Bottom gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10" />
      </Card>
    </motion.div>
  );
}
