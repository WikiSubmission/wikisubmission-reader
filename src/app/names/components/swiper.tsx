"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Zoom, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/parallax";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function SwiperClient() {
  return (
    <Swiper
      modules={[Parallax, Zoom, Navigation, Pagination]}
      speed={600}
      parallax={true}
      zoom={true}
      navigation
      pagination={{ clickable: true }}
      style={{ height: "80vh" }}
    >
      {/* Parallax background */}
      <div
        slot="container-start"
        className="parallax-bg"
        style={{
          backgroundImage: "url(https://picsum.photos/1200/800)",
          backgroundSize: "cover",
        }}
        data-swiper-parallax="-20%"
      ></div>

      {/* Slide 1 */}
      <SwiperSlide>
        <div data-swiper-parallax="-300">
          <h2>Parallax & Scale</h2>
        </div>
        <div data-swiper-parallax-scale="1.2">
          <img src="https://picsum.photos/600/400" alt="Slide" style={{ width: "100%" }} />
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div data-swiper-parallax="-200">
          <h2>Another Slide</h2>
        </div>
        <div data-swiper-parallax-scale="1.5">
          <img src="https://picsum.photos/600/401" alt="Slide" style={{ width: "100%" }} />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
