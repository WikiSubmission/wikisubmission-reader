import { convertSheetDataToGodAttributes } from "./sheet-converter";
import { GodAttributesCardDataType } from "@/app/attributes/types";

export async function fetchAndConvertGoogleSheet(
  sheetUrl: string
): Promise<GodAttributesCardDataType[]> {
  try {
    // Convert Google Sheets URL to CSV export URL
    const sheetId = extractSheetId(sheetUrl);
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

    console.log("Fetching sheet data from:", csvUrl);

    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();
    const sheetData = parseCSV(csvText);

    console.log(`Parsed ${sheetData.length} rows from sheet`);

    const convertedData = convertSheetDataToGodAttributes(sheetData);

    console.log(`Converted to ${convertedData.length} God attributes`);

    return convertedData;
  } catch (error) {
    console.error("Error fetching and converting sheet:", error);
    throw error;
  }
}

function extractSheetId(url: string): string {
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (!match) {
    throw new Error("Invalid Google Sheets URL");
  }
  return match[1];
}

function parseCSV(csvText: string): any[] {
  const lines = csvText.split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));

  return lines
    .slice(1)
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const values = parseCSVLine(line);
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || "";
      });
      return row;
    });
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}
