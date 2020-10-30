"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flake = void 0;
var Flake = /** @class */ (function () {
    function Flake(r, x, y, dy, color, h, w) {
        var _this = this;
        this.updatePosition = function () {
            if (_this.y >= _this.h) {
                _this.y = -_this.r;
                _this.x > _this.w / 2 ? _this.w / 2 - _this.startX : _this.startX;
                _this.dx = _this.dy / 2;
            }
            else {
                _this.y += _this.dy;
                _this.x += _this.dx;
            }
            if (_this.dxLimit < 0) {
                _this.dx > _this.dxLimit
                    ? (_this.dx -= 0.005)
                    : (_this.dxLimit = -_this.dxLimit);
            }
            else if (_this.dxLimit > 0) {
                _this.dx < _this.dxLimit
                    ? (_this.dx += 0.005)
                    : (_this.dxLimit = -_this.dxLimit);
            }
        };
        this.draw = function (ctx) {
            ctx.fillStyle = _this.color;
            ctx.beginPath();
            ctx.arc(_this.x, _this.y, _this.r, 0, Math.PI * 2);
            ctx.fill();
            _this.updatePosition();
        };
        this.r = r;
        this.x = x;
        this.startX = x;
        this.startY = y;
        this.y = y;
        this.dy = Math.random() * dy;
        this.dx = this.dy / 2;
        this.dxLimit = -this.dx;
        this.color = color;
        this.h = h;
        this.w = w;
    }
    return Flake;
}());
exports.Flake = Flake;
exports.default = Flake;
//# sourceMappingURL=Flake.js.map