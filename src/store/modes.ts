import { MODES } from "./../constants/Modes";
import { create } from "zustand";
import { type Mode } from "./types";

type State = {
  modes: typeof MODES;
  mode: Mode;
  setMode: (tool: Mode) => void;
};

export const useModesStore = create<State>((set) => ({
  modes: MODES,
  mode: MODES.FULL_MODE,
  setMode: (mode) => set({ mode }),
}));
