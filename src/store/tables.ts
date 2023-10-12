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
  setTables: (tables: Table[]) => void;
  removeTable: (id: number) => void;
  removeTables: () => void;
};

const generateTable = (tables: Table[]) => {
  const matrix = generateRandomMatrix(4, 1, 54, 0);
  let lastIndex = 0;
  if (tables[0]) {
    lastIndex = tables[tables.length - 1].id + 1;
  }
  const table = {
    id: lastIndex,
    name: `Table${lastIndex}`,
    numbers: matrix,
    date: new Date().toISOString(),
    size: 4,
  };

  return table;
};

const concatTables = (
  oldTables: Table[],
  newTables: Table[]
) => {
  return [...oldTables, ...newTables];
};




export const useTablesStore = create<State>((set) => ({
  tables: data,
  selectedTable: null,
  setSelectedTable: (table) =>
    set(() => ({ selectedTable: table })),
  addTable: () => {
    set((state) => (
      {
        tables: [
          ...state.tables,
          generateTable(state.tables),
        ],
        return: state.tables[state.tables.length - 1]
      }));

  },
  setTable: (table) => {
    set((state) => ({
      tables: state.tables.map((t) =>
        t.id === table.id ? table : t
      ),
    }));
  },
  setTables: (tables) => {
    set((state) => ({
      tables: concatTables(state.tables, tables),
    }));
  },
  removeTable: (id) => {
    set((state) => ({
      tables: state.tables.filter(
        (table) => table.id !== id
      ),
    }));
  },
  removeTables: () => {
    set(() => ({
      tables: [],
    }));
  },
}));
