"use strict";
exports.__esModule = true;
exports.Flake = void 0;
var randomInt_1 = require("./randomInt");
var Flake = /** @class */ (function () {
    function Flake(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.offset = randomInt_1["default"](-99, 99);
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
exports["default"] = Flake;
