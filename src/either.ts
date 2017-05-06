/**
 * D<T> - dispatcher's type function.
 * @public
 * @typedef {function(v: T): Boolean} D<T>
 */

import {Monad, Pr} from "./monad";

/** Comment for ESDoc */
export type D<T> = (v: T) => boolean;

/**
 * Class Either - represents computation with two possibilities.
 * @extends {Monad}
 */
export class Either<T, U> extends  Monad<T>{
    /**
     * Create an instance of class Either.
     * @param {function(v: T) => Pr<Z>} r - right function.
     * @param {function(v: U) => Pr<N>} l - left function.
     */
    constructor(
        private r: <T, Z>(v: T) => Pr<Z>,
        private l: <N, U>(v: U) => Pr<N>
    ){
        super();
    }

    /**
     * binds controller function and underlying value to the monad.
     * @param {function (v: T) => boolean} f - controller function, after execution f(v) produce true (execute right
     func-n) or false (execute left func-n).
     * @param {T} v - underlying value for the monad.
     * @returns {Pr<any> | Error}
     */
    bind(f: D<T>, v: T): Pr<any> | Error{
        switch (f(v)){
            case true:
                return this.r(v);
            case false:
                return this.l(v);
            default:
                return this.errorHandler('Either. Binding error');
        }
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.