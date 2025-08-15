"use client";
import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, BookOpen, ChevronRight, ArrowLeft, X } from "lucide-react";
import { BookmarkInjectedType } from "@/types/bookmarks";
import { useQuranSettings } from "@/hooks/use-quran-settings";
import BookmarkStore from "@/hooks/use-bookmark";
import { cn } from "@/lib/utils";
import VerseCard from "./verse-card";
import { Button } from "@/components/ui/button";

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
    [callback, delay]
  );
};

function EnhancedNotes({ selectedVerse }: { selectedVerse: BookmarkInjectedType }) {
  const [hydrated, setHydrated] = useState(false);
  const [localNotes, setLocalNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const unsub = BookmarkStore.persist.onFinishHydration(() => setHydrated(true));
    // Also check immediately in case it's already hydrated
    if (BookmarkStore.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);

  const updateBookmarkNotes = BookmarkStore((state) => state.updateBookmarkNotes);
  const getNotesForVerse = BookmarkStore((state) => state.getNotesForVerse);

  useEffect(() => {
    if (!hydrated) return;
    const currentNotes = getNotesForVerse(selectedVerse.verse_id);
    setLocalNotes(currentNotes);
    setLastSaved(currentNotes ? new Date() : null);
  }, [hydrated, selectedVerse.verse_id, getNotesForVerse]);

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
    [selectedVerse.verse_id, debouncedUpdate]
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

  if (!hydrated) {
    return <div className="text-sm text-muted-foreground">Loading notes…</div>;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor="notes" className="text-sm font-medium text-foreground">
          Personal Notes
        </label>
        <div className="flex items-center gap-2">
          {isLoading && (
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-amber-500 border-t-transparent"></div>
          )}
          <span
            className={`text-xs transition-all duration-200 ${
              isLoading ? "text-amber-500" : "text-green-500 opacity-70"
            }`}
          >
            {isLoading ? "Saving..." : lastSaved ? `Saved ${formatLastSaved()}` : "No notes yet"}
          </span>
        </div>
      </div>

      <div className="relative">
        <textarea
          id="notes"
          placeholder={`Add your thoughts about ${selectedVerse.chapter_title_english} ${selectedVerse.chapter_number}:${selectedVerse.verse_number}...`}
          className="min-h-[100px] w-full resize-y rounded-md border border-border bg-background/50 p-3 text-sm text-foreground transition-all duration-200 placeholder:text-muted-foreground focus:bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:min-h-[120px]"
          value={localNotes}
          onChange={handleNotesChange}
          maxLength={2000}
        />

        {/* Character count overlay */}
        <div className="absolute bottom-2 right-2 rounded border border-border/50 bg-background/80 px-2 py-1 text-xs text-muted-foreground dark:bg-black/20">
          {localNotes.length}/2000
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex gap-2">
          <button
            onClick={() => setLocalNotes("")}
            className="text-muted-foreground transition-colors hover:text-red-500 disabled:opacity-50 dark:hover:text-red-400"
            disabled={!localNotes}
          >
            Clear
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(localNotes);
            }}
            className="text-muted-foreground transition-colors hover:text-blue-500 disabled:opacity-50 dark:hover:text-blue-400"
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
  const [hydrated, setHydrated] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkInjectedType[]>([]);
  const [currentView, setCurrentView] = useState<"list" | "detail">("list");
  const [selectedVerse, setSelectedVerse] = useState<BookmarkInjectedType | null>(null);

  const {
    setIsBookmarkPopupOpen,
    isBookmarkPopupOpen,
    getInjectedBookmarks,
    bookmarks: syncbookmarks,
  } = BookmarkStore();

  useEffect(() => {
    const unsub = BookmarkStore.persist.onFinishHydration(() => setHydrated(true));
    if (BookmarkStore.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    async function loadBookmarks() {
      const data = await getInjectedBookmarks();
      setBookmarks(data);
      if (data.length > 0 && !selectedVerse) {
        setSelectedVerse(data[0]);
      }
    }
    loadBookmarks();
  }, [hydrated, getInjectedBookmarks, syncbookmarks, selectedVerse]);

  const cardRef = useRef<HTMLDivElement>(null);

  // Sort bookmarks by datetime (most recent first)
  const sortedBookmarks = useMemo(() => {
    return [...bookmarks].sort(
      (a, b) =>
        new Date(b.bookmark_datetime_timezoneaware).getTime() -
        new Date(a.bookmark_datetime_timezoneaware).getTime()
    );
  }, [bookmarks]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
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

  const handleClose = () => {
    setIsBookmarkPopupOpen(false);
  };

  // Locking background scroll
  useEffect(() => {
    if (isBookmarkPopupOpen) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }

    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [isBookmarkPopupOpen]);

  if (!hydrated) {
    return <div className="text-sm text-muted-foreground">Loading bookmarks…</div>;
  }

  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex h-full items-center justify-center text-muted-foreground">
      <div className="space-y-3 text-center">
        <BookOpen className="mx-auto h-12 w-12 opacity-50" />
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-2 backdrop-blur-sm transition-opacity duration-200 dark:bg-black/40 sm:p-4",
        isBookmarkPopupOpen ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      onClick={handleBackdropClick}
    >
      <Card
        className={cn(
          "z-60 h-[95vh] w-full max-w-7xl transform border border-border bg-background/95 shadow-2xl backdrop-blur-3xl transition-all duration-300 dark:border-white/20 dark:bg-white/5 sm:h-[85vh]",
          isBookmarkPopupOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
        ref={cardRef}
      >
        {/* Header - Fixed height */}
        <CardHeader className="h-16 flex-shrink-0 border-b border-border p-3 dark:border-white/10 sm:h-20 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Navigation Controls */}
            {currentView === "detail" ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToList}
                className="h-8 w-8 p-0 lg:hidden"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={handleClose} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            )}

            <BookOpen className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
            <h2 className="text-sm font-semibold text-foreground sm:text-xl">Bookmarked Verses</h2>
            <Badge variant="secondary" className="ml-auto text-xs sm:text-sm">
              {bookmarks.length} verses
            </Badge>
          </div>
        </CardHeader>

        {/* Content Area - Exact remaining height calculation */}
        <div className="h-[calc(95vh-4rem)] sm:h-[calc(85vh-5rem)]">
          {/* Mobile Layout */}
          <div className="h-full lg:hidden">
            {currentView === "list" ? (
              // Mobile List View - Full height scroll
              <ScrollArea className="h-full" type="always">
                <div className="space-y-2 p-3">
                  {sortedBookmarks.length > 0 ? (
                    sortedBookmarks.map((verse) => (
                      <Card
                        key={verse.verse_id}
                        className="cursor-pointer bg-card transition-all duration-200 hover:bg-muted hover:shadow-md active:scale-[0.98] dark:bg-white/5 dark:hover:bg-white/10"
                        onClick={() => handleVerseSelect(verse)}
                      >
                        <CardContent className="p-3 sm:p-4">
                          <div className="space-y-2">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {verse.chapter_number}:{verse.verse_number}
                              </Badge>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>

                            {/* Chapter Title */}
                            <h4 className="line-clamp-1 text-sm font-medium text-foreground sm:text-base">
                              {verse.chapter_title_english}
                            </h4>

                            {/* Verse Preview */}
                            <p className="line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                              {verse.verse_text_english}
                            </p>

                            {/*Date and Time */}
                            <div className="flex items-center justify-between">
                              {/* Timestamp */}
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {formatTime(verse.bookmark_datetime_timezoneaware)}
                              </div>

                              {/* Date */}
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {formatDate(verse.bookmark_datetime_timezoneaware)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="flex h-64 items-center justify-center">
                      <EmptyState message="No bookmarks yet" />
                    </div>
                  )}
                </div>
              </ScrollArea>
            ) : (
              // Mobile Detail View - Split with exact heights
              <div className="flex h-full flex-col">
                {selectedVerse && (
                  <>
                    {/* Verse Content - 65% of height */}
                    <div className="h-[65%] overflow-hidden">
                      <ScrollArea className="h-full" type="always">
                        <div className="p-3 sm:p-4">
                          <VerseCard
                            key={selectedVerse.verse_id}
                            verse={selectedVerse}
                            type="verse"
                          />
                        </div>
                      </ScrollArea>
                    </div>

                    {/* Notes Section - 35% of height */}
                    <div className="h-[35%] border-t border-border dark:border-white/10">
                      <div className="h-full overflow-auto p-3 sm:p-4">
                        <EnhancedNotes selectedVerse={selectedVerse} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Desktop Layout - Split with exact heights */}
          <div className="hidden h-full lg:flex">
            {/* Left Column - Bookmarks List (Fixed 384px width) */}
            <div className="w-96 border-r border-border dark:border-white/10">
              <ScrollArea className="h-full" type="always">
                <div className="space-y-2 p-4">
                  {sortedBookmarks.length > 0 ? (
                    sortedBookmarks.map((verse) => (
                      <Card
                        key={verse.verse_id}
                        className={cn(
                          "cursor-pointer transition-all duration-200 hover:shadow-md",
                          selectedVerse?.verse_id === verse.verse_id
                            ? "border-primary/50 bg-primary/10 shadow-sm"
                            : "bg-card hover:bg-muted dark:bg-white/5 dark:hover:bg-white/10"
                        )}
                        onClick={() => handleVerseSelect(verse)}
                      >
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {verse.chapter_number}:{verse.verse_number}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {formatDate(verse.bookmark_datetime_timezoneaware)}
                              </div>
                            </div>

                            {/* Chapter Title */}
                            <h4 className="line-clamp-1 text-sm font-medium text-foreground">
                              {verse.chapter_title_english}
                            </h4>

                            {/* Verse Preview */}
                            <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                              {verse.verse_text_english}
                            </p>

                            {/* Timestamp */}
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatTime(verse.bookmark_datetime_timezoneaware)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="flex h-64 items-center justify-center">
                      <EmptyState message="No bookmarks yet" />
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Right Column - Verse Detail */}
            <div className="flex h-full flex-1 flex-col">
              {selectedVerse ? (
                <>
                  {/* Verse Content - 60% of height */}
                  <div className="h-[60%] overflow-hidden">
                    <ScrollArea className="h-full" type="always">
                      <div className="p-6">
                        <VerseCard
                          key={selectedVerse.verse_id}
                          verse={selectedVerse}
                          type="verse"
                        />
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Notes Section - 40% of height */}
                  <div className="h-[40%] border-t border-border dark:border-white/10">
                    <div className="h-full overflow-auto p-6">
                      <EnhancedNotes selectedVerse={selectedVerse} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <EmptyState message="Select a bookmarked verse to view details" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
