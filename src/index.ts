import Flake from "./Flake";
import generateFlakes from "./generateFlakes";
import randomColor from "./randomColor";
import { HSLColor, SnowOptions } from "./customTypes";

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
  constructor(options: SnowOptions) {
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

    this.drawFlakes = (elapsedTime) => {
      // Calculate time delta from last render
      const delta = elapsedTime - (this.lastFrameTime || 0);
      // Queue an animation frame
      requestAnimationFrame(this.drawFlakes);
      // Skip this render if fps interval has not been reached or if paused
      if ((this.lastFrameTime && delta < this.fps) || this.isPaused) return;
      // Update the previous render time for next delta calculation
      this.lastFrameTime = elapsedTime;
      // Render frame
      this.ctx.clearRect(0, 0, this.w, this.h);

      for (const f of this.flakes) {
        f.draw(this.ctx);
      }
    };
  }

  initialize = (parent: HTMLElement) => {
    this.parent = parent;
    this.w = parent.clientWidth;
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
  start = () => (this.renderer = requestAnimationFrame(this.drawFlakes));
  pause = () => (this.isPaused = true);
  play = () => (this.isPaused = false);
  toggle = () => (this.isPaused = !this.isPaused);
  restart = () => {
    cancelAnimationFrame(this.renderer);
    this.initialize(this.parent);
    this.parent.removeChild(this.canvas);
    this.inject();
    this.renderer = requestAnimationFrame(this.drawFlakes);
  };

  cycleShape = () => {
    for (const f of this.flakes) {
      f.shape = f.shape === "circle" ? "square" : "circle";
    }
  };

  setShape = (shape: "circle" | "square") => {
    if (!["circle", "square"].includes(shape)) {
      console.error(
        `'${shape}'`,
        "is not a valid shape. Must be 'circle' or 'square'"
      );
      return;
    }
    if (this.flakes[0].shape === shape) return;
    for (const f of this.flakes) {
      f.shape = shape;
    }
  };

  toggleCycle = () => {
    for (const f of this.flakes) f.cycle = !f.cycle;
  };

  setRandomize = (val: boolean) => (this.cycleColors = val);
  randomizeColors = () => {
    for (const f of this.flakes) f.color = randomColor();
  };

  changeColor = (color: HSLColor) => {
    for (const f of this.flakes) f.color = color;
  };

  changeScale = (newScale: number) => {
    if (newScale === this.scale) return;
    for (const f of this.flakes) {
      f.r = newScale;
    }
  };
}

export default Snow;
