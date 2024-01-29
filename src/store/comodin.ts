import { create } from "zustand";

type Comodin = {
  JPGDataURL: string;
  WEBPDataURL: string;
};

type State = {
  comodin: Comodin;
  customComodin: boolean;
  setCustomComodin: (value: boolean) => void;
  setComodin: (comodin: Comodin) => void;
  setJPG: (jpgDataURL: string) => void;
  setWEBP: (webpDataURL: string) => void;
};

export const useComodinStore = create<State>((set) => ({
  comodin: { JPGDataURL: "", WEBPDataURL: "" },
  customComodin: false,
  setCustomComodin: (value: boolean) => set({ customComodin: value }),
  setComodin: (comodin) => set({ comodin }),
  setJPG: (jpgDataURL: string) =>
    set((state) => ({ comodin: { ...state.comodin, JPGDataURL: jpgDataURL } })),
  setWEBP: (webpDataURL: string) =>
    set((state) => ({
      comodin: { ...state.comodin, WEBPDataURL: webpDataURL },
    })),
}));
