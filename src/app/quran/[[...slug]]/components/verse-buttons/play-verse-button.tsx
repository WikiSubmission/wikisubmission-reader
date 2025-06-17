"use client";

import { Button } from "@/components/ui/button";
import { Play, Pause, Loader2 } from "lucide-react";
import { WQuranVerse } from "@/types/w-quran";
import { useQuranAudio } from "@/hooks/use-quran-audio";

interface PlayVerseButtonProps {
  verse: WQuranVerse;
}

export default function PlayVerseButton({ verse }: PlayVerseButtonProps) {
  const audio = useQuranAudio();

  const isCurrentVerse = audio.currentVerse?.verse_id === verse.verse_id;
  const isPlaying = isCurrentVerse && audio.isPlaying;
  const isLoading = isCurrentVerse && audio.isLoading;

  const handlePlayPause = () => {
    if (isCurrentVerse) {
      if (isPlaying) {
        audio.pauseAudio();
      } else {
        audio.resumeAudio();
      }
    } else {
      audio.playVerse(verse);
    }
  };

  const getIcon = () => {
    if (isLoading) return <Loader2 className="w-3 h-3 animate-spin" />;
    if (isPlaying) return <Pause className="w-3 h-3" />;
    return <Play className="w-3 h-3" />;
  };

  const getLabel = () => {
    if (isLoading) return "Loading...";
    if (isPlaying) return "Pause";
    return "Play Audio";
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      className="justify-start gap-1 text-xs h-6 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition text-muted-foreground hover:text-foreground"
      onClick={handlePlayPause}
      disabled={isLoading}
    >
      {getIcon()}
      {getLabel()}
    </Button>
  );
}
