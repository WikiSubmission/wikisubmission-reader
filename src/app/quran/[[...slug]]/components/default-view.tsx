import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Data } from "@/data";
import Link from "next/link";

export default function DefaultView() {
  return (
    <main className="container px-4 pt-5 space-y-10">
      <section className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Quran: The Final Testament</h1>
        <p className="text-muted-foreground">
          Search and explore the verses of the Quran
        </p>
      </section>

      <section className="space-y-4 text-center">
        <section className="space-y-2 grid md:grid-cols-2">
          <Link
            href="https://library.wikisubmission.org/file/quran-the-final-testament-introduction"
            target="_blank"
          >
            <Button variant="outline" className="w-full md:w-3/6">
              Introduction
            </Button>
          </Link>
          <Link
            href="https://library.wikisubmission.org/file/quran-the-final-testament"
            target="_blank"
          >
            <Button variant="default" className="w-full md:w-3/6">
              PDF
            </Button>
          </Link>
        </section>
        <div className="grid md:grid-cols-2 gap-2">
          {Data.Chapters.map((chapter) => (
            <Link
              key={chapter.chapter_number}
              href={`/quran/${chapter.chapter_number}`}
              className="block"
            >
              <Card className="transition hover:shadow-md hover:ring-1 hover:ring-muted-foreground/20 cursor-pointer">
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
