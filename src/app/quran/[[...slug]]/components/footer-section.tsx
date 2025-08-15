import { Button } from "@/components/ui/button";
import { WQuranAPIResponse } from "@/types/w-quran";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function FooterSection({ result }: { result: WQuranAPIResponse }) {
  const isSingleVerse = result.response.data.length === 1;
  const isChapter = result.request.type === "chapter";
  return (
    <main className="py-6">
      {isSingleVerse && (
        <section className="flex justify-center gap-2">
          <Link href={`/quran/${result.response.data[0].chapter_number}`}>
            <Button variant="secondary" className="gap-1 rounded-full">
              Chapter {result.response.data[0].chapter_number}
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href={`/quran/${result.response.data[0].chapter_number}?verse=${result.response.data[0].verse_number}`}
          >
            <Button variant="secondary" className="gap-1 rounded-full">
              {result.response.data[0].verse_id} context
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
        </section>
      )}
      {isChapter && (
        <section className="flex justify-between gap-2">
          {result.response.data[0].chapter_number > 1 && (
            <Link href={`/quran/${result.response.data[0].chapter_number - 1}`}>
              <Button variant="secondary" className="gap-1 rounded-full">
                <ArrowLeftIcon className="h-4 w-4" />
                Previous chapter
              </Button>
            </Link>
          )}

          {result.response.data[0].chapter_number < 114 && (
            <Link href={`/quran/${result.response.data[0].chapter_number + 1}`}>
              <Button variant="secondary" className="gap-1 rounded-full">
                Next chapter
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </section>
      )}
    </main>
  );
}
