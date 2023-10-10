import { create } from "zustand";
import { type Tool } from "./types";
import { TOOLS } from "../constants/Tools";

type State = {
  tools: Tool[];
  tool: Tool;
  setTool: (tool: Tool | undefined) => void;
};

export const useToolsStore = create<State>((set) => ({
  tools: Object.values(TOOLS),
  tool: Object.values(TOOLS)[0],
  setTool: (tool) => set({ tool }),
}));
