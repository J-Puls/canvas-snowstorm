import Flake from "./Flake.js";
import generateFlakes from "./generateFlakes.js";
import randomColor from "./randomColor.js";
import { HSLColor, SnowOptions } from "./customTypes.js";

class Snow {
  amount: number;
  canvas: HTMLCanvasElement;
  cycleColors: boolean;
  color: HSLColor;
  ctx: CanvasRenderingContext2D;
  drawFlakes: (elapsedTime: number) => void;
  flakes: Flake[];
  fps: number;
  h: number;
  isPaused: boolean;
  lastFrameTime: number;
  parent: HTMLElement;
  scale: number;
  speed: number;
  w: number;
  renderer: number;
  VALID_SHAPES: Array<string>;
  render_even: boolean;
  filterFlakes: (even: boolean) => Array<Flake>;

  constructor(options: SnowOptions) {

    this.VALID_SHAPES = ["circle", "square"];

    this.cycleColors = options.cycleColors || false;
    this.scale = options.scale || 1;
    this.speed = options.speed || 1;
    this.isPaused = false;
    this.fps = Math.floor(1000 / options.fps || 30);
    this.lastFrameTime = 0;
    this.amount = options.amount || 100;
    this.color = options.color || { h: 0, s: 0, l: 100 };
    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0px";
    this.canvas.style.top = "0px";
    this.canvas.className = "canvas-snowstorm";
    this.ctx = this.canvas.getContext("2d");
    this.parent;
    this.renderer;
    this.render_even = false;

    this.filterFlakes = (even) => this.flakes
        .map((element, index) => ({ element, index }))
        .filter(({ index }) => (even ? index % 2 === 0 : index % 2 !== 0))
        .map(({ element }) => element);
    

    this.drawFlakes = (elapsedTime) => {

      // calculate time delta from last render
      const delta = elapsedTime - (this.lastFrameTime || 0);

      // queue an animation frame
      requestAnimationFrame(this.drawFlakes);

      // skip this render if fps interval has not been reached or if paused
      if ((this.lastFrameTime && delta < this.fps) || this.isPaused) return;

      // update the previous render time for next delta calculation
      this.lastFrameTime = elapsedTime;

      // clear frame
      this.ctx.clearRect(0, 0, this.w, this.h);

      const to_update = this.filterFlakes(this.render_even);
      this.render_even = !this.render_even;

      // draw all flakes to canvas
      this.flakes.forEach(f => f.draw(this.ctx))
      
      // update all flake positions for next frame
      to_update.forEach(f => f.updatePosition())
      
    };
  }

  initialize = (parent: HTMLElement) => {

    this.parent = parent;
    this.w = parent.clientWidth * 1.5;
    this.h = parent.clientHeight;
    this.flakes = generateFlakes(
      this.speed,
      this.scale,
      this.amount,
      this.color,
      this.h,
      this.w,
      this.cycleColors
    );
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;

  };

  autostart = (parent: HTMLElement) => {

    this.initialize(parent);
    this.parent.appendChild(this.canvas);
    requestAnimationFrame(this.drawFlakes);

  };

  inject = () => this.parent.appendChild(this.canvas);
  
  start = () => this.renderer = requestAnimationFrame(this.drawFlakes);
  
  pause = () => this.isPaused = true;
  
  play = () => this.isPaused = false;
  
  toggle = () => this.isPaused = !this.isPaused;

  restart = () => {

    cancelAnimationFrame(this.renderer);
    this.initialize(this.parent);
    this.parent.removeChild(this.canvas);
    this.inject();
    this.renderer = requestAnimationFrame(this.drawFlakes);

  };

  cycleShape = () => this.flakes.forEach(f => f.shape = f.shape === "circle" ? "square" : "circle")

  setShape = (shape: "circle" | "square") => {

    if (!this.VALID_SHAPES.includes(shape)) {
      return console.error(`'${shape}' is not a valid shape. Must be 'circle' or 'square'`);
    }

    if (this.flakes[0].shape === shape) return;

    this.flakes.forEach(f => f.shape = shape);
    
  };

  toggleCycle = () => this.flakes.forEach(f => f.cycle = !f.cycle)

  setRandomize = (val: boolean) => (this.cycleColors = val);

  randomizeColors = () => this.flakes.forEach(f => f.color = randomColor());

  changeColor = (color: HSLColor) => this.flakes.forEach(f => f.color = color);

  changeScale = (newScale: number) => (newScale !== this.scale) && this.flakes.forEach(f => f.r = newScale);
  
  changeSpeed = (newSpeed: number) => {
    this.speed = Number(newSpeed);
    this.flakes.forEach(f => {
      f.dy = f.dyScaler * this.speed
      f.dx = f.dy / 2;
      f.dxLimit = -f.dx;
    });
}
}

export default Snow;
