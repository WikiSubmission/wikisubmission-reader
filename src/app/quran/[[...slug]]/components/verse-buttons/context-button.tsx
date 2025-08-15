import { Button } from "@/components/ui/button";
import { WQuranVerse } from "@/types/w-quran";
import { WResult } from "@/types/w-result";
import { CircleArrowOutUpRight, Link2Icon } from "lucide-react";
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
          className="h-6 justify-start gap-1 rounded-md px-2 text-xs text-muted-foreground transition hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800"
        >
          <CircleArrowOutUpRight className="h-3 w-3 text-violet-700 dark:text-violet-400" />
        </Button>
      </Link>
    );
  }
}
