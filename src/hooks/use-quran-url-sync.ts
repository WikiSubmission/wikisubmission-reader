"use client";

import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useQuranAudio } from "./use-quran-audio";
import { WQuranVerse } from "@/types/w-quran";

export function useQuranUrlSync() {
  const pathname = usePathname();
  const audio = useQuranAudio();

  const handleVerseChange = useCallback(
    (verse: WQuranVerse) => {
      // Get fresh search params at the time of the call
      const currentParams = new URLSearchParams(window.location.search);

      // Update the verse parameter
      currentParams.set("verse", `${verse.verse_number}`);

      // Update the URL using History API instead of Next.js router to avoid page refresh
      const newUrl = `${pathname}?${currentParams.toString()}`;
      window.history.replaceState(null, "", newUrl);
    },
    [pathname],
  );

  useEffect(() => {
    // Set the callback in the audio store
    audio.setOnVerseChange(handleVerseChange);

    // Cleanup: remove the callback when component unmounts
    return () => {
      audio.setOnVerseChange(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleVerseChange]); // Only depend on the stable callback
}
