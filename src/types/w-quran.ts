export type WQuranVerse = {
  verse_id: string;
  chapter_number: number;
  verse_number: number;
  verse_index: number;
  chapter_title_english: string;
  chapter_title_arabic: string;
  chapter_title_transliterated: string;
  verse_text_english: string;
  verse_text_arabic: string;
  verse_text_transliterated: string;
  verse_subtitle_english?: string;
  verse_footnote_english?: string;
  word_by_word?: WQuranWordByWord[];
};

export type WQuranWordByWord = {
  arabic_text: string;
  transliteration: string;
  transliterated_text: string;
  root_word: string;
  english_text: string;
  verse_index: number;
  word_index: number;
};

export interface WQuranAPIResponse {
  message: string;
  request: {
    type: string;
    parsed_query: any;
    raw_query: string;
  };
  response: {
    data: WQuranVerse[];
    copyright?: {
      text: string;
      url: string;
    };
  };
}
