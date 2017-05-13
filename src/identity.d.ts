import { Monad } from "./monad";
import { MF } from "./types/mf";
import { Pr } from "./types/pr";
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
     * chains the operations on a monadic value.
     * @param {function(v: T) => Pr<U>} f - transformation function for the monad.
     * @param {T} [v = this.v] v - underlying value for the monad.
     * @return {Pr<U> | Error}
     */
    bind<T, U>(f: MF<T, U>, v?: T): Pr<U> | Error;
}
