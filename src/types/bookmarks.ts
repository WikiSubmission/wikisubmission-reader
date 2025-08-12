import { WQuranVerse } from "./w-quran";
import { WResult } from "./w-result";

export type BookmarkType = Omit<
  WQuranVerse,
  | "verse_id"
  | "verse_index"
  | "chapter_title_english"
  | "chapter_title_arabic"
  | "chapter_title_transliterated"
  | "verse_text_english"
  | "verse_text_arabic"
  | "verse_text_transliterated"
  | "verse_subtitle_english"
  | "verse_footnote_english"
  | "word_by_word"
> & {
  bookmark_datetime_timezoneaware: string;
  notes: string;
};

export type BookmarkInjectedType = BookmarkType & WQuranVerse;

export interface WBookmarkQuranAPIResponse {
  message: string;
  request: {
    type: WResult["request"]["type"];
    parsed_query: any;
    raw_query: string;
  };
  response: {
    data: BookmarkInjectedType[];
    copyright?: {
      text: string;
      url: string;
    };
  };
}
