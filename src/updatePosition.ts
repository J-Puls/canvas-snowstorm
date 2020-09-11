import { Flake } from "./Flake";

export const updatePosition = (
  shape: Flake,
  speed: number,
  multiplier: number,
  h: number
) => {
  shape.offset === -100 && (shape.inc = 1);
  shape.offset === 100 && (shape.inc = -1);
  shape.x =
    shape.x +
    shape.inc * Math.random() * (speed * shape.r * (multiplier / 100));
  shape.y = shape.y > h ? 0 : shape.y + 1 * (shape.r / (speed * multiplier));
  shape.offset += shape.inc;
};
