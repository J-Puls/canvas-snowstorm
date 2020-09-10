export const randomInt = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min + 1) + min);
};
export default randomInt;
