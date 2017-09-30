"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** interface Binding<T>{
    *
    * bind<T,U>(f: MF<T, U> | D<T>, v: any): Pr<U> | Error | boolean;
    *
    * }
 * @interface
 * @name Binding - monads interface to bind transformation function and underlying value to the monad
 * {@link Maybe}, {@link ErrorM}, {@link Either}, {@link Identity}, {@link List}.
 * @noimport true
 **/
var Binding = /** @class */ (function () {
    function Binding() {
    }
    /**
     * binds transformation function and underlying value to the monad.
     * @param {MF<T, U> | D<T>} f - transformation function.
     * @param v - underlying value.
     * @return {Pr<U> | Error | boolean}
     */
    Binding.prototype.bind = function (f, v) {
        return void 0;
    };
    ;
    return Binding;
}());
exports.Binding = Binding;
// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
