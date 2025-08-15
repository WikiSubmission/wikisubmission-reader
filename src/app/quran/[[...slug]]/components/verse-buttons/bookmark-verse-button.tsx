"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { WQuranVerse } from "@/types/w-quran";
import BookmarkStore from "@/hooks/use-bookmark";

interface BookmarkVerseButtonProps {
  verse: WQuranVerse;
}

export default function BookmarkVerseButton({ verse }: BookmarkVerseButtonProps) {
  const [hydrated, setHydrated] = useState(false);

  // Local bookmark check to avoid reading store too early
  const bookmarks = BookmarkStore((state) => state.bookmarks);
  const addBookmark = BookmarkStore((state) => state.addBookmark);
  const removeBookmark = BookmarkStore((state) => state.removeBookmark);

  useEffect(() => {
    const unsub = BookmarkStore.persist.onFinishHydration(() => setHydrated(true));
    if (BookmarkStore.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);

  const bookmarked =
    hydrated &&
    bookmarks.some(
      (b) => b.chapter_number === verse.chapter_number && b.verse_number === verse.verse_number
    );

  const bookmarkVerse = () => {
    if (bookmarked) {
      removeBookmark(verse);
    } else {
      addBookmark(verse);
    }
  };

  // Optional: disable button until hydrated to avoid flicker
  return (
    <Button
      variant="secondary"
      size="sm"
      className="h-6 justify-start gap-1 rounded-md px-2 text-xs text-muted-foreground transition hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800"
      onClick={bookmarkVerse}
      disabled={!hydrated}
    >
      <ButterStarIcon selected={bookmarked} />
      {bookmarked ? " Bookmarked!" : ""}
    </Button>
  );
}
export function ButterStarIcon({ selected }: { selected: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`h-3 w-3 text-yellow-400${selected ? "fill-yellow-400" : "transparent"}`}
    >
      <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.78 1.4 8.172L12 18.896l-7.334 3.852 1.4-8.172-5.934-5.78 8.2-1.193z" />
    </svg>
  );
}
