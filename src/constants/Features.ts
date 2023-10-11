import { Feature } from "./types";

export const FEATURES: Feature[] = [
  {
    id: 0,
    name: "Comodin",
    selected: false,
    disabled: false,
  },
  {
    id: 1,
    name: "Esquinas",
    selected: false,
    disabled: true,
    conditionId: 0,
  },
  {
    id: 2,
    name: "Centro",
    selected: false,
    disabled: true,
    conditionId: 0,
  },
];
