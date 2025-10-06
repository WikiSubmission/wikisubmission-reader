"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { QuranPageStore } from "@/hooks/use-quran-page";
import { useQuranSettings } from "@/hooks/use-quran-settings";
import { SelectContent } from "@radix-ui/react-select";
import { SettingsIcon } from "lucide-react";

export default function QuranSettingsButton() {
  const useSettings = useQuranSettings();
  const { language, setLanguage } = QuranPageStore();
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            className="flex h-6 items-center gap-1 rounded-md px-2 text-xs text-primary transition hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800"
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
                  useSettings.setShowSubtitles(!useSettings.settings.showSubtitles);
                }}
              ></Switch>
              <Badge variant="secondary">Subtitles</Badge>
            </section>
            <section className="flex items-center justify-between">
              <Switch
                checked={useSettings.settings.showFootnotes}
                onCheckedChange={() => {
                  useSettings.setShowFootnotes(!useSettings.settings.showFootnotes);
                }}
              ></Switch>
              <Badge variant="secondary">Footnotes</Badge>
            </section>
            <section className="flex items-center justify-between">
              <Switch
                checked={useSettings.settings.showTransliteration}
                onCheckedChange={() => {
                  useSettings.setShowTransliteration(!useSettings.settings.showTransliteration);
                }}
              ></Switch>
              <Badge variant="secondary">Transliteration</Badge>
            </section>
            <section className="flex items-center justify-between">
              <Switch
                checked={useSettings.settings.showWordByWord}
                onCheckedChange={() => {
                  useSettings.setShowWordByWord(!useSettings.settings.showWordByWord);
                }}
              ></Switch>
              <Badge variant="secondary">Word by Word</Badge>
            </section>
            <section>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue defaultValue={"english"} />
                </SelectTrigger>
                <SelectContent className="w-sm bg-background">
                  <SelectItem value={"english"}>English</SelectItem>
                  <SelectItem value={"turkish"}>Turkish</SelectItem>
                  <SelectItem value={"french"}>French</SelectItem>
                  <SelectItem value={"german"}>German</SelectItem>
                  <SelectItem value={"bahasa"}>Bahasa</SelectItem>
                  <SelectItem value={"persian"}>Persian</SelectItem>
                  <SelectItem value={"tamil"}>Tamil</SelectItem>
                  <SelectItem value={"swedish"}>Swedish</SelectItem>
                  <SelectItem value={"russian"}>Russian</SelectItem>
                  <SelectItem value={"bengali"}>Bengali</SelectItem>
                </SelectContent>
              </Select>
              {/* <Badge variant="secondary">Language</Badge> */}
            </section>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
