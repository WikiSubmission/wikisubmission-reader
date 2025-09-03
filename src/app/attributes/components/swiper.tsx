"use client";

import { useRef, useEffect, useMemo, useCallback } from "react";
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

  // Memoize expensive data transformations
  const { prevData, nextData } = useMemo(() => {
    const prevData = data.map((_, idx) => {
      const prevIdx = (idx - 1 + data.length) % data.length;
      return { item: data[prevIdx], index: prevIdx };
    });

    const nextData = data.map((_, idx) => {
      const nextIdx = (idx + 2) % data.length;
      return { item: data[nextIdx], index: nextIdx };
    });

    return { prevData, nextData };
  }, [data]);

  // Memoize swiper configuration objects
  const swiperConfig = useMemo(
    () => ({
      pagination: {
        clickable: true,
        dynamicBullets: true,
      },
      mousewheel: {
        thresholdDelta: 50,
        sensitivity: 1,
      },
      navigation: {
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      },
    }),
    []
  );

  // Memoize the navigation initialization function
  const initializeNavigation = useCallback((swiper: any) => {
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
  }, []);

  // Memoize card click handlers
  const handlePrevCardClick = useCallback(
    (index: number) => {
      setActiveCard(index);
    },
    [setActiveCard]
  );

  const handleCenterCardClick = useCallback(
    (index: number) => {
      setActiveCard(index);
    },
    [setActiveCard]
  );

  const handleNextCardClick = useCallback(
    (index: number) => {
      setActiveCard(index);
    },
    [setActiveCard]
  );

  // Memoize swiper event handlers
  const handleBeforeInit = useCallback((swiper: any) => {
    // Initial navigation setup
    if (swiper.params?.navigation && typeof swiper.params.navigation !== "boolean") {
      const navigation = swiper.params.navigation as NavigationOptions;
      navigation.prevEl = navigationPrevRef.current;
      navigation.nextEl = navigationNextRef.current;
    }
  }, []);

  const handleSwiperInit = useCallback(
    (swiper: any) => {
      // Ensure navigation works after component mounts
      setTimeout(() => {
        initializeNavigation(swiper);
      }, 100);
    },
    [initializeNavigation]
  );

  const handleSlideChange = useCallback(
    (swiper: any) => {
      // Prevent infinite loops by using internal update flag
      isInternalUpdate.current = true;
      setActiveCard(swiper.realIndex);
    },
    [setActiveCard]
  );

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
  }, [initializeNavigation]); // Add initializeNavigation to deps

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

  // Memoize keyboard handler
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
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
    },
    [activeCard]
  );

  // Handle keyboard navigation
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

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
          {prevData.map((item, idx) => (
            <SwiperSlide key={`prev-${idx}`}>
              <NamesOfGodCard
                name={item.item}
                isExpanded={false}
                onCardClick={handlePrevCardClick}
                index={item.index}
                className="mx-14 my-3"
              />
            </SwiperSlide>
          ))}
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
          pagination={swiperConfig.pagination}
          mousewheel={swiperConfig.mousewheel}
          navigation={swiperConfig.navigation}
          speed={500} // Smooth transition speed
          onBeforeInit={handleBeforeInit}
          onSwiper={handleSwiperInit}
          onSlideChange={handleSlideChange}
        >
          {data.map((item, idx) => (
            <SwiperSlide key={`center-${idx}`}>
              <NamesOfGodCard
                name={item}
                isExpanded={false}
                onCardClick={handleCenterCardClick}
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
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-transparent p-2 shadow-lg transition-all hover:scale-110 hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          {nextData.map((item, idx) => (
            <SwiperSlide key={`next-${idx}`}>
              <NamesOfGodCard
                name={item.item}
                isExpanded={false}
                onCardClick={handleNextCardClick}
                index={item.index}
                className="mx-14 my-3"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
