"use client";

import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { WQuranVerse } from "@/types/w-quran";
import { useQuranAudio } from "@/hooks/use-quran-audio";

interface PlayAllButtonProps {
  verses: WQuranVerse[];
}

export default function PlayAllButton({ verses }: PlayAllButtonProps) {
  const audio = useQuranAudio();

  const isCurrentQueue =
    audio.isQueueMode && audio.verseQueue.length === verses.length;
  const isPlaying = isCurrentQueue && audio.isPlaying;

  const handlePlayAll = () => {
    if (isCurrentQueue && isPlaying) {
      // If currently playing this queue, pause it
      audio.pauseAudio();
    } else {
      // Always start a new queue (cancels any existing queue)
      audio.playQueue(verses, 0);
    }
  };

  const getIcon = () => {
    if (isPlaying) return <Pause className="w-3 h-3" />;
    return <Play className="h-3 w-3 text-violet-500 dark:text-violet-700" />;
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      className="justify-start gap-1 text-xs h-6 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition text-primary hover:text-foreground"
      onClick={handlePlayAll}
    >
      {getIcon()}
    </Button>
  );
}
