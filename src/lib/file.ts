import fs from "fs/promises";
import path from "path";
import { GodAttributesCardDataType } from "@/app/attributes/types";
const DATA_FILE_PATH = path.join(process.cwd(), "data", "god-attributes.json");

export async function saveGodAttributesToJSON(data: GodAttributesCardDataType[]): Promise<void> {
  try {
    // Ensure data directory exists
    await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });

    // Save data with pretty formatting
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf8");

    console.log(`Saved ${data.length} God attributes to ${DATA_FILE_PATH}`);
  } catch (error) {
    console.error("Error saving data to JSON:", error);
    throw error;
  }
}

export async function loadGodAttributesFromJSON(): Promise<GodAttributesCardDataType[]> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf8");
    const data = JSON.parse(fileContent);

    console.log(`Loaded ${data.length} God attributes from JSON`);
    return data;
  } catch (error) {
    if ((error as any).code === "ENOENT") {
      console.log("JSON file does not exist yet, returning empty array");
      return [];
    }
    console.error("Error loading data from JSON:", error);
    throw error;
  }
}

export async function getFileLastModified(): Promise<Date | null> {
  try {
    const stats = await fs.stat(DATA_FILE_PATH);
    return stats.mtime;
  } catch (error) {
    return null;
  }
}
