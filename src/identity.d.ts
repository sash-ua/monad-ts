import { Monad } from "./monad";
import { MF } from "./types/MF";
import { Pr } from "./types/PR";
/**
 * Class Identity - wraps underlying value into the monadic value and compute results from a monadic value.
 * @extends {Monad}
 */
export declare class Identity<T> extends Monad<T> {
    /**
     * @type {any}
     * @protected
     */
    protected v: any;
    /**
     * creates an instance of class Identity.
     * @param {T} v - The initial state of app.
     * */
    constructor(v?: T);
    /**
     * chains the operations on a monadic values.
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @return {Pr<U>} transformed by f() value v.
     */
    bind<T, U>(f: MF<T, U>): Pr<U>;
}
