import { GlobalPageProps } from "@/types/global-page-props";
import { Suspense } from "react";
import React from "react";
import { GridCarouselSwitcher } from "./grid-carousel-switcher";

export default async function Page({ params, searchParams }: GlobalPageProps) {
  const { slug } = await params;
  return (
    <Suspense key={slug as unknown as string} fallback={<div>Loading or something </div>}>
      <GridCarouselSwitcher />
    </Suspense>
  );
}
