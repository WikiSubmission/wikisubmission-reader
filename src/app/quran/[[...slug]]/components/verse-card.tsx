import { WQuranVerse } from "@/types/w-quran";
import VerseCardClient from "./verse-card-client";

export default function VerseCard({ verse }: { verse: WQuranVerse }) {
  return (
    <main>
      <VerseCardClient verse={verse} />
    </main>
  );
}
