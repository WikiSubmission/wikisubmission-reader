"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { useQuranSettings } from "@/hooks/use-quran-settings";
import { SettingsIcon } from "lucide-react";

export default function QuranSettingsButton() {
  const useSettings = useQuranSettings();
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-1 text-xs h-6 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition text-primary hover:text-foreground"
          >
            <SettingsIcon className="h-3 w-3 text-violet-500 dark:text-violet-700" />
            <span className="text-xs">Settings</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <section className="flex items-center justify-between">
              <Switch
                checked={useSettings.settings.showArabic}
                onCheckedChange={() => {
                  useSettings.setShowArabic(!useSettings.settings.showArabic);
                }}
              ></Switch>
              <Badge variant="secondary">Arabic</Badge>
            </section>
            <section className="flex items-center justify-between">
              <Switch
                checked={useSettings.settings.showSubtitles}
                onCheckedChange={() => {
                  useSettings.setShowSubtitles(
                    !useSettings.settings.showSubtitles,
                  );
                }}
              ></Switch>
              <Badge variant="secondary">Subtitles</Badge>
            </section>
            <section className="flex items-center justify-between">
              <Switch
                checked={useSettings.settings.showFootnotes}
                onCheckedChange={() => {
                  useSettings.setShowFootnotes(
                    !useSettings.settings.showFootnotes,
                  );
                }}
              ></Switch>
              <Badge variant="secondary">Footnotes</Badge>
            </section>
            <section className="flex items-center justify-between">
              <Switch
                checked={useSettings.settings.showTransliteration}
                onCheckedChange={() => {
                  useSettings.setShowTransliteration(
                    !useSettings.settings.showTransliteration,
                  );
                }}
              ></Switch>
              <Badge variant="secondary">Transliteration</Badge>
            </section>
            <section className="flex items-center justify-between">
              <Switch
                checked={useSettings.settings.showWordByWord}
                onCheckedChange={() => {
                  useSettings.setShowWordByWord(
                    !useSettings.settings.showWordByWord,
                  );
                }}
              ></Switch>
              <Badge variant="secondary">Word by Word</Badge>
            </section>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
