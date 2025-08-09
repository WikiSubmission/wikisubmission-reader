import {
  BookmarkInjectedType,
  BookmarkType,
  WBookmarkQuranAPIResponse,
} from "@/types/bookmarks";
import { WQuranAPIResponse, WQuranVerse } from "@/types/w-quran";
import { getUrlQuery } from "@/utils/get-url-query";
import { Book, Bookmark } from "lucide-react";
import { CONFIG_FILES } from "next/dist/shared/lib/constants";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const BOOKMARK_HISTORY_SIZE = 10;

interface BookmarkState {
  bookmarks: BookmarkType[];
  addBookmark: (
    bookmark: Omit<BookmarkType, "bookmark_datetime_timezoneaware">,
  ) => void;
  removeBookmark: (
    bookmark: Omit<BookmarkType, "bookmark_datetime_timezoneaware">,
  ) => void;
  currentBookmark: BookmarkType | null;
  setCurrentBookmark: (bookmark: BookmarkType | null) => void;
  isBookmarkPopupOpen: boolean;
  setIsBookmarkPopupOpen: (isOpen: boolean) => void;
  isVerseBookmarked: (verse: WQuranVerse) => boolean;
  fetchVerseContent: (
    bookmarks: BookmarkType[],
  ) => Promise<WBookmarkQuranAPIResponse["response"]["data"] | null>;
  getInjectedBookmarks: () => Promise<BookmarkInjectedType[]>;

  updateBookmarkNotes: (verseId: string, notes: string) => void;
  getNotesForVerse: (verseId: string) => string;
}

export const mockBookmarks: BookmarkInjectedType[] = [
  {
    verse_id: "2_255",
    chapter_number: 2,
    verse_number: 255,
    verse_index: 255,
    chapter_title_english: "The Cow",
    chapter_title_arabic: "البقرة",
    chapter_title_transliterated: "Al-Baqarah",
    verse_text_english:
      "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.",
    verse_text_arabic:
      "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
    verse_text_transliterated:
      "Allahu la ilaha illa huwa, al-hayyu al-qayyumu...",
    verse_subtitle_english: "Ayat al-Kursi",
    verse_footnote_english:
      "This is known as the Throne Verse, one of the most powerful verses in the Quran.",
    bookmark_datetime_timezoneaware: "2024-03-15T14:30:00Z",
    notes: "",
  },
  {
    verse_id: "1_1",
    chapter_number: 1,
    verse_number: 1,
    verse_index: 1,
    chapter_title_english: "The Opening",
    chapter_title_arabic: "الفاتحة",
    chapter_title_transliterated: "Al-Fatihah",
    verse_text_english:
      "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    verse_text_arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    verse_text_transliterated: "Bismillahi r-rahmani r-raheem",
    bookmark_datetime_timezoneaware: "2024-03-14T09:15:00Z",
    notes: "",
  },
  {
    verse_id: "3_102",
    chapter_number: 3,
    verse_number: 102,
    verse_index: 102,
    chapter_title_english: "Family of Imran",
    chapter_title_arabic: "آل عمران",
    chapter_title_transliterated: "Ali 'Imran",
    verse_text_english:
      "O you who have believed, fear Allah as He should be feared and do not die except as Muslims [in submission to Him].",
    verse_text_arabic:
      "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ حَقَّ تُقَاتِهِ وَلَا تَمُوتُنَّ إِلَّا وَأَنْتُمْ مُسْلِمُونَ",
    verse_text_transliterated:
      "Ya ayyuha alladhina amanu ttaqu Allaha haqqa tuqatihi...",
    bookmark_datetime_timezoneaware: "2024-03-13T18:45:00Z",
    notes: "",
  },
];
const verseHistoryExampleData = [
  {
    chapter_number: 1,
    verse_number: 1,
    bookmark_datetime_timezoneaware: new Date().toISOString(),
    notes: "",
  },
  {
    chapter_number: 2,
    verse_number: 2,
    bookmark_datetime_timezoneaware: new Date().toISOString(),
    notes: "",
  },
  {
    chapter_number: 3,
    verse_number: 3,
    bookmark_datetime_timezoneaware: new Date().toISOString(),
    notes: "",
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
  | "getInjectedBookmarks"
  | "updateBookmarkNotes"
  | "getNotesForVerse"
> = {
  bookmarks: [],
  currentBookmark: null,
  isBookmarkPopupOpen: false,
};

const BookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      ...initialState,

      updateBookmarkNotes: (verseId: string, notes: string) => {
        set((state) => ({
          bookmarks: state.bookmarks.map((bookmark) => {
            // Match by verse_id string format (chapter_number:verse_number)
            const bookmarkVerseId = `${bookmark.chapter_number}_${bookmark.verse_number}`;
            return bookmarkVerseId === verseId
              ? { ...bookmark, notes }
              : bookmark;
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
          (bookmark) => `${bookmark.chapter_number}:${bookmark.verse_number}`,
        );
        const detectedQuery = verseIDs
          .map((segment) => decodeURIComponent(segment))
          .join(","); //|| resolvedSearchParams.q?.toString();
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
        return result.response.data.map((v) => {
          const correspondingBookmarkType = bookmarks.find(
            (b) =>
              b.chapter_number === v.chapter_number &&
              b.verse_number === v.verse_number,
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
        get().removeBookmark(bookmark);
        const datetime = new Date().toISOString();
        const newBookmark = {
          chapter_number: bookmark.chapter_number,
          verse_number: bookmark.verse_number,
          bookmark_datetime_timezoneaware: datetime,
          notes: "",
        };
        if (bookmarkSize >= 10) {
          set((state) => ({
            bookmarks: [newBookmark, ...state.bookmarks.slice(0, -1)],
          }));
        } else {
          set((state) => ({
            bookmarks: [newBookmark, ...state.bookmarks],
          }));
        }

        console.log("New state after addition: ", [
          newBookmark,
          ...get().bookmarks,
        ]);
      },
      removeBookmark: (bookmark) =>
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
