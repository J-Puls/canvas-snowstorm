import { generateFlakes } from "./generateFlakes";
import { drawShapes } from "./drawShapes";

export const snow = (
  speed = 1,
  scale = 1,
  amount = 1,
  color = "white",
  fps = 60,
  w = window.innerWidth,
  h = window.innerHeight,
  el: HTMLElement
) => {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.classList.add("canvas-snowstorm");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  el.appendChild(canvas);

  let back = generateFlakes(1, amount, scale, color, w, h);
  let mid = generateFlakes(2, amount, scale, color, w, h);
  let fore = generateFlakes(3, amount, scale, color, w, h);

  const moveShapes = () => {
    ctx.clearRect(0, 0, w, h);
    drawShapes(ctx, back, 5, h, w, speed);
    drawShapes(ctx, mid, 12.5, h, w, speed);
    drawShapes(ctx, fore, 15, h, w, speed);
  };

  let animate = setInterval(moveShapes, 1000 / fps);

  document.body.addEventListener("resize", () => {
    if (window.outerHeight !== h) h = window.outerHeight;
    if (window.outerWidth !== w) {
      clearInterval(animate);
      w = window.outerWidth;
      animate = setInterval(moveShapes, 1000 / fps);
    }
  });
};
export default snow;
