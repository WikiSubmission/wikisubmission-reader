"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Data } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DefaultView() {
  const [chapterDisplayOrder, setChapterDisplayOrder] = useState<
    "standard" | "revelation"
  >("standard");
  return (
    <main className="container px-4 pt-5 space-y-10">
      <section className="text-center space-y-2 flex flex-col items-center justify-center">
        <Image
          src="/book.png"
          alt="Quran: The Final Testament"
          className="rounded-full"
          width={50}
          height={50}
        />
        <h1 className="text-3xl font-semibold">Quran: The Final Testament</h1>
        <p className="text-muted-foreground text-sm">
          English Translation by Dr. Rashad Khalifa, Ph.D.
        </p>
      </section>

      <section className="space-y-4 text-center">
        <section className="flex flex-wrap text-xs justify-between items-center">
          {/* Left */}
          <div className="flex gap-2">
            <Link
              href="https://library.wikisubmission.org/file/quran-the-final-testament"
              target="_blank"
            >
              <Button variant="default" size="sm">
                Full PDF
              </Button>
            </Link>
            <Link
              href="https://library.wikisubmission.org/file/quran-the-final-testament-introduction"
              target="_blank"
            >
              <Button variant="outline" size="sm">
                Introduction
              </Button>
            </Link>
          </div>
          {/* Right */}
          <div>
            <Button
              variant="special"
              size="sm"
              onClick={() =>
                setChapterDisplayOrder(
                  chapterDisplayOrder === "revelation"
                    ? "standard"
                    : "revelation",
                )
              }
            >
              Order:{" "}
              {chapterDisplayOrder === "revelation" ? "Standard" : "Revelation"}
            </Button>
          </div>
        </section>
        <div className="grid md:grid-cols-2 gap-2">
          {Data.Chapters.sort((a, b) => {
            if (chapterDisplayOrder === "revelation") {
              return a.chapter_revelation_order - b.chapter_revelation_order;
            }
            return a.chapter_number - b.chapter_number;
          }).map((chapter) => (
            <Link
              key={chapter.chapter_number}
              href={`/quran/${chapter.chapter_number}`}
              className="block"
            >
              <Card className="transition hover:shadow-md hover:ring-1 hover:ring-muted-foreground/20 cursor-pointer hover:text-violet-500 dark:hover:text-violet-400">
                <CardHeader>
                  <CardTitle>
                    Chapter {chapter.chapter_number},{" "}
                    <span className="font-bold">
                      {chapter.chapter_title_english}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {chapter.chapter_title_transliterated} •{" "}
                    {chapter.chapter_verses} verses
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
