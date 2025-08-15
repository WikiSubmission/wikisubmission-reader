import { GlobalPageProps } from "@/types/global-page-props";
import { Suspense } from "react";
import React from "react";
import { SwiperClient } from "./components/swiper";

export default async function Page({ params, searchParams }: GlobalPageProps) {
  const { slug } = await params;
  return (
    <Suspense key={slug?.join("-")} fallback={<div>Loading or something </div>}>
      <NamesOfGod />
    </Suspense>
  );
}

async function NamesOfGod() {
  return (
    <div className="h-full w-full overflow-hidden bg-pink-400">
      <SwiperClient />
    </div>
  );
}
