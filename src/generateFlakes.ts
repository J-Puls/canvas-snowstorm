import Flake from "./Flake";
import { randomColor } from "./randomColor";

export const generateFlakes = (speed, scale, amount, color, h, w, cycle) => {
  const randomX = () => {
    return Math.round(Math.random() * w) + 1;
  };
  const randomY = () => {
    return -Math.round(Math.random() * amount) + 1;
  };

  const flakes = [] as Flake[];
  for (let i = 0; i < amount; i++) {
    const clr = color === "random" ? randomColor() : color;
    flakes.push(
      new Flake(scale, randomX(), randomY(), speed, clr, h, w, "square", cycle)
    );
  }

  return flakes;
};

export default generateFlakes;
