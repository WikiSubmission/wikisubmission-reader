import { WQuranVerse } from "@/types/w-quran";
import VerseCardClient from "./verse-card-client";
import { WResult } from "@/types/w-result";
import { Languages } from "@/hooks/use-quran-page";

export default function VerseCard({
  verse,
  type,
  language,
}: {
  verse: WQuranVerse;
  type: WResult["request"]["type"];
  language: Languages;
}) {
  return (
    <main id={verse.verse_id}>
      <VerseCardClient verse={verse} type={type} language={language} />
    </main>
  );
}
