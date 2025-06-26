"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { WQuranVerse } from "@/types/w-quran";
import { Separator } from "@/components/ui/separator";
import { WResult } from "@/types/w-result";
import VerseId from "./verse-components/verse-id";
import VerseTextPrimary from "./verse-components/verse-text-primary";
import VerseTextArabic from "./verse-components/verse-text-arabic";
import VerseTextTransliterated from "./verse-components/verse-text-transliterated";
import VerseSubtitle from "./verse-components/verse-subtitle";
import VerseFootnote from "./verse-components/verse-footnote";
import CopyVerseButton from "./verse-buttons/copy-verse-button";
import PlayVerseButton from "./verse-buttons/play-verse-button";
import ContextButton from "./verse-buttons/context-button";

export default function VerseCardClient({
  verse,
  type,
}: {
  verse: WQuranVerse;
  type: WResult["request"]["type"];
}) {
  const [hovering, setHovering] = useState(false);

  return (
    <Card
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <CardHeader className="relative">
        <section className="flex items-center justify-between">
          {/* Verse ID */}
          <VerseId verse={verse} />
          {/* Buttons: shows only on hover */}
          {hovering && (
            <div className="flex gap-2">
              <ContextButton verse={verse} type={type} />
              <PlayVerseButton verse={verse} />
              <CopyVerseButton verse={verse} />
            </div>
          )}
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
        </section>
      </CardContent>
    </Card>
  );
}
