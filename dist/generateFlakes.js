"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFlakes = void 0;
var Flake_1 = __importDefault(require("./Flake"));
exports.generateFlakes = function (speed, scale, amount, color, h, w) {
    var randomX = function () {
        return Math.round(Math.random() * w) + 1;
    };
    var randomY = function () {
        return -Math.round(Math.random() * amount) + 1;
    };
    var randomColor = function () {
        return "hsl(" + (Math.floor(Math.random() * 360) + 1) + ", " + (100 - Math.floor(Math.random() * 50) + 1) + "%, 50%)";
    };
    var flakes = [];
    for (var i = 0; i < amount; i++) {
        var clr = color === "random" ? randomColor() : color;
        flakes.push(new Flake_1.default(scale, randomX(), randomY(), speed, clr, h, w));
    }
    return flakes;
};
exports.default = exports.generateFlakes;
//# sourceMappingURL=generateFlakes.js.map