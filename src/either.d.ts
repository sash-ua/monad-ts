import { Monad } from "./monad";
import { Pr } from "./types/pr";
import { D } from './types/d';
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
     * Creates an instance of class Either.
     * @param {function(v: any) => any} r - right function.
     * @param {function(v: any) => any} l - left function.
     */
    constructor(r: (v: any) => any, l: (v: any) => any);
    /**
     * Binds controller function and underlying value to the monad.
     * @method bind
     * @param {D<T>} f - controller function, after execution f(v) produce true (execute right func-n) or false (execute left func-n).
     * @param {any} v - underlying value for the monad.
     * @return {boolean | Pr<any> | Error}
     */
    bind<T, U>(f: D<T>, v: any): boolean | Pr<any> | Error;
    /**
     * Extract result of left(v) computation.
     * @method left
     * @param {T} v - underlying value.
     * @return {Pr}
     */
    left<T>(v: T): Pr<any>;
    /**
     * Extract result of right(v) computation.
     * @method right
     * @param {T} v - underlying value.
     * @return {Pr}
     */
    right<T>(v: T): Pr<any>;
}
