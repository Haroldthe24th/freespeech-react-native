import { create } from "zustand";
import { Page, Project, Tile } from "./types";
import english from "../layouts/english";

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

export const useProjectStore = create<{
  project: Project;
  currentPage: Page;
  setCurrentPage: (page: string) => void;
  resetBackToHome: () => void;
}>((set) => ({
  project: english,
  currentPage: english.pages.find((page) => page.name === "home")!,
  setCurrentPage: (page) => {
    set((state) => ({
      currentPage: state.project.pages.find((p) => p.name === page)!,
    }));
  },
  resetBackToHome: () => {
    set((state) => ({
      currentPage: state.project.pages.find((p) => p.name === "home")!,
    }));
  },
}));
