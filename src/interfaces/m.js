"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * interface M<T>{
 *
 *  just<T,U>(f: MF<T, U>, v: T): Pr<U>;
 *
 *  errorHandler(e: Error | string): Error;
 *
 * }
 * @interface
 * @name M - monads interface, {@link Monad}.
 * @noimport true
 */
var M = (function () {
    function M() {
    }
    /**
     * extracts value from monad.
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @param {T} v - underlying value.
     * @return {Pr<U>} extracts transformed value by f(v).
     */
    M.prototype.just = function (f, v) {
        return void 0;
    };
    ;
    /**
     * errors handler.
     * @param {Error | string} e - Error obj. or string.
     * @return {Error}
     */
    M.prototype.errorHandler = function (e) {
        return void 0;
    };
    ;
    return M;
}());
exports.M = M;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
