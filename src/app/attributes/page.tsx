// attributes/page.tsx
export const runtime = "nodejs";
import { GlobalPageProps } from "@/types/global-page-props";
import { Suspense } from "react";
import React from "react";
import { GridCarouselSwitcher } from "./grid-carousel-switcher";
import { loadGodAttributesFromJSON, saveGodAttributesToJSON } from "@/lib/file";
import { GodAttributesCardDataType } from "./types";

export default async function Page({ params }: GlobalPageProps) {
  const { slug } = await params;

  let attributes: GodAttributesCardDataType[] = [];
  try {
    // Directly load from server FS (no fetch needed for local JSON)
    attributes = await loadGodAttributesFromJSON();
    // await saveGodAttributesToJSON(attributes);
  } catch (err) {
    console.error("Failed to fetch attributes:", err);
  }

  return (
    <Suspense key={slug as unknown as string} fallback={<div>Loading or something</div>}>
      <GridCarouselSwitcher attributes={attributes} />
    </Suspense>
  );
}
