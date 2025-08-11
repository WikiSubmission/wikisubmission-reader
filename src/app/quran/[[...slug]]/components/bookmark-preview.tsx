"use client";
import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  BookOpen,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { BookmarkInjectedType } from "@/types/bookmarks";
import { useQuranSettings } from "@/hooks/use-quran-settings";
import BookmarkStore from "@/hooks/use-bookmark";
import { cn } from "@/lib/utils";
import VerseCard from "./verse-card";

const useDebounce = (callback: Function, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
};

function EnhancedNotes({
  selectedVerse,
}: {
  selectedVerse: BookmarkInjectedType;
}) {
  const [localNotes, setLocalNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const updateBookmarkNotes = BookmarkStore(
    (state) => state.updateBookmarkNotes,
  );
  const getNotesForVerse = BookmarkStore((state) => state.getNotesForVerse);

  useEffect(() => {
    const currentNotes = getNotesForVerse(selectedVerse.verse_id);
    setLocalNotes(currentNotes);
    setLastSaved(currentNotes ? new Date() : null);
  }, [selectedVerse.verse_id, getNotesForVerse]);

  const debouncedUpdate = useDebounce((verseId: string, notes: string) => {
    updateBookmarkNotes(verseId, notes);
    setIsLoading(false);
    setLastSaved(new Date());
  }, 300);

  const handleNotesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setLocalNotes(value);
      setIsLoading(true);
      debouncedUpdate(selectedVerse.verse_id, value);
    },
    [selectedVerse.verse_id, debouncedUpdate],
  );

  const formatLastSaved = () => {
    if (!lastSaved) return "";
    const now = new Date();
    const diffMs = now.getTime() - lastSaved.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins === 0) return "just now";
    if (diffMins === 1) return "1 minute ago";
    if (diffMins < 60) return `${diffMins} minutes ago`;

    return lastSaved.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="notes"
          className="text-xs sm:text-sm font-medium text-foreground"
        >
          Personal Notes
        </label>
        <div className="flex items-center gap-2">
          {isLoading && (
            <div className="w-3 h-3 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          )}
          <span
            className={`text-xs transition-all duration-200 ${
              isLoading ? "text-amber-500" : "text-green-500 opacity-70"
            }`}
          >
            {isLoading
              ? "Saving..."
              : lastSaved
                ? `Saved ${formatLastSaved()}`
                : "No notes yet"}
          </span>
        </div>
      </div>

      <div className="relative">
        <textarea
          id="notes"
          placeholder={`Add your thoughts about ${selectedVerse.chapter_title_english} ${selectedVerse.chapter_number}:${selectedVerse.verse_number}...`}
          className="w-full h-16 sm:h-24 p-2 sm:p-3 text-xs sm:text-sm rounded-md border border-border bg-background/50 placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 focus:bg-background/80 text-foreground"
          value={localNotes}
          onChange={handleNotesChange}
          maxLength={2000}
        />

        {/* Character count overlay */}
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 dark:bg-black/20 px-2 py-1 rounded border border-border/50">
          {localNotes.length}/2000
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex gap-2">
          <button
            onClick={() => setLocalNotes("")}
            className="text-muted-foreground hover:text-red-500 dark:hover:text-red-400 transition-colors"
            disabled={!localNotes}
          >
            Clear
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(localNotes);
            }}
            className="text-muted-foreground hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            disabled={!localNotes}
          >
            Copy
          </button>
        </div>

        <span className="text-muted-foreground">
          {localNotes.split(/\s+/).filter((w) => w.length > 0).length} words
        </span>
      </div>
    </div>
  );
}

