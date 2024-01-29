import { getRandom } from "../../../features/tables/generateRandomMatrix";

export const putCustomComodin = (matrix: number[][]): number[][] => {
  const newMatrix = [...matrix];
  const possiblePositions = [
    {
      row: 0,
      col: 1,
    },
    {
      row: 0,
      col: 2,
    },
    {
      row: 1,
      col: 0,
    },
    {
      row: 1,
      col: 3,
    },
    {
      row: 2,
      col: 0,
    },
    {
      row: 2,
      col: 3,
    },
    {
      row: 3,
      col: 1,
    },
    {
      row: 3,
      col: 2,
    },
  ];

  const randomPos = getRandom(0, possiblePositions.length - 1);
  const { row, col } = possiblePositions[randomPos];

  newMatrix[row][col] = 55;
  return newMatrix;
};
