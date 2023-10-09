import { create } from "zustand";
import { type Figure } from "./types";
import { FIGURES } from "../constants/Figures";

type State = {
  fullFigures: Figure[];
  figures: Figure[];
  figure: Figure;
  setFigure: (figure: Figure) => void;
  setFigures: (
    figures: Figure[]
  ) => void;
};

export const useFigureStore =
  create<State>((set) => {
    return {
      fullFigures:
        Object.values(FIGURES),
      figures: Object.values(FIGURES),
      figure: FIGURES.EL_GALLO,
      setFigure: (figure) =>
        set({ figure }),
      setFigures: (figures) =>
        set({ figures }),
    };
  });
