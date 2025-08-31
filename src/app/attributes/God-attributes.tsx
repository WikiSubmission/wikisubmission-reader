"use client";
import { useState } from "react";
import { ExtraInfo } from "./components/extra-info";
import { SwiperClient } from "./components/swiper";

export function NamesOfGod() {
  const [showExtraInfo, setShowExtraInfo] = useState<boolean>(false);
  return (
    <div className="flex h-screen w-full flex-col justify-start gap-28 overflow-hidden py-4">
      <SwiperClient />
      {showExtraInfo && <ExtraInfo />}
    </div>
  );
}
