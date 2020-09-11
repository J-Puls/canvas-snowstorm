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
//# sourceMappingURL=updatePosition.js.map