export type HSLColor = {
  h: number;
  s: number;
  l: number;
};

export type SnowOptions = {
  speed: number;
  scale: number;
  amount: number;
  color: HSLColor;
  fps: number;
  cycleColors: boolean;
};
