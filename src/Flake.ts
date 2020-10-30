export class Flake {
  r: number;
  x: number;
  startX: number;
  y: number;
  startY: number;
  dx: number;
  dxLimit: number;
  dy: number;
  color: string;
  h: number;
  w: number;
  constructor(r, x, y, dy, color, h, w) {
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
  }
  updatePosition = () => {
    if (this.y >= this.h) {
      this.y = -this.r;
      this.x > this.w / 2 ? this.w / 2 - this.startX : this.startX;
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
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    this.updatePosition();
  };
}
export default Flake;
