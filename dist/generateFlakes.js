"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFlakes = void 0;
var Flake_1 = __importDefault(require("./Flake"));
var randomInt_1 = __importDefault(require("./randomInt"));
exports.generateFlakes = function (size, amount, scale, clr, w, h) {
    var arr = [];
    var i = 0;
    var color = function () {
        return clr === "random"
            ? "hsl(" + Math.floor(Math.random() * 360) + ", 50%, 50%)"
            : clr;
    };
    while (i < amount * 100) {
        arr.push(new Flake_1.default(randomInt_1.default(0, w), randomInt_1.default(0, h), Math.random() * (scale * size), color()));
        i++;
    }
    return arr;
};
exports.default = exports.generateFlakes;
//# sourceMappingURL=generateFlakes.js.map