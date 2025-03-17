import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import QuranSearchbar from "./_searchbar";
import { Database } from "@/types/generated/database.types";

export default async function QuranPage({
  params,
  searchParams,
}: {
  params: { request: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const request = await fetch(
    `https://api.wikisubmission.org/quran/data/chapters`,
  );
  const DataQuranChapters =
    (await request.json()) as Database["public"]["Tables"]["DataQuran"]["Row"][];
  return (
    <ContentLayout title="Quran: The Final Testament">
      <div className="flex flex-col space-y-8">
        <section className="md:w-4/6">
          <QuranSearchbar />
        </section>
        <section className="space-y-2">
          <h1 className="text-3xl">Browse</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DataQuranChapters.filter((q) => q.verse_number === 1).map((d) => {
              return (
                <Link
                  key={`${d.chapter_number}`}
                  href={`/dashboard/quran/reader/chapter/${d.chapter_number}`}
                >
                  <Card
                    key={d.verse_id}
                    className="w-full h-full flex flex-col justify-between min-h-[100px]"
                  >
                    <CardHeader className="flex flex-col flex-grow">
                      <CardTitle>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-2xl">
                            Sura {d.chapter_number}
                          </span>
                          <ChevronRight />
                        </div>
                      </CardTitle>
                      <CardDescription className="flex-grow">
                        <div className="text-lg flex justify-between items-center">
                          <span>
                            {d.chapter_title_english} (
                            {d.chapter_title_arabic_transliteration})
                          </span>
                          <span>{d.chapter_title_arabic}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </ContentLayout>
  );
}
