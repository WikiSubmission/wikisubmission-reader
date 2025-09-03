export const runtime = "nodejs";

import { GlobalPageProps } from "@/types/global-page-props";
import { Suspense } from "react";
import React from "react";
import { GridCarouselSwitcher } from "./grid-carousel-switcher";
import { GodAttributesCardDataType } from "./types";

export default async function Page({ params }: GlobalPageProps) {
  const { slug } = await params;

  let attributes: GodAttributesCardDataType[] | null = [];
  try {
    attributes = await fetchAttributesData();
  } catch (err) {
    console.error("Failed to fetch attributes:", err);
  }

  return (
    <Suspense key={slug as unknown as string} fallback={<div>Loading or something</div>}>
      <GridCarouselSwitcher attributes={attributes} />
    </Suspense>
  );
}

async function fetchAttributesData(): Promise<GodAttributesCardDataType[] | null> {
  const attributesPath = "attributes";
  const baseUrl = new URL(
    process.env.TEST_MODE === "true"
      ? `http://localhost:8080/${attributesPath}`
      : `https://quran.wikisubmission.org/${attributesPath}`
  );

  try {
    const response = await fetch(baseUrl.toString(), { cache: "no-cache" });
    if (!response.ok) {
      console.error(`Failed to fetch attributes: ${response.status}`);
    }
    const data = (await response.json()).data as GodAttributesCardDataType[];
    return data;
  } catch (error) {
    console.error("Failed to fetch attributes:", error);
    return null;
  }
}
