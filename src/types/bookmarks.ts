// export type BookmarkType = {
//   chapter_number: number;
//   verse_number: number;
// };

import { WQuranVerse } from "./w-quran";

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
>;
