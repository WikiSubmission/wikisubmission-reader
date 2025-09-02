export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { fetchAndConvertGoogleSheet } from "@/lib/sheet-fetcher";
import { saveGodAttributesToJSON, loadGodAttributesFromJSON } from "@/lib/file";

async function initializeData() {
  try {
    console.log("Initializing God attributes data...");

    let data = await loadGodAttributesFromJSON();

    if (!data || data.length === 0) {
      console.log("No existing data found, fetching from Google Sheets...");
      const sheetUrl = process.env.GOOGLE_SHEETS_URL;
      if (!sheetUrl) {
        throw new Error("GOOGLE_SHEETS_URL is not set");
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

async function updateGodAttributesData() {
  try {
    console.log("Starting scheduled God attributes update...");

    const sheetUrl = process.env.GOOGLE_SHEETS_URL;
    if (!sheetUrl) {
      throw new Error("GOOGLE_SHEETS_URL is not set");
    }

    const data = await fetchAndConvertGoogleSheet(sheetUrl);
    await saveGodAttributesToJSON(data);

    console.log(`Successfully updated ${data.length} God attributes`);

    return data.length;
  } catch (error) {
    console.error("Scheduled update failed:", error);
    throw error;
  }
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("x-cron-secret");

  if (authHeader !== process.env.CRON_SECRET) {
    console.warn("Unauthorized cron attempt");
    return NextResponse.json({ error: `Unauthorized` }, { status: 401 });
  }

  try {
    const updatedCount = await updateGodAttributesData();
    return NextResponse.json({
      success: true,
      updated: updatedCount,
      ranAt: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({ error: "Cron job failed", details: String(err) }, { status: 500 });
  }
}
