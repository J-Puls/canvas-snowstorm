import randomInt from "./randomInt";

export class Flake {
  x: number;
  y: number;
  r: number;
  color: string;
  offset: number;
  inc: number;

  constructor(x: number, y: number, r: number, color: string) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.offset = randomInt(-99, 99);
    this.inc = 1;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }
}
export default Flake;
