import prand from "pure-rand";

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

export function getRandom(min: number, max: number) {
  const seed = Date.now() ^ (Math.random() * 0x100000000);
  const rng = prand.xoroshiro128plus(seed);
  const rand = (min: number, max: number) => {
    const out = (rng.unsafeNext() >>> 0) / 0x100000000;
    return min + Math.floor(out * (max - min + 1));
  };
  return rand(min, max);
}
