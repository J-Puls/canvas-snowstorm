import Flake from "./Flake";
import generateFlakes from "./generateFlakes";

class Snow {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  drawFlakes: (elapsedTime: number) => void;
  flakes: Flake[];
  fps: number;
  h: number;
  scale: number;
  speed: number;
  isPaused: boolean;
  lastFrameTime: number;
  renderer: number;
  w: number;
  root: HTMLElement;
  constructor(
    speed = 1,
    scale = 1,
    amount = 1,
    color = "white",
    fps = 30,
    width = window.innerWidth,
    height = window.innerHeight,
    el: HTMLElement = document.body
  ) {
    this.h = height;
    this.w = width;
    this.root = el;
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0px";
    this.canvas.style.top = "0px";
    this.ctx = this.canvas.getContext("2d");
    this.scale = scale;
    this.speed = speed;
    this.isPaused = false;

    this.flakes = generateFlakes(
      this.speed,
      this.scale,
      amount,
      color,
      this.h,
      this.w
    );
    this.fps = Math.floor(1000 / fps);
    this.lastFrameTime = 0;
    this.renderer = null;

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

  start = () => {
    this.root.appendChild(this.canvas);
    requestAnimationFrame(this.drawFlakes);
  };
  pause = () => (this.isPaused = true);
  play = () => (this.isPaused = false);
  toggle = () => (this.isPaused = !this.isPaused);

  changeScale = (newScale) => {
    if (newScale === this.scale) return;
    for (const f of this.flakes) {
      f.r = newScale;
    }
  };
}

export default Snow;
