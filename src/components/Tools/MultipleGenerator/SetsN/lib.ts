import { getURLImage } from "../../../../features/images/generateTableImage";
import { shuffleArray } from "../../../../features/tables/generateRandomMatrix";
import { type Table } from "../../../../store/types";
/**
 * Función que se encarga de generar conjuntos de tablas.
 * Obtiene los valores de los inputs de comodín, tamaño y cantidad de tablas.
 * Genera las tablas utilizando la función generateTables.
 * Guarda las tablas generadas utilizando la función saveTables.
 */
interface handleGenerateSetTablasProps {
  setTables: (tables: Table[]) => void;
  figures: Figure[];
  withoutComodin: boolean;
  tables: Table[];
  customComodin: { JPGDataURL: string; WEBPDataURL: string };
}

export const handleGenerateSetTablas = async ({
  setTables,
  figures,
  withoutComodin,
  tables,
  customComodin,
}: handleGenerateSetTablasProps) => {
  const comodin = Number(
    (document.getElementById("comodinInput") as HTMLInputElement).value
  );
  const size = Number(
    (document.getElementById("sizeInput") as HTMLInputElement).value
  );
  const qyTables = Number(
    (document.getElementById("cantidadTablasInput") as HTMLInputElement).value
  );

  const localTables = await generateTables(
    comodin,
    size,
    qyTables,
    figures,
    withoutComodin,
    tables,
    customComodin
  ).then((res) => {
    return res;
  });

  saveTables({ localTables, setTables });
};

/**
 * Función que guarda las tablas generadas.
 * Recibe un array con las tablas generadas y las guarda en el estado.
 * @param localTables El array con las tablas generadas.
 */
interface saveTablesProps {
  localTables: Table[];
  setTables: (tables: Table[]) => void;
}

const saveTables = ({ localTables, setTables }: saveTablesProps) => {
  setTables(localTables);
  console.log(localTables);
};
/**
 * Función que genera las tablas.
 * Recibe los valores de comodín, tamaño y cantidad de tablas.
 * Genera las tablas utilizando los valores recibidos y otras funciones auxiliares.
 * Retorna un array con las tablas generadas.
 * @param comodin El valor del comodín.
 * @param size El tamaño de las tablas.
 * @param qyTables La cantidad de tablas a generar.
 * @returns Un array con las tablas generadas.
 */
import { type Figure } from "../../../../store/types";

const generateTables = async (
  comodin: number,
  size: number,
  qyTables: number,
  figures: Figure[],
  withoutComodin: boolean,
  tables: Table[],
  customComodin: { JPGDataURL: string; WEBPDataURL: string }
) => {
  const localTables = [];
  const oldArray: Figure[] = [...figures];
  const comodinFigure = figures.find((f) => f.id === comodin) as Figure;
  const minLengthArray = calculateMinLengthArray({ size, withoutComodin });
  console.log(comodinFigure); // TODO: insertar comodin en las tablas.
  let maxNum = 0;
  const minNum = 1;
  let lastTableIndex = getLastTableIndex({ tables });

  for (let i = 0; i < qyTables; i++) {
    if (oldArray.length < minLengthArray) {
      const restantes = 54 - oldArray.length;
      updateMinMaxNum({ oldArray, maxNum, minNum });

      for (let y = 0; y < restantes; y++) {
        maxNum += 1;
        if (maxNum > 54) {
          maxNum = 1;
        }

        const nextFig = figures.find((fig) => fig.id === maxNum);

        if (nextFig) {
          oldArray.push(nextFig);
        }
      }
    }

    const tempArray: Figure[] = shuffleArray(
      getTempArray(oldArray, minLengthArray)
    );
    const unsortedArray: Figure[] = shuffleArray(tempArray);
    const numbersMatrix = unsortedArray.map((f) => f.id);
    const newArray: number[][] = createNewArray(numbersMatrix, size);
    console.log("---------------");
    console.log(tempArray);
    console.log(unsortedArray);
    console.log(numbersMatrix);
    console.log(newArray);
    console.log("---------------");

    const table: Table = {
      id: lastTableIndex,
      name: `Table${lastTableIndex}`,
      numbers: newArray,
      date: new Date().toISOString(),
      size: size,
      dataURL: await getURLImage(newArray, size, customComodin),
    };

    localTables.push(table);
    lastTableIndex += 1;
  }

  return localTables;
};

/**
 * Función que calcula la longitud mínima del array.
 * Recibe el tamaño de las tablas.
 * Si el comodín está habilitado, se resta 1 a la longitud mínima.
 * @param size El tamaño de las tablas.
 * @returns La longitud mínima del array.
 */

interface CalculateMinLengthArrayProps {
  size: number;
  withoutComodin: boolean;
}

const calculateMinLengthArray = ({
  size,
  withoutComodin,
}: CalculateMinLengthArrayProps) => {
  let minLengthArray = size * size;
  if (!withoutComodin) {
    minLengthArray -= 1;
  }
  return minLengthArray;
};

/**
 * Función que actualiza los valores máximo y mínimo del array.
 * Recibe el array de figuras, el valor máximo y el valor mínimo.
 * Actualiza los valores máximo y mínimo en base a las figuras del array.
 * @param oldArray El array de figuras.
 * @param maxNum El valor máximo actual.
 * @param minNum El valor mínimo actual.
 */
interface updateMinMaxNumProps {
  oldArray: Figure[];
  maxNum: number;
  minNum: number;
}

const updateMinMaxNum = ({
  oldArray,
  maxNum,
  minNum,
}: updateMinMaxNumProps) => {
  oldArray.map((f) => {
    if (f.id > maxNum) {
      maxNum = f.id;
    }
    if (f.id < minNum) {
      minNum = f.id;
    }
  });
};

/**
 * Función que obtiene el índice de la última tabla.
 * Si hay tablas en el array, retorna el índice de la última tabla más 1.
 * @returns El índice de la última tabla.
 */
interface getLastTableIndexProps {
  tables: Table[];
}
const getLastTableIndex = ({ tables }: getLastTableIndexProps) => {
  let lastTableIndex = 0;
  if (tables[0]) {
    lastTableIndex = tables[tables.length - 1].id + 1;
  }
  return lastTableIndex;
};

/**
 * Función que obtiene un array temporal a partir del array original.
 * Recibe el array original y la longitud mínima del array.
 * Obtiene un subconjunto del array original con la longitud mínima.
 * @param oldArray El array original.
 * @param minLengthArray La longitud mínima del array.
 * @returns Un array temporal con la longitud mínima.
 */
const getTempArray = (oldArray: Figure[], minLengthArray: number) => {
  const tempArray: Figure[] = [];
  for (let item = 0; item < minLengthArray; item++) {
    const fig = oldArray.shift();
    if (fig) {
      tempArray.push(fig);
    }
  }
  return tempArray;
};

/**
 * Función que crea un nuevo array a partir de una matriz de números y un tamaño.
 * Recibe la matriz de números y el tamaño de los subarrays.
 * Crea un nuevo array dividiendo la matriz en subarrays del tamaño especificado.
 * @param numbersMatrix La matriz de números.
 * @param size El tamaño de los subarrays.
 * @returns Un nuevo array con los subarrays creados.
 */
const createNewArray = (numbersMatrix: number[], size: number) => {
  const newArray: number[][] = [];
  for (let i = 0; i < numbersMatrix.length; i += size) {
    const subarray: number[] = numbersMatrix.slice(i, i + size);
    newArray.push(subarray);
  }
  return newArray;
};
