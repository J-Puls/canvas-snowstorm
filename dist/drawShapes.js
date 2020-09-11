"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawShapes = void 0;
var updatePosition_1 = require("./updatePosition");
exports.drawShapes = function (ctx, flakeArr, multiplier, h, w, speed) {
    flakeArr.forEach(function (flake) {
        flake.draw(ctx);
        updatePosition_1.updatePosition(flake, speed, multiplier, h);
    });
};
exports.default = exports.drawShapes;
//# sourceMappingURL=drawShapes.js.map