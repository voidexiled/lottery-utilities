import prand from "pure-rand";

/**
 * Generates a random matrix of numbers.
 * 
 * @param n - The size of the matrix (n x n).
 * @param min - The minimum value for the random numbers.
 * @param max - The maximum value for the random numbers.
 * @param skip - Optional. A number to skip in the random generation.
 * @returns The generated random matrix.
 */
export function generateRandomMatrix(
  n: number,
  min: number,
  max: number,
  skip?: number
): number[][] {
  const matrix: number[][] = [];
  const usedValues = new Set<number>(); // Usamos un Set para rastrear los valores usados

  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    for (let j = 0; j < n; j++) {
      let randomNum;
      do {
        randomNum = getRandom(min, max);
      } while (
        randomNum === skip ||
        usedValues.has(randomNum)
      ); // Verificamos si el valor ya fue usado
      usedValues.add(randomNum); // Agregamos el valor usado al Set
      row.push(randomNum);
    }
    matrix.push(row);
  }

  return matrix;
}

/**
 * Generates a random number between the specified minimum and maximum values.
 * 
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range.
 * @returns A random number between the minimum and maximum values.
 */
export function getRandom(min: number, max: number) {
  const seed = Date.now() ^ (Math.random() * 0x100000000);
  const rng = prand.xoroshiro128plus(seed);
  const rand = (min: number, max: number) => {
    const out = (rng.unsafeNext() >>> 0) / 0x100000000;
    return min + Math.floor(out * (max - min + 1));
  };
  return rand(min, max);
}


/**
 * Generates a shuffled array of numbers between the specified minimum and maximum values.
 * @param min The minimum value of the range (inclusive).
 * @param max The maximum value of the range (inclusive).
 * @returns The shuffled array of numbers.
 */
export function generateShuffledArray(min: number, max: number): number[] {
  const originalArray = Array.from({ length: max - min + 1 }, (_, index) => index + min);
  const shuffledArray = [...originalArray];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = getRandom(0, i);
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

/**
 * Shuffles the elements of an array randomly.
 * 
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array to be shuffled.
 * @returns {T[]} - The shuffled array.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = getRandom(0, i);
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}