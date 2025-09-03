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
    <Suspense
      key={slug as unknown as string}
      fallback={
        <div className="flex h-screen w-full items-start justify-center bg-transparent">
          <div className="flex flex-col items-center justify-center space-y-4 pt-[30%] sm:pt-[20%] md:pt-[15%]">
            {/* Spinner */}
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500 dark:border-gray-700 dark:border-t-blue-400" />

            {/* Loading text */}
            <p className="animate-pulse text-lg font-medium text-gray-700 dark:text-gray-300">
              Loading attributes...
            </p>
          </div>
        </div>
      }
    >
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
