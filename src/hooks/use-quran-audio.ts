import { create } from "zustand";
import { WQuranVerse } from "@/types/w-quran";

export type QuranReciter = "mishary" | "basit" | "minshawi";

type QuranAudioSettings = {
  reciter: QuranReciter;
  autoplay: boolean;
  volume: number;
};

type QuranAudioState = {
  // Audio settings
  settings: QuranAudioSettings;

  // Current playback state
  currentVerse: WQuranVerse | null;
  isPlaying: boolean;
  isLoading: boolean;
  duration: number;
  currentTime: number;

  // Queue management
  verseQueue: WQuranVerse[];
  currentQueueIndex: number;
  isQueueMode: boolean;

  // Audio element reference
  audioElement: HTMLAudioElement | null;

  // Callbacks
  onVerseChange: ((verse: WQuranVerse) => void) | null;
};

type QuranAudioActions = {
  // Settings
  setReciter: (reciter: QuranReciter) => Promise<void>;
  setAutoplay: (autoplay: boolean) => void;
  setVolume: (volume: number) => void;

  // Playback controls
  playVerse: (verse: WQuranVerse) => Promise<void>;
  pauseAudio: () => void;
  resumeAudio: () => void;
  stopAudio: () => void;
  seekTo: (time: number) => void;

  // Queue management
  playQueue: (verses: WQuranVerse[], startIndex?: number) => Promise<void>;
  nextVerse: () => Promise<void>;
  previousVerse: () => Promise<void>;
  clearQueue: () => void;

  // Internal state updates
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setAudioElement: (element: HTMLAudioElement | null) => void;

  // Callbacks
  setOnVerseChange: (callback: ((verse: WQuranVerse) => void) | null) => void;
};

type QuranAudioStore = QuranAudioState & QuranAudioActions;

const getAudioUrl = async (verse: WQuranVerse, reciter: QuranReciter): Promise<string | null> => {
  try {
    const verseId = verse.verse_id;

    const response = await fetch(`https://quran.wikisubmission.org/recitations/${verseId}`);

    if (!response.ok) {
      console.error(`Failed to fetch recitation URLs: ${response.status}`);
      return null;
    }

    const data = await response.json();

    // Return the URL for the selected reciter
    return data[reciter] || null;
  } catch (error) {
    console.error("Error fetching audio URL:", error);
    return null;
  }
};

