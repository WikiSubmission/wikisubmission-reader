import { BookmarkInjectedType, BookmarkType, WBookmarkQuranAPIResponse } from "@/types/bookmarks";
import { WQuranAPIResponse, WQuranVerse } from "@/types/w-quran";
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

interface QuranPageStoreInterface {
  query: string;
  setQuery: (newText: string) => void;

  _hasHydrated: boolean;
}

const initialState: Omit<QuranPageStoreInterface, "setQuery"> = {
  query: "",
  _hasHydrated: false,
};

export const QuranPageStore = create<QuranPageStoreInterface>()(
  persist(
    (set) => ({
      ...initialState,
      setQuery: (newText) => set({ query: newText }),
    }),
    {
      name: "quran-page-store",
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
