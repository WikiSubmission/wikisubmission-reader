"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  X,
  ChevronDown,
} from "lucide-react";
import { useQuranAudio, QuranReciter } from "@/hooks/use-quran-audio";
import { useQuranUrlSync } from "@/hooks/use-quran-url-sync";
import Link from "next/link";

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export default function AudioPlayer() {
  const audio = useQuranAudio();

  // Enable URL sync when verses change during playback
  useQuranUrlSync();

  if (!audio.currentVerse) {
    return null;
  }

  const handlePlayPause = () => {
    if (audio.isPlaying) {
      audio.pauseAudio();
    } else {
      audio.resumeAudio();
    }
  };

  const handleSeek = (value: number[]) => {
    audio.seekTo(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    audio.setVolume(value[0] / 100);
  };

  const handleReciterChange = async (reciter: QuranReciter) => {
    await audio.setReciter(reciter);
  };

  const getReciterDisplayName = (reciter: QuranReciter) => {
    switch (reciter) {
      case "mishary":
        return "Mishary";
      case "basit":
        return "Basit";
      case "minshawi":
        return "Al-Minshawi";
      default:
        return reciter;
    }
  };

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-96 lg:w-[28rem] z-50 shadow-lg border-2">
      <CardContent className="p-3">
        <div className="space-y-2">
          {/* Header: Verse info + Controls */}
          <div className="flex items-center justify-between gap-3">
            <Link
              href={`/quran/${audio.currentVerse.chapter_number}?verse=${audio.currentVerse.verse_number}`}
            >
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate hover:text-violet-500 dark:hover:text-violet-700">
                  {audio.currentVerse.chapter_title_english}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {audio.currentVerse.chapter_title_transliterated} •{" "}
                  {audio.currentVerse.verse_id}
                </div>
              </div>
            </Link>

            {/* Right side controls */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Navigation controls (when in queue) */}
              {audio.isQueueMode && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={audio.previousVerse}
                  disabled={audio.currentQueueIndex <= 0}
                  className="h-8 w-8 p-0"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
              )}

              {/* Play/Pause */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePlayPause}
                disabled={audio.isLoading}
                className="h-9 w-9 p-0"
              >
                {audio.isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>

              {audio.isQueueMode && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={audio.nextVerse}
                  disabled={
                    audio.currentQueueIndex >= audio.verseQueue.length - 1
                  }
                  className="h-8 w-8 p-0"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              )}

              {/* Reciter selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs px-2 ml-1"
                  >
                    {getReciterDisplayName(audio.settings.reciter)}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={4}>
                  <DropdownMenuItem
                    onClick={() => handleReciterChange("mishary")}
                  >
                    Mishary
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleReciterChange("basit")}
                  >
                    Basit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleReciterChange("minshawi")}
                  >
                    Al-Minshawi
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Close button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={audio.stopAudio}
                className="h-7 w-7 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground min-w-[32px] text-right">
              {formatTime(audio.currentTime)}
            </span>
            <div
              className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = clickX / rect.width;
                const newTime = percentage * (audio.duration || 0);
                handleSeek([newTime]);
              }}
            >
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-200"
                style={{
                  width: `${audio.duration ? (audio.currentTime / audio.duration) * 100 : 0}%`,
                }}
              />
            </div>
            <span className="text-xs text-muted-foreground min-w-[32px]">
              {formatTime(audio.duration)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
