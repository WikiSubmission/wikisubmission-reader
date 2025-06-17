import { WQuranVerse } from "@/types/w-quran";
import VerseCardClient from "./verse-card-client";

export default function VerseCard({ verse }: { verse: WQuranVerse }) {
  return (
    <main id={verse.verse_id}>
      <VerseCardClient verse={verse} />
    </main>
  );
}
