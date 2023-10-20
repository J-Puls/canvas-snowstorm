import Flake from "./Flake.js";
import { randomColor } from "./randomColor.js";

export const generateFlakes = (speed, scale, amount, color, h, w, cycle) => {
  const randomX = () => {
    return Math.round(Math.random() * w) + 1;
  };
  const randomY = () => {
    return Math.round(Math.random() * h) + 1;
  };

  const flakes = [] as Flake[];
  for (let i = 0; i < amount; i++) {
    const clr = color === "random" ? randomColor() : color;
    flakes.push(
      new Flake({
        color: clr, 
        cycle,
        dy: speed, 
        h, 
        r: scale, 
        shape: "square", 
        w, 
        x: randomX(), 
        y: randomY(), 
      })
    );
  }

  return flakes;
};

export default generateFlakes;
