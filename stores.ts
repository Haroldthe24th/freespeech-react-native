import { create } from "zustand";
import { Tile } from "./types";

export const useSentenceBuilderStore = create<{
  sentence: Tile[];
  addWord: (word: Tile) => void;
  removeWord: (index: number) => void;
  clearSentence: () => void;
}>((set) => ({
  sentence: [],
  addWord: (word) =>
    set((state) => ({
      sentence: [...state.sentence, word],
    })),
  removeWord: (index) =>
    set((state) => ({
      sentence: state.sentence.filter((_, i) => i !== index),
    })),
  clearSentence: () => set({ sentence: [] }),
}));
