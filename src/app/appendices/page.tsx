import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Fonts } from "@/constants/fonts";
import { Data } from "@/data";
import Link from "next/link";

export default function QuranPage() {
  return (
    <main className="space-y-4">
      <h1
        className={`flex flex-col text-3xl font-light text-primary ${Fonts.wiki.className}`}
      >
        <span className="text-sm text-muted-foreground tracking-widest">
          APPENDICES FROM
        </span>
        Quran: The Final Testament
      </h1>
      <div className="flex flex-wrap gap-2 justify-between">
        <section className="flex gap-2">
          <Link
            href="https://library.wikisubmission.org/file/quran-the-final-testament-appendices"
            target="_blank"
          >
            <Button size="sm" variant="default" className="w-fit">
              Appendices 1 → 38 (PDF)
            </Button>
          </Link>
        </section>

        <section className="flex gap-2">
          <Link href="/downloads">
            <Button size="sm" variant="secondary" className="w-fit">
              All Downloads
            </Button>
          </Link>
        </section>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Data.Appendices.map((d) => (
          <Link
            href={`https://wikisubmission.org/appendix/${d.appendix_number}`}
            target="_blank"
            key={`appendix-${d.appendix_number}`}
            className="group hover:scale-[1.01] transition-transform"
          >
            <Card className="h-full transition-colors">
              <CardHeader>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {d.appendix_number}. {d.appendix_title_english} →
                </CardTitle>
                <CardDescription className="mt-2 line-clamp-3">
                  {d.appendix_preview_english}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  );
}
