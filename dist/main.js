var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("randomInt", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.randomInt = void 0;
    exports.randomInt = function (min, max) {
        return Math.round(Math.random() * (max - min + 1) + min);
    };
    exports.default = exports.randomInt;
});
define("Flake", ["require", "exports", "randomInt"], function (require, exports, randomInt_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Flake = void 0;
    var Flake = /** @class */ (function () {
        function Flake(x, y, r, color) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.color = color;
            this.offset = randomInt_1.randomInt(-99, 99);
            this.inc = 1;
        }
        Flake.prototype.draw = function (ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        };
        return Flake;
    }());
    exports.Flake = Flake;
    exports.default = Flake;
});
define("generateFlakes", ["require", "exports", "Flake", "randomInt"], function (require, exports, Flake_1, randomInt_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateFlakes = void 0;
    Flake_1 = __importDefault(Flake_1);
    randomInt_2 = __importDefault(randomInt_2);
    exports.generateFlakes = function (size, amount, scale, clr, w, h) {
        var arr = [];
        var i = 0;
        var color = function () {
            return clr === "random"
                ? "hsl(" + Math.floor(Math.random() * 360) + ", 50%, 50%)"
                : clr;
        };
        while (i < amount * 100) {
            arr.push(new Flake_1.default(randomInt_2.default(0, w), randomInt_2.default(0, h), Math.random() * (scale * size), color()));
            i++;
        }
        return arr;
    };
    exports.default = exports.generateFlakes;
});
define("updatePosition", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updatePosition = void 0;
    exports.updatePosition = function (shape, speed, multiplier, h) {
        shape.offset === -100 && (shape.inc = 1);
        shape.offset === 100 && (shape.inc = -1);
        shape.x =
            shape.x +
                shape.inc * Math.random() * (speed * shape.r * (multiplier / 100));
        shape.y = shape.y > h ? 0 : shape.y + 1 * (shape.r / (speed * multiplier));
        shape.offset += shape.inc;
    };
});
define("drawShapes", ["require", "exports", "updatePosition"], function (require, exports, updatePosition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.drawShapes = void 0;
    exports.drawShapes = function (ctx, flakeArr, multiplier, h, w, speed) {
        flakeArr.forEach(function (flake) {
            flake.draw(ctx);
            updatePosition_1.updatePosition(flake, speed, multiplier, h);
        });
    };
    exports.default = exports.drawShapes;
});
define("index", ["require", "exports", "generateFlakes", "drawShapes"], function (require, exports, generateFlakes_1, drawShapes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.snow = void 0;
    exports.snow = function (speed, scale, amount, color, fps, w, h, el) {
        if (speed === void 0) { speed = 1; }
        if (scale === void 0) { scale = 1; }
        if (amount === void 0) { amount = 1; }
        if (color === void 0) { color = "white"; }
        if (fps === void 0) { fps = 60; }
        if (w === void 0) { w = window.innerWidth; }
        if (h === void 0) { h = window.innerHeight; }
        var canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.classList.add("canvas-snowstorm");
        var ctx = canvas.getContext("2d");
        el.appendChild(canvas);
        var back = generateFlakes_1.generateFlakes(1, amount, scale, color, w, h);
        var mid = generateFlakes_1.generateFlakes(2, amount, scale, color, w, h);
        var fore = generateFlakes_1.generateFlakes(3, amount, scale, color, w, h);
        var moveShapes = function () {
            ctx.clearRect(0, 0, w, h);
            drawShapes_1.drawShapes(ctx, back, 5, h, w, speed);
            drawShapes_1.drawShapes(ctx, mid, 12.5, h, w, speed);
            drawShapes_1.drawShapes(ctx, fore, 15, h, w, speed);
        };
        var animate = setInterval(moveShapes, 1000 / fps);
        document.body.addEventListener("resize", function () {
            if (window.outerHeight !== h)
                h = window.outerHeight;
            if (window.outerWidth !== w) {
                clearInterval(animate);
                w = window.outerWidth;
                animate = setInterval(moveShapes, 1000 / fps);
            }
        });
    };
    exports.default = exports.snow;
});
