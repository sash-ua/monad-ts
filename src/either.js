"use strict";
/**
 * D<T> - dispatcher's type function.
 * @public
 * @typedef {function(v: T): Boolean} D<T>
 */
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
/**
 * Class Either - represents computation with two possibilities.
 * @extends {Monad}
 */
var Either = (function (_super) {
    __extends(Either, _super);
    /**
     * Create an instance of class Either.
     * @param {function(v: T) => Pr<Z>} r - right function.
     * @param {function(v: U) => Pr<N>} l - left function.
     */
    function Either(r, l) {
        var _this = _super.call(this) || this;
        _this.r = r;
        _this.l = l;
        return _this;
    }
    /**
     * binds controller function and underlying value to the monad.
     * @param {function (v: T) => boolean} f - controller function, after execution f(v) produce true (execute right
     func-n) or false (execute left func-n).
     * @param {T} v - underlying value for the monad.
     * @returns {Pr<any> | Error}
     */
    Either.prototype.bind = function (f, v) {
        switch (f(v)) {
            case true:
                return this.r(v);
            case false:
                return this.l(v);
            default:
                return this.errorHandler('Either. Binding error');
        }
    };
    return Either;
}(monad_1.Monad));
exports.Either = Either;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
