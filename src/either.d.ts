import { Monad } from "./monad";
import { Pr } from "./types/pr";
import { D } from './types/d';
/**
 * Class Either - represents computation with two possibilities.
 * @extends {Monad}
 * @implements {Binding}
 */
export declare class Either<T, U> extends Monad<T> {
    private r;
    private l;
    /**
     * @type {T} uVal - keep underlying value in the monad
     */
    private uVal;
    /**
     * creates an instance of class Either.
     * @param {function(v: any) => any} r - right function.
     * @param {function(v: any) => any} l - left function.
     */
    constructor(r: (v: any) => any, l: (v: any) => any);
    /**
     * binds controller function and underlying value to the monad.
     * @param {D<T>} f - controller function, after execution f(v) produce true (execute right func-n) or false (execute left func-n).
     * @param {any} v - underlying value for the monad.
     * @return {boolean | Pr<any> | Error}
     */
    bind<T, U>(f: D<T>, v: any): boolean | Pr<any> | Error;
    /**
     * extract result of left(v) computation.
     * @param {T} v - underlying value.
     * @return {Pr<N>}
     */
    left<T>(v: T): Pr<any>;
    /**
     * extract result of right(v) computation.
     * @param {T} v - underlying value.
     * @return {Pr<Z>}
     */
    right<T>(v: T): Pr<any>;
}
