import Flake from "./Flake";
import { updatePosition } from "./updatePosition";

export const drawShapes = (
  ctx: CanvasRenderingContext2D,
  flakeArr: Flake[],
  multiplier: number,
  h: number,
  w: number,
  speed: number
) => {
  flakeArr.forEach((flake) => {
    flake.draw(ctx);
    updatePosition(flake, speed, multiplier, h);
  });
};
export default drawShapes;

