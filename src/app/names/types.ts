export interface NamesOfGodCardData {
  order_in_revelation: number;
  arabic_text: string;
  english_text: string;
  gematria: number;
  occurences: {
    chapter_index: number;
    verse_index: number;
    word_index: number;
  }[];
}
