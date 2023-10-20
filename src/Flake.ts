import { HSLColor } from "./customTypes";

export class Flake {
  color: HSLColor;
  cycle: boolean;
  dx: number;
  dxLimit: number;
  dy: number;
  h: number;
  r: number;
  shape: string;
  startX: number;
  startY: number;
  w: number;
  x: number;
  y: number;
  constructor(
    options: {
      color: HSLColor,
      cycle: boolean,
      dy: number,
      h: number,
      r: number,
      shape: string,
      w: number,
      x: number,
      y: number
    }
    
  ) {

    const { color, cycle, dy, h, r, shape, w, x, y } = options;

    this.color = color;
    this.cycle = cycle;
    this.h = h;
    this.r = r;
    this.shape = shape;
    this.startX = x;
    this.startY = y;
    this.w = w;
    this.x = x;
    this.y = y;

    this.dy = Math.random() * dy;
    this.dx = this.dy / 2;
    this.dxLimit = -this.dx;

  }

  updatePosition = () => {

    // if flake is at the bottom of the container
    if (this.y >= this.h) {
      
      // set its y coordinate to the top of the container
      this.y = -this.r;

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

    // Shift the color one degree if this setting is enabled
    if (this.cycle) 
      this.color.h = this.color.h < 360 ? this.color.h + 1 : 0;

    ctx.fillStyle = `hsl(${this.color.h}, ${this.color.s}%, ${this.color.l}%)`;

    // Draw the appropriate shape on the canvas
    switch(this.shape){

      case 'circle':
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'square':
        ctx.fillRect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
        break;
      default:
        break;

    }

    // // Calculate the next position
    // this.updatePosition();

  };
}
export default Flake;
