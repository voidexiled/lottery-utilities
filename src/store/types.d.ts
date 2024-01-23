export type Tool = {
  id: number;
  name: string;
};

export type Figure = {
  id: number;
  name: string;
  src: string;
};

export type Mode = {
  id: number;
  name: string;
};

export type Table = {
  id: number;
  name: string;
  numbers: number[[]];
  date: string;
  size: number;
  comodin?: number;
};
