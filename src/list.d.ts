import { Monad } from "./monad";
import { MF } from './types/mf';
import { Pr } from './types/pr';
/**
 * Class List - transform every element of array with given function "contemporaneously".
 * @extends {Monad}
 */
export declare class List<T> extends Monad<T> {
    /**
     *
     * @param {MF<T, U>} f - transformation function for a monad.
     * @param v - underlying value for a monad.
     * @return {Pr<U> | Error} transformed by f() value v or error if input arg is not array.
     */
    bind<T, U>(f: MF<T, U>, v: any): Pr<U> | Error;
    /**
     * @param {function(n: T) => U} f - transformation function for a monad.
     * @param {any} v - underlying value for a monad.
     * @return {Array<U>} transformed by f() value v.
     * @private
     */
    private _disp<U>(f, v);
}