export const useQuranAudio = create<QuranAudioStore>((set, get) => ({
  // Initial state
  settings: {
    reciter: "mishary" as QuranReciter,
    autoplay: false,
    volume: 0.7,
  },
  currentVerse: null,
  isPlaying: false,
  isLoading: false,
  duration: 0,
  currentTime: 0,
  verseQueue: [],
  currentQueueIndex: 0,
  isQueueMode: false,
  audioElement: null,
  onVerseChange: null,

  // Settings actions
  setReciter: async (reciter: QuranReciter) => {
    const state = get();

    // Update the reciter setting
    set((currentState) => ({
      settings: { ...currentState.settings, reciter },
    }));

    // If there's a verse currently playing, restart it with the new reciter
    if (state.currentVerse && state.audioElement) {
      const currentTime = state.audioElement.currentTime;
      const wasPlaying = state.isPlaying;

      // Stop the current audio completely first
      state.audioElement.pause();
      state.audioElement.currentTime = 0;

      // Restart the current verse with the new reciter
      const actions = get();
      await actions.playVerse(state.currentVerse);

      // Restore the playback position and state after audio loads
      setTimeout(() => {
        const newState = get();
        if (newState.audioElement) {
          newState.audioElement.currentTime = currentTime;
          if (wasPlaying) {
            newState.audioElement.play().catch(console.error);
          }
        }
      }, 200); // Small delay to ensure new audio is loaded
    }
  },

  setAutoplay: (autoplay: boolean) => {
    set((state) => ({
      settings: { ...state.settings, autoplay },
    }));
  },

  setVolume: (volume: number) => {
    const state = get();
    if (state.audioElement) {
      state.audioElement.volume = volume;
    }
    set((state) => ({
      settings: { ...state.settings, volume },
    }));
  },

  // Playback actions
  playVerse: async (verse: WQuranVerse) => {
    const state = get();

    // Call the verse change callback immediately, before any async operations
    if (state.onVerseChange) {
      state.onVerseChange(verse);
    }

    // Stop current audio if playing
    if (state.audioElement) {
      state.audioElement.pause();
      state.audioElement.currentTime = 0;
    }

    set({
      currentVerse: verse,
      isLoading: true,
      // Don't reset isQueueMode here - preserve queue state
    });

    try {
      const audioUrl = await getAudioUrl(verse, state.settings.reciter);

      if (!audioUrl) {
        console.error("No audio URL available for verse");
        set({ isLoading: false });
        return;
      }

      // Create new audio element
      const audio = new Audio(audioUrl);
      audio.volume = state.settings.volume;

      audio.addEventListener("loadstart", () => {
        set({ isLoading: true });
      });

      audio.addEventListener("canplay", () => {
        set({ isLoading: false });
      });

      audio.addEventListener("play", () => {
        set({ isPlaying: true });
      });

      audio.addEventListener("pause", () => {
        set({ isPlaying: false });
      });

      audio.addEventListener("ended", async () => {
        const currentState = get();
        if (currentState.isQueueMode) {
          // Always try to move to the next verse in queue mode
          await currentState.nextVerse();
        } else {
          set({ isPlaying: false, currentTime: 0 });
        }
      });

      audio.addEventListener("timeupdate", () => {
        set({ currentTime: audio.currentTime });
      });

      audio.addEventListener("durationchange", () => {
        set({ duration: audio.duration || 0 });
      });

      audio.addEventListener("error", (e) => {
        console.error("Audio playback error:", e);
        set({ isLoading: false, isPlaying: false });
      });

      set({ audioElement: audio });
      audio.play().catch(console.error);
    } catch (error) {
      console.error("Error playing verse:", error);
      set({ isLoading: false });
    }
  },

  pauseAudio: () => {
    const state = get();
    if (state.audioElement) {
      state.audioElement.pause();
    }
  },

  resumeAudio: () => {
    const state = get();
    if (state.audioElement) {
      state.audioElement.play().catch(console.error);
    }
  },

  stopAudio: () => {
    const state = get();
    if (state.audioElement) {
      state.audioElement.pause();
      state.audioElement.currentTime = 0;
    }
    set({
      isPlaying: false,
      currentTime: 0,
      currentVerse: null,
      isLoading: false,
    });
  },

  seekTo: (time: number) => {
    const state = get();
    if (state.audioElement) {
      state.audioElement.currentTime = time;
    }
  },

  // Queue management
  playQueue: async (verses: WQuranVerse[], startIndex = 0) => {
    if (verses.length === 0) return;

    set({
      verseQueue: verses,
      currentQueueIndex: startIndex,
      isQueueMode: true,
    });

    const actions = get();
    await actions.playVerse(verses[startIndex]);
  },

  nextVerse: async () => {
    const state = get();
    if (!state.isQueueMode || state.currentQueueIndex >= state.verseQueue.length - 1) {
      return;
    }

    const nextIndex = state.currentQueueIndex + 1;
    set({ currentQueueIndex: nextIndex });

    const actions = get();
    await actions.playVerse(state.verseQueue[nextIndex]);
  },

  previousVerse: async () => {
    const state = get();
    if (!state.isQueueMode || state.currentQueueIndex <= 0) {
      return;
    }

    const prevIndex = state.currentQueueIndex - 1;
    set({ currentQueueIndex: prevIndex });

    const actions = get();
    await actions.playVerse(state.verseQueue[prevIndex]);
  },

  clearQueue: () => {
    set({
      verseQueue: [],
      currentQueueIndex: 0,
      isQueueMode: false,
    });
  },

  // Internal state updates
  setCurrentTime: (time: number) => set({ currentTime: time }),
  setDuration: (duration: number) => set({ duration }),
  setIsPlaying: (playing: boolean) => set({ isPlaying: playing }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setAudioElement: (element: HTMLAudioElement | null) => set({ audioElement: element }),

  // Callbacks
  setOnVerseChange: (callback: ((verse: WQuranVerse) => void) | null) => {
    set({ onVerseChange: callback });
  },
}));
