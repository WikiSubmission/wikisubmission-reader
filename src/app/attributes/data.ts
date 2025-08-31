import { GodAttributesCardDataType } from "./types";

export const NAMES_OF_GOD: GodAttributesCardDataType[] = [
  {
    order_in_revelation: 1,
    text: [
      { text: "الله", language: "ARABIC" },
      { text: "God", language: "ENGLISH" },
      { text: "Dieu", language: "FRENCH" },
      { text: "Dios", language: "SPANISH" },
      { text: "Gott", language: "GERMAN" },
    ],
    gematria: 66,
    occurences: [
      { chapter_index: 1, verse_index: 1, word_index: 1 },
      { chapter_index: 2, verse_index: 255, word_index: 5 },
    ],
    gematria_breakdown: [
      { letter: "ا", value: 1 },
      { letter: "ل", value: 30 },
      { letter: "ل", value: 30 },
      { letter: "ه", value: 5 },
    ],
  },
  {
    order_in_revelation: 2,
    text: [
      { text: "الرحمن", language: "ARABIC" },
      { text: "The Most Gracious", language: "ENGLISH" },
      { text: "Le Tout Miséricordieux", language: "FRENCH" },
      { text: "El Más Misericordioso", language: "SPANISH" },
      { text: "Der Barmherzige", language: "GERMAN" },
    ],
    gematria: 298,
    occurences: [
      { chapter_index: 19, verse_index: 18, word_index: 2 },
      { chapter_index: 55, verse_index: 1, word_index: 1 },
    ],
    gematria_breakdown: [
      { letter: "ا", value: 1 },
      { letter: "ل", value: 30 },
      { letter: "ر", value: 200 },
      { letter: "ح", value: 8 },
      { letter: "م", value: 40 },
      { letter: "ن", value: 50 },
    ],
  },
  {
    order_in_revelation: 3,
    text: [
      { text: "الرحيم", language: "ARABIC" },
      { text: "The Most Merciful", language: "ENGLISH" },
      { text: "Le Très Miséricordieux", language: "FRENCH" },
      { text: "El Muy Misericordioso", language: "SPANISH" },
      { text: "Der Allerbarmer", language: "GERMAN" },
    ],
    gematria: 258,
    occurences: [
      { chapter_index: 1, verse_index: 1, word_index: 2 },
      { chapter_index: 2, verse_index: 163, word_index: 4 },
    ],
  },
  {
    order_in_revelation: 4,
    text: [
      { text: "الملك", language: "ARABIC" },
      { text: "The King", language: "ENGLISH" },
      { text: "Le Roi", language: "FRENCH" },
      { text: "El Rey", language: "SPANISH" },
      { text: "Der König", language: "GERMAN" },
    ],
    gematria: 90,
    occurences: [
      { chapter_index: 20, verse_index: 114, word_index: 3 },
      { chapter_index: 23, verse_index: 116, word_index: 2 },
    ],
  },
  {
    order_in_revelation: 5,
    text: [
      { text: "القدوس", language: "ARABIC" },
      { text: "The Holy", language: "ENGLISH" },
      { text: "Le Saint", language: "FRENCH" },
      { text: "El Santo", language: "SPANISH" },
      { text: "Der Heilige", language: "GERMAN" },
    ],
    gematria: 170,
    occurences: [
      { chapter_index: 59, verse_index: 23, word_index: 4 },
      { chapter_index: 62, verse_index: 1, word_index: 5 },
    ],
  },
  {
    order_in_revelation: 6,
    text: [
      { text: "السلام", language: "ARABIC" },
      { text: "The Peace", language: "ENGLISH" },
      { text: "La Paix", language: "FRENCH" },
      { text: "La Paz", language: "SPANISH" },
      { text: "Der Frieden", language: "GERMAN" },
    ],
    gematria: 131,
    occurences: [{ chapter_index: 59, verse_index: 23, word_index: 5 }],
  },
];
