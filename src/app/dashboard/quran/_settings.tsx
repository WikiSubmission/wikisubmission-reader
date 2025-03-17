"use client";

import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useQuranSettings } from "@/hooks/use-quran-settings";

export default function QuranSettings() {
  const useSettings = useQuranSettings();
  return (
    <>
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
            useSettings.setShowWordByWord(!useSettings.settings.showWordByWord);
          }}
        ></Switch>
        <Badge variant="secondary">Word by Word</Badge>
      </section>
    </>
  );
}
