import { HSLColor } from "./customTypes";

export class Flake {
  cycle: boolean;
  r: number;
  x: number;
  startX: number;
  y: number;
  startY: number;
  dx: number;
  dxLimit: number;
  dy: number;
  color: HSLColor;
  h: number;
  w: number;
  shape: string;
  constructor(
    r: number,
    x: number,
    y: number,
    dy: number,
    color: HSLColor,
    h: number,
    w: number,
    shape: string,
    cycle: boolean
  ) {
    this.r = r;
    this.x = x;
    this.startX = x;
    this.startY = y;
    this.y = y;
    this.dy = Math.random() * dy;
    this.dx = this.dy / 2;
    this.dxLimit = -this.dx;
    this.color = color;
    this.h = h;
    this.w = w;
    this.shape = shape;
    this.cycle = cycle;
  }

  updatePosition = () => {
    // if flake is at the bottom of the container
    if (this.y >= this.h) {
      this.y = -this.r;                                             // set its y coordinate to the top of the container
      // this.x > this.w / 2 ? this.w / 2 - this.startX : this.startX;
      this.dx = this.dy / 2;
    } else {
      this.y += this.dy;
      this.x += this.dx;
    }
    if (this.dxLimit < 0) {
      this.dx > this.dxLimit
        ? (this.dx -= 0.005)
        : (this.dxLimit = -this.dxLimit);
    } else if (this.dxLimit > 0) {
      this.dx < this.dxLimit
        ? (this.dx += 0.005)
        : (this.dxLimit = -this.dxLimit);
    }
  };

  draw = (ctx: CanvasRenderingContext2D) => {
    if (this.cycle) {
      this.color.h = this.color.h < 360 ? this.color.h + 1 : 0;
    }
    ctx.fillStyle = `hsl(${this.color.h}, ${this.color.s}%, ${this.color.l}%)`;
    if (this.shape === "circle") {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.shape === "square") {
      ctx.fillRect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
    }
    this.updatePosition();
  };
}
export default Flake;
