import Flake from "./Flake";
import randomInt from "./randomInt";

export const generateFlakes = (
  size: number,
  amount: number,
  scale: number,
  clr: string,
  w: number,
  h: number
) => {
  let arr = [] as Flake[];
  let i = 0;
  let color = () => {
    return clr === "random"
      ? `hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`
      : clr;
  };
  while (i < amount * 100) {
    arr.push(
      new Flake(
        randomInt(0, w),
        randomInt(0, h),
        Math.random() * (scale * size),
        color()
      )
    );
    i++;
  }
  return arr;
};
export default generateFlakes;
