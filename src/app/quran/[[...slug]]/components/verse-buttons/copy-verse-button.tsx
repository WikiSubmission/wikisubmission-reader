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

      if (
        quranSettings.settings.showSubtitles &&
        verse.verse_subtitle_english
      ) {
        verseText += `\n\n${verse.verse_subtitle_english}`;
      }

      verseText += `[${verse.verse_id}] ${verse.verse_text_english}`;

      if (quranSettings.settings.showArabic) {
        verseText += `\n\n${verse.verse_text_arabic}`;
      }

      if (quranSettings.settings.showTransliteration) {
        verseText += `\n\n${verse.verse_text_transliterated}`;
      }

      if (
        quranSettings.settings.showFootnotes &&
        verse.verse_footnote_english
      ) {
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
      className="justify-start gap-1 text-xs h-6 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition text-muted-foreground hover:text-foreground"
      onClick={copyToClipboard}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied!" : "Copy Text"}
    </Button>
  );
}
