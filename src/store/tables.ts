import { create } from "zustand";
import { Table } from "./types";
//import queryString from "query-string";


const LOCAL_STORAGE_KEY = "tables";
const data: Table[] = [];
const getInitialTables = () => {
  const storedTables = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedTables ? JSON.parse(storedTables) : data;
};

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

export const useTablesStore = create<State>((set) => {
  const initialTables = getInitialTables();
  

  return {
    tables: initialTables,
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
  };
});

let timeoutId: number | null = null;

// Guardar en Local Storage cuando el estado cambie
useTablesStore.subscribe(
  (state) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.tables));
    }, 500); // Ajusta el tiempo de espera según tus necesidades
  }
);
