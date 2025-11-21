import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

// ---------- CONFIG ----------
const PREVIEW_MODE = true; // 👈 Set to false when ready to upload
const PREVIEW_LIMIT = 15;
const OUTPUT_PREVIEW_FILE = "preview-bengali.json";
const BATCH_SIZE = 50;

// ---------- Supabase Setup ----------
// Use the NEW publishable/secret keys from Settings → API (NOT legacy keys!)
const SUPABASE_URL = process.env.SUPABASE_URL || "https://uunhgbgnjwcdnhmgadra.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "sb_secret_A0S7zBM0c01FAwW1KAGo0g_KEzu4HUn"; // Use SECRET key for server-side operations

if (!SUPABASE_KEY) {
  console.error("❌ Error: SUPABASE_KEY environment variable is required");
  console.error("💡 Get the NEW Secret key from: Settings → API → API Keys tab");
  console.error("   (NOT from Legacy API Keys tab)");
  console.error("💡 Set it with: export SUPABASE_KEY='your-new-secret-key-here'");
  process.exit(1);
}

// Debug: Show key format (first/last 10 chars only for security)
console.log(`🔑 Using Supabase key: ${SUPABASE_KEY.slice(0, 10)}...${SUPABASE_KEY.slice(-10)}`);
console.log(`📍 Supabase URL: ${SUPABASE_URL}`);

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

// ---------- CSV Path ----------
const CSV_PATH = path.resolve(__dirname, "bengali-quran.csv");

// ---------- Main Logic ----------
async function loadBengaliVerses() {
  const parser = fs
    .createReadStream(CSV_PATH)
    .pipe(parse({ columns: true, skip_empty_lines: true, relax_quotes: true }));

  let lastSura: string | null = null;
  let rowCount = 0;
  const batch: any[] = [];

  for await (const record of parser) {
    let sura = record["Sura_Number"]?.trim();
    const verse = record["Verse_Number"]?.trim();

    if (!sura) sura = lastSura;
    else lastSura = sura;

    if (!sura || !verse || isNaN(Number(verse))) continue;

    const verse_text_bengali = [
      record["VerseText_Part1"] || "",
      record["VerseText_after_MidSubtitle_if_any"] || "",
    ]
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    const verse_subtitle_bengali =
      [record["Subtitle_Before_Verse"], record["Subtitle_Middle_Of_Verse"]]
        .filter(Boolean)
        .join(" ")
        .trim() || null;

    const verse_footnote_bengali = record["Footnote"]?.replace(/\*+/g, "").trim() || null;

    batch.push({
      verse_id: `${parseInt(sura)}:${parseInt(verse)}`,
      verse_text_bengali,
      verse_subtitle_bengali,
      verse_footnote_bengali,
    });

    rowCount++;
  }

  // --- PREVIEW MODE ---
  if (PREVIEW_MODE) {
    console.log(`📘 Preview Mode ON — no data will be written to Supabase`);
    console.log(`Total parsed: ${rowCount}`);
    console.log(`First ${PREVIEW_LIMIT} rows:\n`);
    console.log(batch.slice(0, PREVIEW_LIMIT));
    fs.writeFileSync(OUTPUT_PREVIEW_FILE, JSON.stringify(batch, null, 2));
    console.log(`📝 Full preview saved to ${OUTPUT_PREVIEW_FILE}`);
    return;
  }

  // --- UPDATE MODE ---
  await updateInBatches(batch);
  console.log(`✅ Done. Updated ${rowCount} Bengali verses.`);
}

// ---------- Batch Updater ----------
async function updateInBatches(rows: any[]) {
  console.log(`🚀 Starting batch updates (${BATCH_SIZE} per batch)...`);
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const chunk = rows.slice(i, i + BATCH_SIZE);
    const updates = chunk.map((row) => ({
      verse_id: row.verse_id,
      verse_text_bengali: row.verse_text_bengali || null,
      verse_subtitle_bengali: row.verse_subtitle_bengali || null,
      verse_footnote_bengali: row.verse_footnote_bengali || null,
    }));

    const { error } = await supabase
      .from("ws-quran-foreign")
      .upsert(updates, { onConflict: "verse_id" });

    if (error) {
      console.error(`❌ Batch ${i / BATCH_SIZE + 1} failed:`, error.message);
    } else {
      console.log(`✅ Batch ${i / BATCH_SIZE + 1} (${chunk.length} rows) updated successfully`);
    }
  }
}

// ---------- Run ----------
loadBengaliVerses().catch((err) => console.error("Fatal:", err));
