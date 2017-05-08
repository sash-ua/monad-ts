/**
 * D<T> - dispatcher's type function.
 * @public
 * @typedef {function(v: T): Boolean} 'D<T>
 */
import { Monad, Pr } from "./monad";
/** Comment for ESDoc */
export declare type D<T> = (v: T) => boolean;
/**
 * Class Either - represents computation with two possibilities.
 * @extends {Monad}
 */
export declare class Either<T, U> extends Monad<T> {
    private r;
    private l;
    /**
     * @type {T} uVal - keep underlying value in the monad
     */
    private uVal;
    /**
     * Create an instance of class Either.
     * @param {function(v: T) => Pr<Z>} r - right function.
     * @param {function(v: U) => Pr<N>} l - left function.
     */
    constructor(r: <T, Z>(v: T) => Pr<Z>, l: <N, U>(v: U) => Pr<N>);
    /**
     * binds controller function and underlying value to the monad.
     * @param {function (v: T) => boolean} f - controller function, after execution f(v) produce true (execute right
     func-n) or false (execute left func-n).
     * @param {T} v - underlying value for the monad.
     * @returns {Pr<any> | Error}
     */
    bind(f: D<T>, v: T): Pr<any> | Error;
    /**
     * extract result of left(v) computation.
     * @param {T} v - underlying value.
     * @return {Pr<N>}
     */
    left<T, N>(v: T): Pr<any>;
    /**
     * extract result of right(v) computation.
     * @param {T} v - underlying value.
     * @return {Pr<Z>}
     */
    right<T, Z>(v: T): Pr<any>;
}
