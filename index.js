"use strict";
exports.__esModule = true;
exports.snow = void 0;
var generateFlakes_1 = require("./src/generateFlakes");
var drawShapes_1 = require("./src/drawShapes");
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
    var back = generateFlakes_1["default"](1, amount, scale, color, w, h);
    var mid = generateFlakes_1["default"](2, amount, scale, color, w, h);
    var fore = generateFlakes_1["default"](3, amount, scale, color, w, h);
    var moveShapes = function () {
        ctx.clearRect(0, 0, w, h);
        drawShapes_1["default"](ctx, back, 5, h, w, speed);
        drawShapes_1["default"](ctx, mid, 12.5, h, w, speed);
        drawShapes_1["default"](ctx, fore, 15, h, w, speed);
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
exports["default"] = exports.snow;
