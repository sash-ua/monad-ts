import { Monad } from "./monad";
/**
 * Class List - transform every element of array with given function "contemporaneously".
 * @extends {Monad}
 */
export declare class List<T> extends Monad<T> {
    /**
     * method transforms every element of array with given function "contemporaneously".
     * @param {function(n: T) => U} f - transformation function for a monad.
     * @param {any} v - underlying value for a monad.
     * @return {Array<U> | Error} transformed by f() value v or error if input arg is not array.
     */
    bind<U>(f: (n: T) => U, v: any): Array<U> | Error;
    /**
     * @param {function(n: T) => U} f - transformation function for a monad.
     * @param {any} v - underlying value for a monad.
     * @return {Array<U>} transformed by f() value v.
     * @private
     */
    private _disp<U>(f, v);
}
