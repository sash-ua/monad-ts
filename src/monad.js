"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class Monad - Base abstract class.
 * @implements {M}
 * @abstract
 */
var Monad = /** @class */ (function () {
    function Monad() {
    }
    /**
     * Binds transformation function and underlying value to the monad.
     * @param {MF<T, U> | D<T>} f - transformation function.
     * @param v - underlying value.
     * @return {Pr<U> | Error | boolean}
     * @abstract
     */
    Monad.prototype.bind = function (f, v) {
        return void 0;
    };
    ;
    /**
     * takes Error or string return Error.
     * @param {Error | string} e - Error obj. or string.
     * @return {Error}
     * @protected
     */
    Monad.prototype.errorHandler = function (e) {
        return e instanceof Error ? e : new Error(e);
    };
    /**
     * produces result after execution f(v).
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @param {T} v - underlying value.
     * @return {Pr<U>} extracts transformed value by f(v).
     * @protected
     */
    Monad.prototype.just = function (f, v) {
        return f(v);
    };
    return Monad;
}());
exports.Monad = Monad;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
