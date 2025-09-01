import { calculateGematria, getGematriaBreakdown } from "./gematria";
import { Languages, GodAttributesCardDataType } from "@/app/attributes/types";
interface SheetRow {
  "Verse (first verse occurance)": string;
  "Order in revelation": string;
  Arabic: string;
  English: string;
  "Gematrical Value": string;
  Frequency: string;
  "Occured Verse": string;
  Turkish: string;
  French: string;
  "Gematria Test": string;
  // Add other language columns as they appear
  [key: string]: string;
}

export function convertSheetDataToGodAttributes(
  sheetData: SheetRow[]
): GodAttributesCardDataType[] {
  return sheetData
    .filter((row) => row.Arabic && row.Arabic.trim() !== "") // Filter out empty rows
    .map((row, index) => {
      const arabicText = row.Arabic.trim();
      const gematria = calculateGematria(arabicText);

      // Parse occurrences
      const occurences = parseOccurrences(row["Occured Verse"]);

      // Calculate order in revelation from verse list (using first occurrence)
      const orderInRevelation =
        occurences.length > 0 ? calculateOrderFromFirstOccurrence(occurences[0]) : index + 1;

      // Build text array for different languages
      const text: { text: string; language: Languages }[] = [];

      // Add Arabic (always present)
      text.push({
        text: arabicText,
        language: "ARABIC",
      });

      // Add English if present
      if (row.English && row.English.trim()) {
        text.push({
          text: row.English.trim(),
          language: "ENGLISH",
        });
      }

      // Add French if present
      if (row.French && row.French.trim()) {
        text.push({
          text: row.French.trim(),
          language: "FRENCH",
        });
      }

      // Add Turkish if present (extending our Languages type)
      if (row.Turkish && row.Turkish.trim()) {
        text.push({
          text: row.Turkish.trim(),
          language: "TURKISH" as Languages,
        });
      }

      // Check for other language columns dynamically
      Object.keys(row).forEach((key) => {
        if (isLanguageColumn(key) && row[key] && row[key].trim()) {
          const language = mapColumnToLanguage(key);
          if (language && !text.find((t) => t.language === language)) {
            text.push({
              text: row[key].trim(),
              language,
            });
          }
        }
      });

      return {
        order_in_revelation: orderInRevelation,
        text,
        gematria,
        occurences,
        gematria_breakdown: getGematriaBreakdown(arabicText),
      };
    })
    .sort((a, b) => a.order_in_revelation - b.order_in_revelation); // Sort by revelation order
}

function parseOccurrences(
  occurredVerse: string
): { chapter_index: number; verse_index: number; word_index: number }[] {
  if (!occurredVerse || occurredVerse.trim() === "") return [];

  return occurredVerse
    .split(",")
    .map((verse) => verse.trim())
    .filter((verse) => verse !== "")
    .map((verse) => {
      const parts = verse.split(":");
      if (parts.length >= 2) {
        return {
          chapter_index: parseInt(parts[0]) || 1,
          verse_index: parseInt(parts[1]) || 1,
          word_index: parts[2] ? parseInt(parts[2]) : 1,
        };
      }
      return {
        chapter_index: 1,
        verse_index: 1,
        word_index: 1,
      };
    });
}

function calculateOrderFromFirstOccurrence(occurrence: {
  chapter_index: number;
  verse_index: number;
}): number {
  // This is a simplified calculation - you might want to implement
  // a more sophisticated Quranic revelation order calculation
  return occurrence.chapter_index * 1000 + occurrence.verse_index;
}

function isLanguageColumn(columnName: string): boolean {
  const languageColumns = ["spanish", "german", "italian", "urdu", "hindi", "chinese"];
  return languageColumns.some((lang) => columnName.toLowerCase().includes(lang));
}

function mapColumnToLanguage(columnName: string): Languages | null {
  const mapping: { [key: string]: Languages } = {
    spanish: "SPANISH",
    german: "GERMAN",
    // Add more mappings as needed
  };

  for (const [key, value] of Object.entries(mapping)) {
    if (columnName.toLowerCase().includes(key)) {
      return value;
    }
  }
  return null;
}
