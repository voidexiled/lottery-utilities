import { createCanvas, loadImage } from "canvas";
import { Table } from "../../components/types";


export async function generateTableImage(
  matriz: Table,
  //  width: number,
  //  height: number
) {
  // const cmToInch = 0.393701;
  // const canvasWidthCm = width;
  // const canvasHeightCm = height;
  // const dpi = 300;


  const canvasWidth: number = 800;
  const canvasHeight: number = 1200;

  const imgWidth = canvasWidth / matriz.size;
  const imgHeight = canvasHeight / matriz.size;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");
  ctx.quality = "fast"



  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const imagesSrc = matriz.numbers
    .flat()
    .map((figureId) => `figures/${figureId}.jpg`);

  let currentX = 0;
  let currentY = 0;

  for (let index = 0; index < matriz.numbers.flat().length; index++) {
    const figure = matriz.numbers.flat()[index];
    const src = imagesSrc[imagesSrc.indexOf(`figures/${figure}.jpg`)];

    const img = await loadImage(src);


    ctx.drawImage(img, currentX, currentY, imgWidth, imgHeight);

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(currentX, currentY, imgWidth, imgHeight);

    currentX += imgWidth;
    if (index % matriz.size === matriz.size - 1) {
      currentX = 0;
      currentY += imgHeight;
    }
  }

  // const url = canvas.toDataURL("image/jpeg", 0.5);
  // const a = document.createElement("a");
  // a.href = url;
  // a.download = "archivos.jpeg";
  // a.click();

  return canvas;
}
