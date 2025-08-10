"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WQuranVerse } from "@/types/w-quran";
import BookmarkStore from "@/hooks/use-bookmark";

interface BookmarkVerseButtonProps {
  verse: WQuranVerse;
}

export default function BookmarkVerseButton({
  verse,
}: BookmarkVerseButtonProps) {
  const { addBookmark, removeBookmark, isVerseBookmarked } = BookmarkStore();
  const [bookmarked, setBookmarked] = useState(isVerseBookmarked(verse));

  const bookmarkVerse = async () => {
    setBookmarked(!bookmarked);
    if (bookmarked) {
      removeBookmark(verse);
    } else {
      addBookmark(verse);
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      className="justify-start gap-1 text-xs h-6 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition text-muted-foreground hover:text-foreground"
      onClick={bookmarkVerse}
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
      className={`w-3 h-3 text-yellow-400${selected ? " fill-yellow-400" : "transparent"}`}
    >
      <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.78 1.4 8.172L12 18.896l-7.334 3.852 1.4-8.172-5.934-5.78 8.2-1.193z" />
    </svg>
  );
}
