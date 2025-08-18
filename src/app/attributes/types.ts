export type Languages = "ARABIC" | "ENGLISH" | "FRENCH" | "SPANISH" | "GERMAN";
export const DEFAULT_LANGUAGES: Languages[] = ["ARABIC", "ENGLISH", "FRENCH", "SPANISH", "GERMAN"];

type ArticleType = {
  language: Languages;
  title: string;
  content: string;
};

export interface NamesOfGodCardData {
  order_in_revelation: number;
  text: {
    text: string;
    language: Languages;
  }[];
  gematria: number;
  occurences: {
    chapter_index: number;
    verse_index: number;
    word_index: number;
  }[];
  gematria_breakdown: {
    letter: string;
    value: number;
  }[];
  article: ArticleType;
}
