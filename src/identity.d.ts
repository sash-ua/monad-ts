import { Monad } from "./monad";
import { MF } from "./types/mf";
import { Pr } from "./types/pr";
import { ErrorM } from "./error";
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
     * @type {ErrorM<T>}
     * @protected
     */
    protected err: ErrorM<T>;
    /**
     * creates an instance of class Identity.
     * @param {any} v - The initial state of app.
     * */
    constructor(v?: any);
    /**
     * chains the operations on a monadic value.
     * @param {MF<T, U>} f - transformation function for the monad.
     * @param {any} [v = this.v]- underlying value for the monad, Can not be null or undefined.
     * @return {Pr<U> | Error}
     */
    bind<T, U>(f: MF<T, U>, v?: any): Pr<U> | Error;
}
