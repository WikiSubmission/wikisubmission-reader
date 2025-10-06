"use client";

import React from "react";

interface VerseListProps {
  verses: { id: string; text: string }[];
  VerseComponent: React.ComponentType<{ verse: { id: string; text: string } }>;
}

export default function VerseList({ verses, VerseComponent }: VerseListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {verses.map((v) => (
        <VerseComponent key={v.id} verse={v} />
      ))}
    </div>
  );
}
