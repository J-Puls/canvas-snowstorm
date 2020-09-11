var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("randomInt", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.randomInt = void 0;
    exports.randomInt = (min, max) => {
        return Math.round(Math.random() * (max - min + 1) + min);
    };
    exports.default = exports.randomInt;
});
define("Flake", ["require", "exports", "randomInt"], function (require, exports, randomInt_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Flake = void 0;
    class Flake {
        constructor(x, y, r, color) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.color = color;
            this.offset = randomInt_1.randomInt(-99, 99);
            this.inc = 1;
        }
        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        }
    }
    exports.Flake = Flake;
    exports.default = Flake;
});
define("generateFlakes", ["require", "exports", "Flake", "randomInt"], function (require, exports, Flake_1, randomInt_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateFlakes = void 0;
    Flake_1 = __importDefault(Flake_1);
    randomInt_2 = __importDefault(randomInt_2);
    exports.generateFlakes = (size, amount, scale, clr, w, h) => {
        let arr = [];
        let i = 0;
        let color = () => {
            return clr === "random"
                ? `hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`
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
    exports.updatePosition = (shape, speed, multiplier, h) => {
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
    exports.drawShapes = (ctx, flakeArr, multiplier, h, w, speed) => {
        flakeArr.forEach((flake) => {
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
    exports.snow = (speed = 1, scale = 1, amount = 1, color = "white", fps = 60, w = window.innerWidth, h = window.innerHeight, el) => {
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.classList.add("canvas-snowstorm");
        const ctx = canvas.getContext("2d");
        el.appendChild(canvas);
        let back = generateFlakes_1.generateFlakes(1, amount, scale, color, w, h);
        let mid = generateFlakes_1.generateFlakes(2, amount, scale, color, w, h);
        let fore = generateFlakes_1.generateFlakes(3, amount, scale, color, w, h);
        const moveShapes = () => {
            ctx.clearRect(0, 0, w, h);
            drawShapes_1.drawShapes(ctx, back, 5, h, w, speed);
            drawShapes_1.drawShapes(ctx, mid, 12.5, h, w, speed);
            drawShapes_1.drawShapes(ctx, fore, 15, h, w, speed);
        };
        let animate = setInterval(moveShapes, 1000 / fps);
        document.body.addEventListener("resize", () => {
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
