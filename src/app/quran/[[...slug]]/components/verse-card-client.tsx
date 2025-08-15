"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { WQuranVerse } from "@/types/w-quran";
import { Separator } from "@/components/ui/separator";
import { WResult } from "@/types/w-result";
import { useQuranSettings } from "@/hooks/use-quran-settings";
import VerseId from "./verse-components/verse-id";
import VerseTextPrimary from "./verse-components/verse-text-primary";
import VerseTextArabic from "./verse-components/verse-text-arabic";
import VerseTextTransliterated from "./verse-components/verse-text-transliterated";
import VerseSubtitle from "./verse-components/verse-subtitle";
import VerseFootnote from "./verse-components/verse-footnote";
import CopyVerseButton from "./verse-buttons/copy-verse-button";
import PlayVerseButton from "./verse-buttons/play-verse-button";
import ContextButton from "./verse-buttons/context-button";
import BookmarkVerseButton from "./verse-buttons/bookmark-verse-button";

export default function VerseCardClient({
  verse,
  type,
  styling,
}: {
  verse: WQuranVerse;
  type: WResult["request"]["type"];
  styling?: string;
}) {
  const [hovering, setHovering] = useState(false);
  const settings = useQuranSettings();

  const getCardStyling = () => {
    switch (styling) {
      case "bookmark":
        return "bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200/50 dark:border-amber-700/50 shadow-lg";
      default:
        return "";
    }
  };

  return (
    <Card
      className={`h-full ${getCardStyling()}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <CardHeader className="relative">
        <section className="flex items-center justify-between">
          {/* Verse ID */}
          <VerseId verse={verse} />
          {/* Buttons: shows only on hover */}

          <div
            className={`duration flex transform gap-2 transition-all ease-in-out ${hovering ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
          >
            <ContextButton verse={verse} type={type} />
            <BookmarkVerseButton verse={verse} />
            <PlayVerseButton verse={verse} />
            <CopyVerseButton verse={verse} />
          </div>
        </section>
      </CardHeader>
      <CardContent>
        <section className="space-y-4">
          {/* Subtitle */}
          <VerseSubtitle verse={verse} />
          {/* Primary Text */}
          <VerseTextPrimary verse={verse} />
          {/* Line Separator */}
          {settings.settings.showArabic && <Separator />}
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
