export const runtime = "nodejs";
import cron, { ScheduledTask } from "node-cron";
import { fetchAndConvertGoogleSheet } from "./sheet-fetcher";
import { saveGodAttributesToJSON, loadGodAttributesFromJSON } from "./file";

let cronJob: ScheduledTask | null = null;
let isInitialized = false;

export async function initializeData() {
  try {
    console.log("Initializing God attributes data...");

    // Try to load existing data first
    let data = await loadGodAttributesFromJSON();

    // If no data exists or data is empty, fetch from sheets
    if (!data || data.length === 0) {
      console.log("No existing data found, fetching from Google Sheets...");
      const sheetUrl = process.env.GOOGLE_SHEETS_URL;
      if (!sheetUrl) {
        throw new Error("GOOGLE_SHEETS_URL environment variable is not set");
      }

      data = await fetchAndConvertGoogleSheet(sheetUrl);
      await saveGodAttributesToJSON(data);
      console.log("Initial data fetched and saved successfully");
    } else {
      console.log(`Loaded ${data.length} existing God attributes`);
    }

    return data;
  } catch (error) {
    console.error("Error initializing data:", error);
    throw error;
  }
}

export async function updateGodAttributesData(): Promise<void> {
  try {
    console.log("Starting scheduled God attributes update...");

    const sheetUrl = process.env.GOOGLE_SHEETS_URL;
    if (!sheetUrl) {
      throw new Error("GOOGLE_SHEETS_URL environment variable is not set");
    }

    const data = await fetchAndConvertGoogleSheet(sheetUrl);
    await saveGodAttributesToJSON(data);

    console.log(`Successfully updated ${data.length} God attributes`);

    // Trigger store update if we're in a browser environment
    if (typeof window !== "undefined") {
      const { NameStore } = await import("../hooks/use-name");
      NameStore.getState().refreshData();
    }
  } catch (error) {
    console.error("Scheduled update failed:", error);
    throw error;
  }
}

export function startCronJobs() {
  if (isInitialized) {
    console.log("Cron jobs already initialized");
    return;
  }

  console.log("Starting cron jobs...");

  // Run daily at midnight UTC
  cronJob = cron.schedule("0 0 * * *", async () => {
    await updateGodAttributesData();
  });

  // Also run every 6 hours for more frequent updates
  const frequentUpdate = cron.schedule("0 */6 * * *", async () => {
    await updateGodAttributesData();
  });

  // Start the jobs
  cronJob.start();
  frequentUpdate.start();

  isInitialized = true;
  console.log("Cron jobs started successfully");

  // Cleanup function
  return () => {
    if (cronJob) {
      cronJob.destroy();
      cronJob = null;
    }
    if (frequentUpdate) {
      frequentUpdate.destroy();
    }
    isInitialized = false;
    console.log("Cron jobs stopped");
  };
}

export function stopCronJobs() {
  if (cronJob) {
    cronJob.destroy();
    cronJob = null;
    isInitialized = false;
    console.log("Cron jobs stopped");
  }
}
