"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * class Monad.
 * @implements {M}
 */
var Monad = (function () {
    function Monad() {
    }
    /**
     * Method get Error or string return Error
     * @protected
     * @param {Error | string} e - Error obj. or string.
     * @return {Error} throw Error.
     */
    Monad.prototype.errorHandler = function (e) {
        return e instanceof Error ? e : new Error(e);
    };
    /**
     * Function that wraps the given value.
     * @protected
     * @param {MF<T, U>} f - function(v: any)
     * @param {U} v - any type value
     * @return {Pr<U>} given value v or transformed value by f(v)
     */
    Monad.prototype.just = function (f, v) {
        return f(v);
    };
    return Monad;
}());
exports.Monad = Monad;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
