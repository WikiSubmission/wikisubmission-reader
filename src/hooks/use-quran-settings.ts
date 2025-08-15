import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { produce } from "immer";

// Define the settings types
type QuranSettings = {
  language: string;
  showWordByWord: boolean;
  showArabic: boolean;
  showTransliteration: boolean;
  showSubtitles: boolean;
  showFootnotes: boolean;
};

type QuranSettingsStore = {
  settings: QuranSettings;
  setLanguage: (language: string) => void;
  setShowWordByWord: (show: boolean) => void;
  setShowArabic: (show: boolean) => void;
  setShowSubtitles: (show: boolean) => void;
  setShowFootnotes: (show: boolean) => void;
  setShowTransliteration: (show: boolean) => void;
  setSettings: (settings: Partial<QuranSettings>) => void;
};

export const useQuranSettings = create(
  persist<QuranSettingsStore>(
    (set, get) => ({
      settings: {
        language: "english",
        showWordByWord: false,
        showArabic: true,
        showTransliteration: false,
        showSubtitles: true,
        showFootnotes: true,
      }, // Default settings
      setLanguage: (language: string) => {
        set({ settings: { ...get().settings, language } });
      },
      setShowArabic: (show: boolean) => {
        set({ settings: { ...get().settings, showArabic: show } });
      },
      setShowSubtitles: (show: boolean) => {
        set({ settings: { ...get().settings, showSubtitles: show } });
      },
      setShowFootnotes: (show: boolean) => {
        set({ settings: { ...get().settings, showFootnotes: show } });
      },
      setShowTransliteration: (show: boolean) => {
        set({ settings: { ...get().settings, showTransliteration: show } });
      },
      setShowWordByWord: (show: boolean) => {
        set({ settings: { ...get().settings, showWordByWord: show } });
      },
      setSettings: (settings: Partial<QuranSettings>) => {
        set(
          produce((state: QuranSettingsStore) => {
            state.settings = { ...state.settings, ...settings };
          })
        );
      },
    }),
    {
      name: "quran-settings", // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Using localStorage for persistence
    }
  )
);
