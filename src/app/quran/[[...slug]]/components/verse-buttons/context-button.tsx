import { Button } from "@/components/ui/button";
import { WQuranVerse } from "@/types/w-quran";
import { WResult } from "@/types/w-result";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ContextButton({
  verse,
  type,
}: {
  verse: WQuranVerse;
  type: WResult["request"]["type"];
}) {
  if (
    type === "verse" ||
    type === "verse_range" ||
    type === "search" ||
    type === "multiple_verses"
  ) {
    return (
      <Link href={`${verse.chapter_number}?verse=${verse.verse_number}`}>
        <Button
          variant="secondary"
          size="sm"
          className="justify-start gap-1 text-xs h-6 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition text-muted-foreground hover:text-foreground"
        >
          <ArrowUpRight className="w-3 h-3 text-violet-700 dark:text-violet-400" />
        </Button>
      </Link>
    );
  }
}
