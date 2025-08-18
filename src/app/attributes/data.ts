import { NamesOfGodCardData } from "./types";

export const NAMES_OF_GOD: NamesOfGodCardData[] = [
  {
    order_in_revelation: 1,
    arabic_text: "الله", // deprecated
    english_text: "God", // deprecated
    text: [
      { text: "الله", language: "ARABIC" },
      { text: "God", language: "ENGLISH" },
    ],
    gematria: 112,
    occurences: [
      { chapter_index: 1, verse_index: 1, word_index: 1 },
      { chapter_index: 1, verse_index: 2, word_index: 3 },
      { chapter_index: 2, verse_index: 255, word_index: 4 },
    ],
    gematria_breakdown: [],
  },
  {
    order_in_revelation: 2,
    arabic_text: "الرحمن", // deprecated
    english_text: "Most Gracious", // deprecated
    text: [
      { text: "الرحمن", language: "ARABIC" },
      { text: "Most Gracious", language: "ENGLISH" },
    ],
    gematria: 329,
    gematria_breakdown: [
      { letter: "ا", value: 1 },
      { letter: "ل", value: 30 },
      { letter: "ر", value: 200 },
      { letter: "ح", value: 8 },
      { letter: "م", value: 40 },
      { letter: "ن", value: 50 },
    ],
    occurences: [
      { chapter_index: 1, verse_index: 1, word_index: 3 },
      { chapter_index: 1, verse_index: 3, word_index: 1 },
      { chapter_index: 2, verse_index: 163, word_index: 7 },
      { chapter_index: 3, verse_index: 31, word_index: 12 },
      { chapter_index: 4, verse_index: 16, word_index: 5 },
    ],
  },
  {
    order_in_revelation: 3,
    arabic_text: "الرحيم", // deprecated
    english_text: "Most Merciful", // deprecated
    text: [
      { text: "الرحيم", language: "ARABIC" },
      { text: "Most Merciful", language: "ENGLISH" },
    ],
    gematria: 289,
    occurences: [
      { chapter_index: 1, verse_index: 1, word_index: 3 },
      { chapter_index: 1, verse_index: 3, word_index: 1 },
    ],
    gematria_breakdown: [],
  },
];
