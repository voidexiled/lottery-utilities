import { create } from "zustand";
import { FEATURES } from "../constants/Features";
import { Feature } from "../constants/types";

type State = {
  features: Feature[];
  setFeatures: (features: Feature[]) => void;
};

export const useFeaturesStore = create<State>((set) => ({
  features: FEATURES,
  setFeatures: (features) => set({ features }),
}));
