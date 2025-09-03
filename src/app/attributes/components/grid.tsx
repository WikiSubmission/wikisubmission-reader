"use client";
import { NamesOfGodCard } from "./God-attributes-card";
import { motion } from "framer-motion";
import { NameStore } from "@/hooks/use-name";

export function NamesOfGodGrid() {
  const { data, activeCard, setActiveCard } = NameStore();

  const handleCardClick = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-transparent p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          layout
          className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6"
        >
          {data.map((name, index) => (
            <NamesOfGodCard
              key={index}
              name={name}
              index={index}
              isExpanded={activeCard === index}
              onCardClick={handleCardClick}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
