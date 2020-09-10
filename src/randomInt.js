"use strict";
exports.__esModule = true;
exports.randomInt = void 0;
exports.randomInt = function (min, max) {
    return Math.round(Math.random() * (max - min + 1) + min);
};
exports["default"] = exports.randomInt;
