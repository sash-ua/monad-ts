
import {Monad} from "./monad";
import {equality} from "./services/equality";
import {Pr} from "./types/PR";
import {D} from "./types/D";

/**
 * Class Either - represents computation with two possibilities.
 * @extends {Monad}
 */
export class Either<T, U> extends  Monad<T>{
    /**
     * @type {T} uVal - keep underlying value in the monad
     */
    private uVal: T;
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
        this.uVal = v;
        switch (f(v)){
            case true:
                return this.r(v);
            case false:
                return this.l(v);
            default:
                return this.errorHandler('Either. Binding error');
        }
    }

    /**
     * extract result of left(v) computation.
     * @param {T} v - underlying value.
     * @return {Pr<N>}
     */
    left<T>(v: T): Pr<any>{
        return this.uVal ? equality(this.uVal, v) ? this.l(v) : this.errorHandler('Either.left. v have been binded with bind method') : this.l(v);
    }

    /**
     * extract result of right(v) computation.
     * @param {T} v - underlying value.
     * @return {Pr<Z>}
     */
    right<T>(v: T): Pr<any>{
        return this.uVal ? equality(this.uVal, v) ? this.r(v) : this.errorHandler('Either.right. v have been binded with bind method') : this.r(v);
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.