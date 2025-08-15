import { GlobalPageProps } from "@/types/global-page-props";
import { Suspense } from "react";
import React from "react";
import { SwiperClient } from "./components/swiper";
import { Card, CardHeader } from "@/components/ui/card";

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
    <div className="flex h-full w-full flex-col overflow-hidden bg-transparent py-4">
      <SwiperClient />
      <Card className="w-full dark:bg-white/15">
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Extra information</h2>
        </CardHeader>
      </Card>
    </div>
  );
}
