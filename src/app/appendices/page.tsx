import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Data } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";

export default function QuranPage() {
  return (
    <main className="space-y-4">
      <div className="flex flex-col items-center gap-4 mb-6">
        <Image
          src="/brand-assets/logo-black.png"
          alt="WikiSubmission Logo"
          width={64}
          height={64}
          className="rounded-full"
        />
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Appendices</h1>
          <p className="text-sm text-muted-foreground">From Quran: The Final Testament</p>
        </div>
      </div>

      <section className="flex flex-wrap gap-4 justify-between items-center">
        <Link
          href="https://library.wikisubmission.org/file/quran-the-final-testament-appendices"
          target="_blank"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          Download All (PDF)
          <ExternalLink className="size-3" />
        </Link>
        <Link href="/downloads" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          All Downloads →
        </Link>
      </section>

      <section className="flex flex-col gap-4">
        {Data.Appendices.map((d) => (
          <Item asChild variant="outline" key={`appendix-${d.appendix_number}`}>
            <Link
              href={`https://wikisubmission.org/appendix/${d.appendix_number}`}
              target="_blank"
            >
              <ItemContent>
                <ItemTitle>
                  {d.appendix_number}. {d.appendix_title_english}
                </ItemTitle>
                <ItemDescription>
                  {d.appendix_preview_english}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <ChevronRight className="size-4" />
              </ItemActions>
            </Link>
          </Item>
        ))}
      </section>
    </main>
  );
}
