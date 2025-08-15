import { BookmarkInjectedType, BookmarkType, WBookmarkQuranAPIResponse } from "@/types/bookmarks";
import { WQuranAPIResponse, WQuranVerse } from "@/types/w-quran";
import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";

const createMemoryStorage = (): StateStorage => {
  let store: Record<string, string> = {};
  return {
    getItem: (name: string) => (name in store ? store[name] : null),
    setItem: (name: string, value: string) => {
      store[name] = value;
    },
    removeItem: (name: string) => {
      delete store[name];
    },
  };
};

const getSafeStorage = (): StateStorage => {
  if (typeof window === "undefined") return createMemoryStorage();
  try {
    const test = "__zustand_test__";
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    // Wrap localStorage to satisfy StateStorage shape explicitly
    return {
      getItem: (name) => window.localStorage.getItem(name),
      setItem: (name, value) => window.localStorage.setItem(name, value),
      removeItem: (name) => window.localStorage.removeItem(name),
    };
  } catch {
    // iOS Safari private mode or blocked storage
    return createMemoryStorage();
  }
};

const BOOKMARK_HISTORY_SIZE = 100;

interface BookmarkState {
  bookmarks: BookmarkType[];
  addBookmark: (bookmark: WQuranVerse) => void;
  removeBookmark: (
    bookmark: Omit<BookmarkType, "bookmark_datetime_timezoneaware"> | WQuranVerse
  ) => void;
  currentBookmark: BookmarkType | null;
  setCurrentBookmark: (bookmark: BookmarkType | null) => void;
  isBookmarkPopupOpen: boolean;
  setIsBookmarkPopupOpen: (isOpen: boolean) => void;
  toggleBookmarkPopup: () => void;
  isVerseBookmarked: (verse: WQuranVerse) => boolean;
  fetchVerseContent: (
    bookmarks: BookmarkType[]
  ) => Promise<WBookmarkQuranAPIResponse["response"]["data"] | null>;
  getInjectedBookmarks: () => Promise<BookmarkInjectedType[]>;

  updateBookmarkNotes: (verseId: string, notes: string) => void;
  getNotesForVerse: (verseId: string) => string;
  _hasHydrated: boolean;
}

const initialState: Omit<
  BookmarkState,
  | "addBookmark"
  | "removeBookmark"
  | "setCurrentBookmark"
  | "setIsBookmarkPopupOpen"
  | "fetchVerseContent"
  | "isVerseBookmarked"
  | "getInjectedBookmarks"
  | "updateBookmarkNotes"
  | "getNotesForVerse"
  | "toggleBookmarkPopup"
> = {
  bookmarks: [],
  currentBookmark: null,
  isBookmarkPopupOpen: false,
  _hasHydrated: false,
};

const BookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      ...initialState,
      toggleBookmarkPopup: () => {
        set((state) => ({
          ...state,
          isBookmarkPopupOpen: !state.isBookmarkPopupOpen,
        }));
      },
      updateBookmarkNotes: (verseId: string, notes: string) => {
        set((state) => ({
          bookmarks: state.bookmarks.map((bookmark) => {
            // Match by verse_id string format (chapter_number:verse_number)
            const bookmarkVerseId = `${bookmark.chapter_number}_${bookmark.verse_number}`;
            return bookmarkVerseId === verseId ? { ...bookmark, notes } : bookmark;
          }),
        }));
      },

      getNotesForVerse: (verseId: string) => {
        const bookmarks = get().bookmarks;
        const bookmark = bookmarks.find((bookmark) => {
          const bookmarkVerseId = `${bookmark.chapter_number}_${bookmark.verse_number}`;
          return bookmarkVerseId === verseId;
        });
        return bookmark?.notes || "";
      },

      isVerseBookmarked: (verse) => {
        const { bookmarks } = get();

        return bookmarks.some((bookmark) => {
          return (
            bookmark.chapter_number === verse.chapter_number &&
            bookmark.verse_number === verse.verse_number
          );
        });
      },

      getInjectedBookmarks: async () => {
        const bookmarks = get().bookmarks;

        const res = await get().fetchVerseContent(bookmarks);
        if (!res) return [];
        return res;
      },

      fetchVerseContent: async (bookmarks: BookmarkType[]) => {
        const verseIDs = bookmarks.map(
          (bookmark) => `${bookmark.chapter_number}:${bookmark.verse_number}`
        );
        const detectedQuery = verseIDs.map((segment) => decodeURIComponent(segment)).join(","); //|| resolvedSearchParams.q?.toString();
        if (!detectedQuery) return null;
        const baseUrl = new URL(
          process.env.TEST_MODE === "true"
            ? `http://localhost:8080/${detectedQuery}`
            : `https://quran.wikisubmission.org/${detectedQuery}`
        );
        baseUrl.searchParams.append("include_word_by_word", "true");
        baseUrl.searchParams.append("search_apply_highlight", "true");
        let result: WQuranAPIResponse;

        try {
          const request = await fetch(baseUrl.toString(), {
            cache: "no-store",
          });
          if (!request.ok) throw new Error(`Error: ${request.status} ${request.statusText}`);
          // [Assign result]
          result = await request.json();
        } catch (err) {
          // [Internal Server Error]
          console.error(err);
          return null;
        }
        return result.response.data.map((v) => {
          const correspondingBookmarkType = bookmarks.find(
            (b) => b.chapter_number === v.chapter_number && b.verse_number === v.verse_number
          )!;
          return {
            ...v,
            notes: correspondingBookmarkType.notes,
            bookmark_datetime_timezoneaware:
              correspondingBookmarkType.bookmark_datetime_timezoneaware,
          };
        });
      },
      addBookmark: (bookmark) => {
        const bookmarkSize = get().bookmarks.length;
        // get().removeBookmark(bookmark);
        const datetime = new Date().toISOString();
        const newBookmark = {
          chapter_number: bookmark.chapter_number,
          verse_number: bookmark.verse_number,
          bookmark_datetime_timezoneaware: datetime,
          notes: "",
        };
        if (bookmarkSize >= BOOKMARK_HISTORY_SIZE) {
          set((state) => ({
            bookmarks: [newBookmark, ...state.bookmarks.slice(0, -1)],
          }));
        } else {
          set((state) => ({
            bookmarks: [newBookmark, ...state.bookmarks],
          }));
        }
      },
      removeBookmark: (bookmark) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter(
            (mark) =>
              !(
                bookmark.chapter_number === mark.chapter_number &&
                bookmark.verse_number === mark.verse_number
              )
          ),
        })),
      setCurrentBookmark: (bookmark: BookmarkType | null) =>
        set((state) => ({
          currentBookmark: bookmark,
        })),
      setIsBookmarkPopupOpen: (isOpen: boolean) =>
        set((state) => ({
          isBookmarkPopupOpen: isOpen,
        })),
    }),
    {
      name: "bookmark-storage",
      storage: createJSONStorage(getSafeStorage),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error("Zustand persist rehydrate error:", error);
            return;
          }
          if (state) state._hasHydrated = true;
        };
      },
    }
  )
);

export default BookmarkStore;
export const useBookmarkHydration = () => BookmarkStore((state) => state._hasHydrated);
export const bookmarkPopupUtils = () => {
  return { isBookmarkPopupOpen: BookmarkStore.getState().isBookmarkPopupOpen };
};
