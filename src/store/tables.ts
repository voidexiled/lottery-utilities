import { create } from "zustand";
import { Table } from "./types";
import { generateRandomMatrix } from "../features/tables/generateRandomMatrix";

const data: Table[] = [];

type State = {
  tables: Table[];
  selectedTable: Table | null;
  setSelectedTable: (table: Table | null) => void;
  addTable: () => void;
  setTable: (table: Table) => void;
  removeTable: (id: number) => void;
};

const generateTable = () => {
  const matrix = generateRandomMatrix(4, 1, 54, 0);
  const table = {
    id: data.length + 1,
    name: `Table${data.length}`,
    numbers: matrix,
    date: new Date().toISOString(),
    size: 4,
  };
  return table;
};

export const useTablesStore = create<State>((set) => ({
  tables: data,
  selectedTable: null,
  setSelectedTable: (table) =>
    set(() => ({ selectedTable: table })),
  addTable: () => {
    set((state) => ({
      tables: [...state.tables, generateTable()],
    }));
  },
  setTable: (table) => {
    set((state) => ({
      tables: state.tables.map((t) =>
        t.id === table.id ? table : t
      ),
    }));
  },
  removeTable: (id) => {
    set((state) => ({
      tables: state.tables.filter(
        (table) => table.id !== id
      ),
    }));
  },
}));