export function BookmarkPreview() {
  const [bookmarks, setBookmarks] = useState<BookmarkInjectedType[]>([]);
  const [currentView, setCurrentView] = useState<"list" | "detail">("list");

  const {
    setIsBookmarkPopupOpen,
    isBookmarkPopupOpen,
    getInjectedBookmarks,
    bookmarks: syncbookmarks,
  } = BookmarkStore();

  useEffect(() => {
    async function loadBookmarks() {
      const data = await getInjectedBookmarks();
      setBookmarks(data);
      if (data.length > 0) {
        setSelectedVerse(data[0]);
      }
    }
    loadBookmarks();
  }, [getInjectedBookmarks, syncbookmarks]);

  const cardRef = useRef<HTMLDivElement>(null);
  const [selectedVerse, setSelectedVerse] =
    useState<BookmarkInjectedType | null>(
      bookmarks.length > 0 ? bookmarks[0] : null,
    );
  const [notes, setNotes] = useState<Record<string, string>>({});

  // Sort bookmarks by datetime (most recent first)
  const sortedBookmarks = useMemo(() => {
    return [...bookmarks].sort(
      (a, b) =>
        new Date(b.bookmark_datetime_timezoneaware).getTime() -
        new Date(a.bookmark_datetime_timezoneaware).getTime(),
    );
  }, [bookmarks]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleNotesChange = (verseId: string, value: string) => {
    setNotes((prev) => ({ ...prev, [verseId]: value }));
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
      setIsBookmarkPopupOpen(false);
    }
  };

  const handleVerseSelect = (verse: BookmarkInjectedType) => {
    setSelectedVerse(verse);
    setCurrentView("detail");
  };

  const handleBackToList = () => {
    setCurrentView("list");
  };

  // Locking background scroll
  useEffect(() => {
    if (isBookmarkPopupOpen) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
  }, [isBookmarkPopupOpen]);

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center p-2 sm:p-4 bg-black/30 dark:bg-black/30 backdrop-blur-sm z-50",
        isBookmarkPopupOpen ? "" : "hidden",
      )}
      onClick={handleBackdropClick}
    >
      <Card
        className="w-full max-w-6xl h-[90vh] sm:h-[80vh] bg-background/95 dark:bg-white/5 backdrop-blur-3xl border border-border dark:border-white/20 shadow-2xl z-60"
        ref={cardRef}
      >
        <CardHeader className="border-b border-border dark:border-white/10 p-3 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile back button */}
            {currentView === "detail" && (
              <button
                onClick={handleBackToList}
                className="md:hidden p-1 hover:bg-muted rounded-md transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
            )}

            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <h2 className="text-lg sm:text-2xl font-semibold text-foreground">
              Bookmarked Verses
            </h2>
            <Badge variant="secondary" className="ml-auto text-xs sm:text-sm">
              {bookmarks.length} verses
            </Badge>
          </div>
        </CardHeader>

        {/* Mobile Layout */}
        <div className="md:hidden h-[calc(100%-80px)] overflow-hidden">
          {currentView === "list" ? (
            // Mobile List View
            <ScrollArea className="h-full">
              <div className="p-3 space-y-3">
                {sortedBookmarks.length > 0 ? (
                  sortedBookmarks.map((verse) => (
                    <Card
                      key={verse.verse_id}
                      className="cursor-pointer transition-all duration-200 hover:shadow-md bg-card dark:bg-white/5 hover:bg-muted dark:hover:bg-white/10"
                      onClick={() => handleVerseSelect(verse)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Chapter and Verse with arrow */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-sm">
                                {verse.chapter_number}:{verse.verse_number}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                {formatDate(
                                  verse.bookmark_datetime_timezoneaware,
                                )}
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </div>

                          {/* Chapter Title */}
                          <h4 className="text-base font-medium line-clamp-1 text-foreground">
                            {verse.chapter_title_english}
                          </h4>

                          {/* Verse Preview */}
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {verse.verse_text_english}
                          </p>

                          {/* Timestamp */}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {formatTime(verse.bookmark_datetime_timezoneaware)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center space-y-2 pt-20">
                      <BookOpen className="w-12 h-12 mx-auto opacity-50" />
                      <p>No bookmarks yet</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          ) : (
            // Mobile Detail View
            <div className="h-full flex flex-col">
              {selectedVerse && (
                <ScrollArea className="flex-1">
                  {/* Verse Display */}
                  <div className="p-4">
                    <VerseCard
                      key={selectedVerse.verse_id}
                      verse={selectedVerse}
                      type={"verse"}
                    />
                  </div>

                  {/* Notes Section */}
                  <div className="border-t border-border dark:border-white/10 p-4">
                    <EnhancedNotes selectedVerse={selectedVerse} />
                  </div>
                </ScrollArea>
              )}
            </div>
          )}
        </div>

        {/* Desktop Layout (unchanged) */}
        <div className="hidden md:grid grid-cols-12 h-[calc(100%-100px)] overflow-hidden">
          {/* Left Column - Verse List */}
          <div className="col-span-4 border-r border-border dark:border-white/10">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-2">
                {sortedBookmarks.length > 0 ? (
                  sortedBookmarks.map((verse) => (
                    <Card
                      key={verse.verse_id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedVerse?.verse_id === verse.verse_id
                          ? "bg-primary/10 border-primary/30"
                          : "bg-card dark:bg-white/5 hover:bg-muted dark:hover:bg-white/10"
                      }`}
                      onClick={() => setSelectedVerse(verse)}
                    >
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          {/* Chapter and Verse */}
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {verse.chapter_number}:{verse.verse_number}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {formatDate(
                                verse.bookmark_datetime_timezoneaware,
                              )}
                            </div>
                          </div>

                          {/* Chapter Title */}
                          <h4 className="text-sm font-medium line-clamp-1 text-foreground">
                            {verse.chapter_title_english}
                          </h4>

                          {/* Verse Preview */}
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {verse.verse_text_english}
                          </p>

                          {/* Timestamp */}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {formatTime(verse.bookmark_datetime_timezoneaware)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center space-y-2">
                      <BookOpen className="w-12 h-12 mx-auto opacity-50" />
                      <p>No bookmarks yet</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Right Column */}
          <div className="col-span-8 flex flex-col">
            {selectedVerse ? (
              <ScrollArea className="h-[72vh]">
                {/* Top Section - Verse Display */}
                <div className="flex-1 overflow-hidden">
                  <div className="h-full p-4">
                    <VerseCard
                      key={selectedVerse.verse_id}
                      verse={selectedVerse}
                      type={"verse"}
                    />
                  </div>
                </div>

                {/* Bottom Section - Notes */}
                <div className="border-t border-border dark:border-white/10 p-4">
                  <EnhancedNotes selectedVerse={selectedVerse} />
                </div>
              </ScrollArea>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center space-y-2">
                  <BookOpen className="w-12 h-12 mx-auto opacity-50" />
                  <p>Select a bookmarked verse to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
