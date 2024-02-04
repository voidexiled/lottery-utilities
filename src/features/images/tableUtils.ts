import { getRandom } from "../tables/generateRandomMatrix";

export const putComodin = (
  _array: number[][],
  figureId: number,
  center?: boolean,
  edges?: boolean
) => {
  console.log(center, edges);
  const tableWithComodin = _array;
  const randomPlace = (): { x: number; y: number } => {
    const row: number = getRandom(0, tableWithComodin.length - 1);
    const column: number = getRandom(0, tableWithComodin.length - 1);
    //return { x: row, y: column };
    console.log(row, column);
    return { x: column, y: row };
  };
  const place: { x: number; y: number } = randomPlace();
  tableWithComodin[place.x][place.y] = figureId;
  return tableWithComodin;
};

export const putDoubleComodin = (
  _array: number[][],
  figureId: number,
  cye: boolean
) => {
  const tableWithComodin = _array;

  const getRandomEdge = (): { x: number; y: number } => {
    const edge: number = getRandom(0, 3);
    const size = tableWithComodin[0].length - 1;
    console.log("SIZE: ", size);
    switch (edge) {
      case 0:
        return { x: 0, y: 0 };
      case 1:
        return { x: size, y: 0 };
      case 2:
        return { x: 0, y: size };
      case 3:
        return { x: size, y: size };
      default:
        return { x: 0, y: 0 };
    }
  };
  const getCenter = (): { x: number; y: number } => {
    const size = tableWithComodin[0].length;
    return { x: Math.floor(size / 2), y: Math.floor(size / 2) };
  };

  let place1: { x: number; y: number } = { x: 0, y: 0 };
  let place2: { x: number; y: number } = { x: 0, y: 0 };
  if (cye) {
    place1 = getRandomEdge();
    place2 = getCenter();
  } else {
    const pos1 = {
      x: getRandom(0, _array.length - 1),
      y: getRandom(0, _array.length - 1),
    };
    let pos2 = {
      x: getRandom(0, _array.length - 1),
      y: getRandom(0, _array.length - 1),
    };
    console.info("Position 1: ", pos1);
    console.info("Position 2: ", pos2);
    while (pos2.x == pos1.x && pos2.y == pos1.y) {
      pos2 = {
        x: getRandom(0, _array.length - 1),
        y: getRandom(0, _array.length - 1),
      };
    }
    place1 = pos1;
    place2 = pos2;
  }

  tableWithComodin[place1.x][place1.y] = figureId;
  tableWithComodin[place2.x][place2.y] = figureId;
  return tableWithComodin;
};
