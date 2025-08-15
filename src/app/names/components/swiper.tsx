"use client";

import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { NamesOfGodCard } from "./name-of-God-card";
import { NAMES_OF_GOD } from "../data";
import { cn } from "@/lib/utils";
interface Props {
  className?: string;
}
export function SwiperClient({ className }: Props) {
  const centerRef = useRef<any>(null);
  const prevRef = useRef<any>(null);
  const nextRef = useRef<any>(null);

  useEffect(() => {
    if (centerRef.current && prevRef.current && nextRef.current && centerRef.current.swiper) {
      centerRef.current.swiper.controller.control = [
        prevRef.current.swiper,
        nextRef.current.swiper,
      ];
      prevRef.current.swiper.controller.control = centerRef.current.swiper;
      nextRef.current.swiper.controller.control = centerRef.current.swiper;
    }
  }, []);

  return (
    <div className={cn("relative flex items-center justify-center space-x-[-50px]", className)}>
      {/* Left */}
      <Swiper
        ref={prevRef}
        modules={[Controller]}
        slidesPerView={1}
        centeredSlides
        loop
        allowTouchMove={false}
        className="w-1/4 cursor-pointer opacity-50"
      >
        {NAMES_OF_GOD.map((data, idx) => (
          <SwiperSlide key={`prev-${idx}`}>
            <NamesOfGodCard name={data} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Center */}
      <Swiper
        ref={centerRef}
        modules={[Navigation, Pagination, Mousewheel, Controller]}
        slidesPerView={1}
        centeredSlides
        loop
        navigation
        pagination={{ clickable: true }}
        mousewheel
        className="z-10 w-1/2"
      >
        {NAMES_OF_GOD.map((data, idx) => (
          <SwiperSlide key={`center-${idx}`}>
            <NamesOfGodCard name={data} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right */}
      <Swiper
        ref={nextRef}
        modules={[Controller]}
        slidesPerView={1}
        centeredSlides
        loop
        allowTouchMove={false}
        className="w-1/4 cursor-pointer opacity-50"
      >
        {NAMES_OF_GOD.map((data, idx) => (
          <SwiperSlide key={`next-${idx}`}>
            <NamesOfGodCard name={data} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
