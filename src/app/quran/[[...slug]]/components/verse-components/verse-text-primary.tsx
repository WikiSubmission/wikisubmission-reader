import { WQuranVerse } from "@/types/w-quran";
import { highlightMarkdown } from "@/utils/highlight-markdown";

export default function VerseTextPrimary({ verse }: { verse: WQuranVerse }) {
  return (
    <section>
      <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
        {highlightMarkdown(verse.verse_text_english)}
      </p>
    </section>
  );
}
