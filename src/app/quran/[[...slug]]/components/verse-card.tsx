import { WQuranVerse } from "@/types/w-quran";
import VerseCardClient from "./verse-card-client";
import { WResult } from "@/types/w-result";

export default function VerseCard({ verse, type }: { verse: WQuranVerse, type: WResult["request"]["type"] }) {
  return (
    <main id={verse.verse_id}>
      <VerseCardClient verse={verse} type={type} />
    </main>
  );
}
