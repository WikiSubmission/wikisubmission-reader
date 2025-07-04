"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ChevronUpIcon } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useQuranAudio } from "@/hooks/use-quran-audio";

interface ScrollToTopProps {
  className?: string;
  showAfter?: number; // pixels scrolled before showing button
}

export function ScrollToTop({ className, showAfter = 300 }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const audio = useQuranAudio();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > showAfter);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Hide button when audio is active (playing or in queue mode)
  const shouldHide =
    audio.isPlaying || audio.isQueueMode || audio.verseQueue.length > 0;

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "fixed bottom-6 right-6 z-50 shadow-lg transition-all duration-300 ease-in-out rounded-full border-2 border-violet-700 dark:border-violet-400 rounded-full",
        isVisible && !shouldHide
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none",
        className,
      )}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUpIcon className="h-4 w-4" />
    </Button>
  );
}
