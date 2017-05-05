import { MF, Monad, Pr } from "./monad";
/**
 * Class Identity - wrap underlying value into the monadic value and computing results from a monadic value.
 * @extends {Monad}
 */
export declare class Identity<T> extends Monad<T> {
    /**
     * @type {any}
     * @protected
     */
    protected v: any;
    /**
     * Create an instance of class Identity.
     * @param {T} v - The initial state of app.
     * */
    constructor(v?: T);
    /**
     * chains the operations on a monadic values.
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @return {Pr<U>} monadic value from v or transformed value by f(v).
     */
    bind<T, U>(f: MF<T, U>): Pr<U>;
}
