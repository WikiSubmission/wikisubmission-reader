import type { NextApiRequest, NextApiResponse } from "next";
import { loadGodAttributesFromJSON, getFileLastModified } from "@/lib/file";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = await loadGodAttributesFromJSON();
    const lastModified = await getFileLastModified();

    res.status(200).json({
      data,
      meta: {
        count: data.length,
        lastUpdated: lastModified?.toISOString() || null,
      },
    });
  } catch (error) {
    console.error("Error loading God attributes:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to load data",
    });
  }
}
