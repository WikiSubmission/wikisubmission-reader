import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { WQuranVerse } from "@/types/w-quran";
import { Separator } from "@/components/ui/separator";
import VerseId from "./verse-components/verse-id";
import VerseTextPrimary from "./verse-components/verse-text-primary";
import VerseTextArabic from "./verse-components/verse-text-arabic";
import VerseTextTransliterated from "./verse-components/verse-text-transliterated";
import VerseWordByWord from "./verse-components/verse-word-by-word";
import VerseSubtitle from "./verse-components/verse-subtitle";
import VerseFootnote from "./verse-components/verse-footnote";

export default function VerseCard({ verse }: { verse: WQuranVerse }) {
  return (
    <Card id={verse.verse_id}>
      <CardHeader>
        {/* Verse ID */}
        <section className="flex items-center justify-between">
          <VerseId verse={verse} />
        </section>
      </CardHeader>
      <CardContent>
        <section className="space-y-4">
          {/* Subtitle */}
          <VerseSubtitle verse={verse} />
          {/* Primary Text */}
          <VerseTextPrimary verse={verse} />
          {/* Line Separator */}
          <Separator />
          {/* Arabic Text */}
          <VerseTextArabic verse={verse} />
          {/* Transliteration */}
          <VerseTextTransliterated verse={verse} />
          {/* Footnote */}
          <VerseFootnote verse={verse} />
          {/* Word-by-word */}
          <VerseWordByWord verse={verse} />
        </section>
      </CardContent>
      {/* <CardFooter> */}
      {/* TODO */}
      {/* </CardFooter> */}
    </Card>
  );
}
