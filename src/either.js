"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var monad_1 = require("./monad");
var equality_1 = require("./services/equality");
/**
 * Class Either - represents computation with two possibilities.
 * @extends {Monad}
 */
var Either = /** @class */ (function (_super) {
    __extends(Either, _super);
    /**
     * Creates an instance of class Either.
     * @param {function(v: any) => any} r - right function.
     * @param {function(v: any) => any} l - left function.
     */
    function Either(r, l) {
        var _this = _super.call(this) || this;
        _this.r = r;
        _this.l = l;
        return _this;
    }
    /**
     * Binds controller function and underlying value to the monad.
     * @method bind
     * @param {D<T>} f - controller function, after execution f(v) produce true (execute right func-n) or false (execute left func-n).
     * @param {any} v - underlying value for the monad.
     * @return {boolean | Pr<any> | Error}
     */
    Either.prototype.bind = function (f, v) {
        this.uVal = v;
        try {
            switch (f(v)) {
                case true:
                    return this.r(v);
                case false:
                    return this.l(v);
                default:
                    return this.fail('Either.bind() - binding error');
            }
        }
        catch (e) {
            this.fail("Either.bind().switch - " + e);
        }
    };
    /**
     * Extract result of left(v) computation.
     * @method left
     * @param {T} v - underlying value.
     * @return {Pr}
     */
    Either.prototype.left = function (v) {
        return this.uVal ? equality_1.equality(this.uVal, v) ? this.l(v) : this.fail('Either.left() - v have been binded with bind method') : this.l(v);
    };
    /**
     * Extract result of right(v) computation.
     * @method right
     * @param {T} v - underlying value.
     * @return {Pr}
     */
    Either.prototype.right = function (v) {
        return this.uVal ? equality_1.equality(this.uVal, v) ? this.r(v) : this.fail('Either.right() - v have been binded with bind method') : this.r(v);
    };
    return Either;
}(monad_1.Monad));
exports.Either = Either;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
