"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var generateFlakes_1 = __importDefault(require("./generateFlakes"));
var Snow = /** @class */ (function () {
    function Snow(speed, scale, amount, color, fps, width, height, el) {
        var _this = this;
        if (speed === void 0) { speed = 1; }
        if (scale === void 0) { scale = 1; }
        if (amount === void 0) { amount = 1; }
        if (color === void 0) { color = "white"; }
        if (fps === void 0) { fps = 30; }
        if (width === void 0) { width = window.innerWidth; }
        if (height === void 0) { height = window.innerHeight; }
        if (el === void 0) { el = document.body; }
        this.start = function () {
            _this.root.appendChild(_this.canvas);
            requestAnimationFrame(_this.drawFlakes);
        };
        this.pause = function () { return (_this.isPaused = true); };
        this.play = function () { return (_this.isPaused = false); };
        this.toggle = function () { return (_this.isPaused = !_this.isPaused); };
        this.changeScale = function (newScale) {
            if (newScale === _this.scale)
                return;
            for (var _i = 0, _a = _this.flakes; _i < _a.length; _i++) {
                var f = _a[_i];
                f.r = newScale;
            }
        };
        this.h = height;
        this.w = width;
        this.root = el;
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.position = "absolute";
        this.canvas.style.top = "0px";
        this.ctx = this.canvas.getContext("2d");
        this.scale = scale;
        this.speed = speed;
        this.isPaused = false;
        this.flakes = generateFlakes_1.default(this.speed, this.scale, amount, color, this.h, this.w);
        this.fps = Math.floor(1000 / fps);
        this.lastFrameTime = 0;
        this.renderer = null;
        this.drawFlakes = function (elapsedTime) {
            // Calculate time delta from last render
            var delta = elapsedTime - (_this.lastFrameTime || 0);
            // Queue an animation frame
            requestAnimationFrame(_this.drawFlakes);
            // Skip this render if fps interval has not been reached or if paused
            if ((_this.lastFrameTime && delta < _this.fps) || _this.isPaused)
                return;
            // Update the previous render time for next delta calculation
            _this.lastFrameTime = elapsedTime;
            // Render frame
            _this.ctx.clearRect(0, 0, _this.w, _this.h);
            for (var _i = 0, _a = _this.flakes; _i < _a.length; _i++) {
                var f = _a[_i];
                f.draw(_this.ctx);
            }
        };
    }
    return Snow;
}());
exports.default = Snow;
//# sourceMappingURL=index.js.map