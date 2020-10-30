import Flake from "./Flake";

export const generateFlakes = (speed, scale, amount, color, h, w) => {
  const randomX = () => {
    return Math.round(Math.random() * w) + 1;
  };
  const randomY = () => {
    return -Math.round(Math.random() * amount) + 1;
  };
  const randomColor = () => {
    return `hsl(${Math.floor(Math.random() * 360) + 1}, ${
      100 - Math.floor(Math.random() * 50) + 1
    }%, 50%)`;
  };

  const flakes = [] as Flake[];
  for (let i = 0; i < amount; i++) {
    const clr = color === "random" ? randomColor() : color;
    flakes.push(new Flake(scale, randomX(), randomY(), speed, clr, h, w));
  }
  return flakes;
};

export default generateFlakes;
