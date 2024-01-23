import { create } from "zustand";
import { Table } from "./types";

const data: Table[] = [];

type State = {
  tables: Table[];
  selectedTable: Table | null;
  setSelectedTable: (table: Table | null) => void;

  setTable: (table: Table) => void;
  setTables: (tables: Table[]) => void;
  removeTable: (id: number) => void;
  removeTables: () => void;
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
