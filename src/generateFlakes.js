"use strict";
exports.__esModule = true;
exports.generateFlakes = void 0;
var Flake_1 = require("./Flake");
var randomInt_1 = require("./randomInt");
exports.generateFlakes = function (size, amount, scale, clr, w, h) {
    var arr = [];
    var i = 0;
    var color = function () {
        return clr === "random"
            ? "hsl(" + Math.floor(Math.random() * 360) + ", 50%, 50%)"
            : clr;
    };
    while (i < amount * 100) {
        arr.push(new Flake_1["default"](randomInt_1["default"](0, w), randomInt_1["default"](0, h), Math.random() * (scale * size), color()));
        i++;
    }
    return arr;
};
exports["default"] = exports.generateFlakes;
