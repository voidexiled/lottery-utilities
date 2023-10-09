import { create } from "zustand";
import { type Tool } from "./types";
import { TOOLS } from "../constants/Tools";

type State = {
  tools: Tool[];
  tool: Tool;
  setTool: (tool: Tool) => void;
};

export const useToolsStore =
  create<State>((set) => {
    return {
      tools: Object.values(TOOLS),
      tool: TOOLS.FIGURE_SEARCHER,
      setTool: (tool) => set({ tool }),
    };
  });
