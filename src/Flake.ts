import { HSLColor } from "./customTypes";

export class Flake {
  color: HSLColor;
  cycle: boolean;
  dx: number;
  dxLimit: number;
  dy: number;
  dyScaler: number;
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

    this.dyScaler = Math.random() * 2;
    this.dy = this.dyScaler * dy;
    this.dx = this.dy / 2;
    this.dxLimit = -this.dx;

  }

  updatePosition = () => {

    if (this.y >= this.h) {

      // The flake is at the bottom of the container, so reset its position to the top
      this.y = -this.r;
      this.dx = this.dy / 2;

    } else {

      // The flake is not at the bottom of the container
      this.y += this.dy;

      // The flake is off the screen to the right, so reset it to the left
      if (this.x > this.w) this.x = 0;

      // Update the x position based on the delta
      else this.x += this.dx;
      
    }
    

    if (this.x > this.w) {

      this.x = 0;

    } else if (this.dxLimit !== 0) {

      if (this.dxLimit < 0) {

        this.dx = this.dx > this.dxLimit ? this.dx - 0.005 : -this.dxLimit;

      } else {

        this.dx = this.dx < this.dxLimit ? this.dx + 0.005 : this.dxLimit;

      }

    }
    
    
  };

  draw = (ctx: CanvasRenderingContext2D) => {

    // Shift the color one degree if this setting is enabled
    if (this.cycle) 
      this.color.h = this.color.h < 360 ? this.color.h + 1 : 0;

    ctx.fillStyle = `hsl(${this.color.h}, ${this.color.s}%, ${this.color.l}%)`;

    // Draw the appropriate shape on the canvas
    switch (this.shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'square':
        ctx.fillRect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
        break;

      case 'triangle': {
        ctx.beginPath();
        const sideLength = this.r * 2; // Assuming the radius represents the distance from the center to a corner
        const height = (Math.sqrt(3) / 2) * sideLength;
        ctx.moveTo(this.x, this.y - this.r);
        ctx.lineTo(this.x - sideLength / 2, this.y + height / 2);
        ctx.lineTo(this.x + sideLength / 2, this.y + height / 2);
        ctx.closePath();
        ctx.fill();
        break;
      }

      case 'pentagon': {
        ctx.beginPath();
        const sideLength = this.r * 2;
        const radius = sideLength / (2 * Math.sin(Math.PI / 5));
        for (let i = 0; i < 5; i++) {
          const x = this.x + radius * Math.cos(2 * Math.PI * i / 5);
          const y = this.y + radius * Math.sin(2 * Math.PI * i / 5);
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();
        break;
      }
      case 'hexagon': {
        ctx.beginPath();
        const sideLength = this.r * 2;
        const radius = sideLength / (2 * Math.sin(Math.PI / 6));
        for (let i = 0; i < 6; i++) {
          const x = this.x + radius * Math.cos(2 * Math.PI * i / 6);
          const y = this.y + radius * Math.sin(2 * Math.PI * i / 6);
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();
        break;
      }
    
      case 'star': {
        ctx.beginPath();
        const sideLength = this.r * 2;
        const scalingFactor = 1.5; // Adjust the scaling factor as needed
        const innerRadius = sideLength * 0.3 * scalingFactor;
        const outerRadius = this.r * scalingFactor;
      
        for (let i = 0; i < 10; i++) {
          const angle = i * Math.PI / 5;
          const x = this.x + (i % 2 === 0 ? innerRadius : outerRadius) * Math.cos(angle);
          const y = this.y + (i % 2 === 0 ? innerRadius : outerRadius) * Math.sin(angle);
      
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();
        break;
      }

      default:
        break;
    }


  };
}
export default Flake;
