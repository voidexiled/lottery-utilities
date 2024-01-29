import { createCanvas, loadImage } from "canvas";

/**
 * Generates a table image based on the given matrix and size.
 * @param matriz - The matrix representing the table.
 * @param size - The size of the table.
 * @returns The generated table image as a canvas.
 */
export async function generateTableImage(
  matriz: number[][],
  size: number,
  customComodin: { JPGDataURL: string; WEBPDataURL: string }
) {
  const canvasWidth: number = 800;
  const canvasHeight: number = 1200;

  const imgWidth = canvasWidth / size;
  const imgHeight = canvasHeight / size;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");
  ctx.quality = "fast";

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const imagesSrc = matriz.flat().map((figureId) => `figures/${figureId}.jpg`);

  let currentX = 0;
  let currentY = 0;

  for (let index = 0; index < matriz.flat().length; index++) {
    const figure = matriz.flat()[index];
    let src = imagesSrc[imagesSrc.indexOf(`figures/${figure}.jpg`)];
    console.log(index);
    if (figure === 55) {
      src = customComodin.WEBPDataURL;
    }

    const img = await loadImage(src);

    ctx.drawImage(img, currentX, currentY, imgWidth, imgHeight);

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(currentX, currentY, imgWidth, imgHeight);

    currentX += imgWidth;
    if (index % size === size - 1) {
      currentX = 0;
      currentY += imgHeight;
    }
  }
  return canvas;
}

export async function getURLImage(
  matrix: number[][],
  size: number,
  customComodin: { JPGDataURL: string; WEBPDataURL: string }
) {
  const url = generateTableImage(matrix, size, customComodin).then((canvas) => {
    return canvas.toDataURL("image/jpeg", 0.5);
  });
  return url;
}
