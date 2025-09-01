"use client";

import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { NamesOfGodCard } from "./God-attributes-card";
import { cn } from "@/lib/utils";
import { NavigationOptions } from "swiper/types";
import { NameStore } from "@/hooks/use-name";

interface Props {
  className?: string;
}

export function SwiperClient({ className }: Props) {
  const centerRef = useRef<any>(null);
  const prevRef = useRef<any>(null);
  const nextRef = useRef<any>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const isInternalUpdate = useRef(false);
  const hasMounted = useRef(false);
  const { data, activeCard, setActiveCard } = NameStore();

  // Initialize navigation after swiper is ready
  const initializeNavigation = (swiper: any) => {
    if (!swiper || !swiper.params || !navigationPrevRef.current || !navigationNextRef.current)
      return;

    try {
      if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
        const navigation = swiper.params.navigation as NavigationOptions;
        navigation.prevEl = navigationPrevRef.current;
        navigation.nextEl = navigationNextRef.current;

        // Safely reinitialize navigation
        if (swiper.navigation) {
          swiper.navigation.destroy();
          swiper.navigation.init();
          swiper.navigation.update();
        }
      }
    } catch (error) {
      console.error("Error initializing navigation:", error);
    }
  };

  // Initialize swiper connections and navigation (only once)
  useEffect(() => {
    const initializeSwiper = () => {
      if (!centerRef.current || !centerRef.current.swiper) return;

      const swiper = centerRef.current.swiper;

      // Set up controller connections
      if (prevRef.current && nextRef.current && prevRef.current.swiper && nextRef.current.swiper) {
        try {
          swiper.controller.control = [prevRef.current.swiper, nextRef.current.swiper];
          prevRef.current.swiper.controller.control = swiper;
          nextRef.current.swiper.controller.control = swiper;
        } catch (error) {
          console.error("Error setting up controller:", error);
        }
      }

      // Reinitialize navigation
      initializeNavigation(swiper);
    };

    const timeoutId = setTimeout(initializeSwiper, 100);
    return () => clearTimeout(timeoutId);
  }, []); // Only run once on mount

  // Handle activeCard changes
  useEffect(() => {
    if (!centerRef.current || !centerRef.current.swiper) return;

    const swiper = centerRef.current.swiper;

    // Skip if this is our own internal update
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }

    if (activeCard !== undefined && activeCard !== null && !isNaN(activeCard)) {
      try {
        // Check if we're already on the correct slide
        if (swiper.realIndex !== activeCard) {
          const isInitialMount = !hasMounted.current;
          hasMounted.current = true;

          // Use animation only after initial mount
          swiper.slideToLoop(activeCard, isInitialMount ? 0 : 500);
          console.log(
            isInitialMount ? "Initial sync to activeCard:" : "Smooth scrolling to activeCard:",
            activeCard
          );
        }
      } catch (error) {
        console.error("Error sliding to activeCard:", error);
      }
    }
  }, [activeCard]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!centerRef.current || !centerRef.current.swiper) return;

      switch (event.key) {
        case "Enter":
          // Smooth scroll to current active card
          if (activeCard !== undefined && activeCard !== null && !isNaN(activeCard)) {
            centerRef.current.swiper.slideToLoop(activeCard, 500);
          }
          break;
        case "ArrowLeft":
          centerRef.current.swiper.slidePrev();
          break;
        case "ArrowRight":
          centerRef.current.swiper.slideNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeCard]);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Left (hidden on mobile) */}
      <div className="hidden w-1/3 opacity-50 md:block">
        <Swiper
          ref={prevRef}
          modules={[Controller]}
          slidesPerView={1}
          centeredSlides
          loop
          allowTouchMove={false}
        >
          {data.map((_, idx) => {
            const prevIdx = (idx - 1 + data.length) % data.length;
            return (
              <SwiperSlide key={`prev-${idx}`}>
                <NamesOfGodCard
                  name={data[prevIdx]}
                  isExpanded={false}
                  onCardClick={() => {
                    setActiveCard(prevIdx);
                  }}
                  index={prevIdx}
                  className="mx-14 my-3"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Center */}
      <div className="relative z-10 w-full max-w-md">
        <Swiper
          ref={centerRef}
          initialSlide={activeCard ?? 0}
          modules={[Navigation, Pagination, Mousewheel, Controller]}
          slidesPerView={1}
          centeredSlides
          loop
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          mousewheel={{
            thresholdDelta: 50,
            sensitivity: 1,
          }}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          speed={500} // Smooth transition speed
          onBeforeInit={(swiper) => {
            // Initial navigation setup
            if (swiper.params?.navigation && typeof swiper.params.navigation !== "boolean") {
              const navigation = swiper.params.navigation as NavigationOptions;
              navigation.prevEl = navigationPrevRef.current;
              navigation.nextEl = navigationNextRef.current;
            }
          }}
          onSwiper={(swiper) => {
            // Ensure navigation works after component mounts
            setTimeout(() => {
              initializeNavigation(swiper);
            }, 100);
          }}
          onSlideChange={(swiper) => {
            // Prevent infinite loops by using internal update flag
            isInternalUpdate.current = true;
            setActiveCard(swiper.realIndex);
          }}
        >
          {data.map((item, idx) => (
            <SwiperSlide key={`center-${idx}`}>
              <NamesOfGodCard
                name={item}
                isExpanded={false}
                onCardClick={() => {
                  setActiveCard(idx);
                }}
                index={idx}
                className="mx-20 my-8"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation buttons */}
        <button
          ref={navigationPrevRef}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-transparent p-2 shadow-lg transition-all hover:scale-110 hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Previous slide"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          ref={navigationNextRef}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:scale-110 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Next slide"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Right (hidden on mobile) */}
      <div className="hidden w-1/3 opacity-50 md:block">
        <Swiper
          ref={nextRef}
          modules={[Controller]}
          slidesPerView={1}
          centeredSlides
          loop
          allowTouchMove={false}
        >
          {data.map((_, idx) => {
            const nextIdx = (idx + 1) % data.length;
            return (
              <SwiperSlide key={`next-${idx}`}>
                <NamesOfGodCard
                  name={data[nextIdx]}
                  isExpanded={false}
                  onCardClick={() => {
                    setActiveCard(nextIdx);
                  }}
                  index={nextIdx}
                  className="mx-14 my-3"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
