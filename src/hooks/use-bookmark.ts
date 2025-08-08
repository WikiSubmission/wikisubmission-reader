import { BookmarkType } from "@/types/bookmarks";
import { WQuranAPIResponse, WQuranVerse } from "@/types/w-quran";
import { getUrlQuery } from "@/utils/get-url-query";
import { Book, Bookmark } from "lucide-react";
import { CONFIG_FILES } from "next/dist/shared/lib/constants";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const BOOKMARK_HISTORY_SIZE = 10;

interface BookmarkState {
  bookmarks: BookmarkType[];
  addBookmark: (bookmark: BookmarkType) => void;
  removeBookmark: (bookmark: BookmarkType) => void;
  currentBookmark: BookmarkType | null;
  setCurrentBookmark: (bookmark: BookmarkType | null) => void;
  isBookmarkPopupOpen: boolean;
  setIsBookmarkPopupOpen: (isOpen: boolean) => void;
  isVerseBookmarked: (verse: WQuranVerse) => boolean;
  fetchVerseContent: (
    bookmarks: BookmarkType[],
  ) => Promise<WQuranAPIResponse["response"]["data"] | null>;
}

const verseHistoryExampleData = [
  {
    chapter_number: 1,
    verse_number: 1,
  },
  {
    chapter_number: 2,
    verse_number: 2,
  },
  {
    chapter_number: 3,
    verse_number: 3,
  },
];
const initialState: Omit<
  BookmarkState,
  | "addBookmark"
  | "removeBookmark"
  | "setCurrentBookmark"
  | "setIsBookmarkPopupOpen"
  | "fetchVerseContent"
  | "isVerseBookmarked"
> = {
  bookmarks: verseHistoryExampleData,
  currentBookmark: null,
  isBookmarkPopupOpen: false,
};

const BookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      ...initialState,
      isVerseBookmarked: (verse) => {
        const { bookmarks } = get();

        return bookmarks.some((bookmark) => {
          return (
            bookmark.chapter_number === verse.chapter_number &&
            bookmark.verse_number === verse.verse_number
          );
        });
      },

      fetchVerseContent: async (bookmarks: BookmarkType[]) => {
        const verseIDs = bookmarks.map(
          (bookmark) => `${bookmark.chapter_number}:${bookmark.verse_number}`,
        );
        const detectedQuery = verseIDs
          .map((segment) => decodeURIComponent(segment))
          .join("/"); //|| resolvedSearchParams.q?.toString();
        if (!detectedQuery) return null;
        const baseUrl = new URL(
          process.env.TEST_MODE === "true"
            ? `http://localhost:8080/${detectedQuery}`
            : `https://quran.wikisubmission.org/${detectedQuery}`,
        );
        baseUrl.searchParams.append("include_word_by_word", "true");
        baseUrl.searchParams.append("search_apply_highlight", "true");
        let result: WQuranAPIResponse;

        try {
          const request = await fetch(baseUrl.toString(), {
            cache: "no-store",
          });
          if (!request.ok)
            throw new Error(`Error: ${request.status} ${request.statusText}`);
          // [Assign result]
          result = await request.json();
        } catch (err) {
          // [Internal Server Error]
          console.error(err);
          return null;
        }
        return result.response.data;
      },
      addBookmark: (bookmark: BookmarkType) => {
        const bookmarkSize = get().bookmarks.length;
        get().removeBookmark(bookmark);
        if (bookmarkSize >= 10) {
          set((state) => ({
            bookmarks: [
              {
                chapter_number: bookmark.chapter_number,
                verse_number: bookmark.verse_number,
              },
              ...state.bookmarks.slice(0, -1),
            ],
          }));
        } else {
          set((state) => ({
            bookmarks: [
              {
                chapter_number: bookmark.chapter_number,
                verse_number: bookmark.verse_number,
              },
              ...state.bookmarks,
            ],
          }));
        }
      },
      removeBookmark: (bookmark: BookmarkType) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter(
            (mark) =>
              bookmark.chapter_number !== mark.chapter_number &&
              bookmark.verse_number !== mark.verse_number,
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
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default BookmarkStore;

export const bookmarkPopupUtils = () => {
  return { isBookmarkPopupOpen: BookmarkStore.getState().isBookmarkPopupOpen };
};
