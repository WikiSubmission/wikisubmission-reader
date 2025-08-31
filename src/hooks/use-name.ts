import { AutocompleteItem } from "@/app/attributes/components/auto-complete-input";
import { NAMES_OF_GOD } from "@/app/attributes/data";
import {
  DEFAULT_LANGUAGES,
  DEFAULT_VIEWS,
  GodAttributesCardDataType,
  Languages,
  Views,
} from "@/app/attributes/types";
import { set } from "zod";
import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";

const createMemoryStorage = (): StateStorage => {
  let store: Record<string, string> = {};
  return {
    getItem: (name: string) => (name in store ? store[name] : null),
    setItem: (name: string, value: string) => {
      store[name] = value;
    },
    removeItem: (name: string) => {
      delete store[name];
    },
  };
};

const getSafeStorage = (): StateStorage => {
  if (typeof window === "undefined") return createMemoryStorage();
  try {
    const test = "__zustand_test__";
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    // Wrap localStorage to satisfy StateStorage shape explicitly
    return {
      getItem: (name) => window.localStorage.getItem(name),
      setItem: (name, value) => window.localStorage.setItem(name, value),
      removeItem: (name) => window.localStorage.removeItem(name),
    };
  } catch {
    // iOS Safari private mode or blocked storage
    return createMemoryStorage();
  }
};

interface NamesOfGodType {
  _hasHydrated: boolean;
  extraInfoType: "article" | "gematria" | "verse-list";
  showGematria: boolean;
  selectedCardGrid: GodAttributesCardDataType | null;
  setSelectedCardGrid: (card: GodAttributesCardDataType | null) => void;
  toggleSelectedCardGrid: (card: GodAttributesCardDataType | null) => void;

  currentLanguage: Languages;
  setCurrentLanguage: (language: Languages) => void;
  handleCyclingLanguages: () => void;

  currentView: Views;
  setCurrentView: (view: Views) => void;
  handleCyclingViews: () => void;
  getRecents(key: string): AutocompleteItem[];
  addRecent(key: string, item: AutocompleteItem): void;
  recents?: Record<string, AutocompleteItem[]>;

  data: GodAttributesCardDataType[];
  applyFilter: (text: string) => void;

  activeCard: number | null;
  setActiveCard: (card: number | null) => void;
}

const initialState: Omit<
  NamesOfGodType,
  | "setSelectedCardGrid"
  | "toggleSelectedCardGrid"
  | "setCurrentLanguage"
  | "handleCyclingLanguages"
  | "setCurrentView"
  | "handleCyclingViews"
  | "addRecent"
  | "getRecents"
  | "applyFilter"
  | "setActiveCard"
> = {
  _hasHydrated: false,
  extraInfoType: "article",
  showGematria: false,
  selectedCardGrid: null,
  currentLanguage: "ENGLISH",
  currentView: "carousel",
  recents: {},
  data: NAMES_OF_GOD,
  activeCard: 0,
};

export const NameStore = create<NamesOfGodType>()(
  persist(
    (set, get) => ({
      ...initialState,
      setActiveCard: (card) => {
        set({ activeCard: card });
      },
      applyFilter: (text: string) => {
        const filteredData = get().data.filter((item) =>
          item.text
            .find((subitem) => subitem.language === get().currentLanguage)
            ?.text.toLowerCase()
            .includes(text.toLowerCase())
        );
        set((state) => ({
          ...state,
          data: filteredData,
        }));
      },
      getRecents: (key: string): AutocompleteItem[] => {
        try {
          const recents = get().recents || {};
          const items = recents[key];
          return Array.isArray(items) ? items.slice(0, 8) : [];
        } catch {
          return [];
        }
      },

      addRecent: (key: string, item: AutocompleteItem) => {
        try {
          const current = get().recents || {};
          const existing = current[key] || [];

          // Remove if already exists, then add to front
          const filtered = existing.filter((r: AutocompleteItem) => r.id !== item.id);
          const updated = [item, ...filtered].slice(0, 12); // Keep max 12 items

          set((state) => ({
            recents: {
              ...state.recents,
              [key]: updated,
            },
          }));
        } catch {
          // ignore errors
        }
      },
      handleCyclingViews: () => {
        const currentIndex = DEFAULT_VIEWS.indexOf(get().currentView);
        const nextIndex = (currentIndex + 1) % DEFAULT_VIEWS.length;
        set({ currentView: DEFAULT_VIEWS[nextIndex] });
      },
      setCurrentView: (view) => set({ currentView: view }),
      handleCyclingLanguages: () => {
        const currentIndex = DEFAULT_LANGUAGES.indexOf(get().currentLanguage);
        const nextIndex = (currentIndex + 1) % DEFAULT_LANGUAGES.length;
        set({ currentLanguage: DEFAULT_LANGUAGES[nextIndex] });
      },
      setCurrentLanguage: (language) => set({ currentLanguage: language }),
      setSelectedCardGrid: (card) => set({ selectedCardGrid: card }),
      toggleSelectedCardGrid: (card) => {
        if (
          card?.text.find((c) => c.language === "ENGLISH")?.text ===
          get().selectedCardGrid?.text.find((c) => c.language === "ENGLISH")?.text
        ) {
          set({ selectedCardGrid: null });
        } else {
          set({ selectedCardGrid: card });
        }
      },
    }),
    {
      name: "name-store",
      storage: createJSONStorage(getSafeStorage),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error("Zustand persist rehydrate error:", error);
            return;
          }
          if (state) state._hasHydrated = true;
        };
      },
    }
  )
);
