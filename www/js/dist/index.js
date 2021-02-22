import generateFlakes from "./generateFlakes.js";
import randomColor from "./randomColor.js";
class Snow {
    constructor(options) {
        this.initialize = (parent) => {
            this.parent = parent;
            this.w = parent.clientWidth * 1.5;
            this.h = parent.clientHeight;
            this.flakes = generateFlakes(this.speed, this.scale, this.amount, this.color, this.h, this.w, this.cycleColors);
            this.canvas.width = parent.clientWidth;
            this.canvas.height = parent.clientHeight;
        };
        this.autostart = (parent) => {
            this.initialize(parent);
            this.parent.appendChild(this.canvas);
            requestAnimationFrame(this.drawFlakes);
        };
        this.inject = () => this.parent.appendChild(this.canvas);
        this.start = () => (this.renderer = requestAnimationFrame(this.drawFlakes));
        this.pause = () => (this.isPaused = true);
        this.play = () => (this.isPaused = false);
        this.toggle = () => (this.isPaused = !this.isPaused);
        this.restart = () => {
            cancelAnimationFrame(this.renderer);
            this.initialize(this.parent);
            this.parent.removeChild(this.canvas);
            this.inject();
            this.renderer = requestAnimationFrame(this.drawFlakes);
        };
        this.cycleShape = () => {
            for (const f of this.flakes) {
                f.shape = f.shape === "circle" ? "square" : "circle";
            }
        };
        this.setShape = (shape) => {
            if (!["circle", "square"].includes(shape)) {
                console.error(`'${shape}'`, "is not a valid shape. Must be 'circle' or 'square'");
                return;
            }
            if (this.flakes[0].shape === shape)
                return;
            for (const f of this.flakes) {
                f.shape = shape;
            }
        };
        this.toggleCycle = () => {
            for (const f of this.flakes)
                f.cycle = !f.cycle;
        };
        this.setRandomize = (val) => (this.cycleColors = val);
        this.randomizeColors = () => {
            for (const f of this.flakes)
                f.color = randomColor();
        };
        this.changeColor = (color) => {
            for (const f of this.flakes)
                f.color = color;
        };
        this.changeScale = (newScale) => {
            if (newScale === this.scale)
                return;
            for (const f of this.flakes) {
                f.r = newScale;
            }
        };
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
            // calculate time delta from last render
            const delta = elapsedTime - (this.lastFrameTime || 0);
            // queue an animation frame
            requestAnimationFrame(this.drawFlakes);
            // skip this render if fps interval has not been reached or if paused
            if ((this.lastFrameTime && delta < this.fps) || this.isPaused)
                return;
            // update the previous render time for next delta calculation
            this.lastFrameTime = elapsedTime;
            // clear frame
            this.ctx.clearRect(0, 0, this.w, this.h);
            // render each flake
            for (const f of this.flakes) {
                f.draw(this.ctx);
            }
        };
    }
}
export default Snow;
//# sourceMappingURL=index.js.map