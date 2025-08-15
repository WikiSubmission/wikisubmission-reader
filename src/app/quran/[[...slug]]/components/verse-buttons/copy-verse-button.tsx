"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { WQuranVerse } from "@/types/w-quran";
import { useQuranSettings } from "@/hooks/use-quran-settings";

interface CopyVerseButtonProps {
  verse: WQuranVerse;
}

export default function CopyVerseButton({ verse }: CopyVerseButtonProps) {
  const [copied, setCopied] = useState(false);
  const quranSettings = useQuranSettings();

  const copyToClipboard = async () => {
    try {
      var verseText = "";

      if (quranSettings.settings.showSubtitles && verse.verse_subtitle_english) {
        verseText += `\n\n${verse.verse_subtitle_english}`;
      }

      verseText += `[${verse.verse_id}] ${verse.verse_text_english}`;

      if (quranSettings.settings.showArabic) {
        verseText += `\n\n${verse.verse_text_arabic}`;
      }

      if (quranSettings.settings.showTransliteration) {
        verseText += `\n\n${verse.verse_text_transliterated}`;
      }

      if (quranSettings.settings.showFootnotes && verse.verse_footnote_english) {
        verseText += `\n\n${verse.verse_footnote_english}`;
      }

      await navigator.clipboard.writeText(verseText);
      setCopied(true);

      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy verse:", err);
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      className="h-6 justify-start gap-1 rounded-md px-2 text-xs text-muted-foreground transition hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800"
      onClick={copyToClipboard}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied!" : ""}
    </Button>
  );
}
