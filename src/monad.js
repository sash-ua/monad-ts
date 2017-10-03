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
     * Takes Error or string return Error.
     * @method fail
     * @param {Error | string} e - Error obj. or string.
     * @return {Error}
     * @protected
     */
    Monad.prototype.fail = function (e) {
        return e instanceof Error ? e : new Error(e);
    };
    /**
     * Produces result after execution f(v).
     * @method just
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
