import { Maybe } from "./maybe";
import { ErrorM } from "./error";
import { MF } from "./types/mf";
import { Monad } from "./monad";
/**
 * Class AsyncFlow - for composing monads in an async flow (pipe), based on Promise.
 */
export declare class AsyncFlow<T> extends Monad<T> {
    /**
     * @type {any}
     * @protected
     */
    protected flow: any;
    /**
     * @type {Maybe<T>}
     * @protected
     */
    protected maybe: Maybe<T>;
    /**
     * @type {ErrorM<T>}
     * @protected
     */
    protected err: ErrorM<T>;
    /**
     * creates an instance of class AsyncFlow.
     * @param {any} [initV = 0] initV - initial value of new flow (pipe).
     * @param {boolean} [encapsulate = true] encapsulate - flag, if true then the init value will be cloned.
     */
    constructor(initV?: any, encapsulate?: boolean);
    /**
     * binds initial value to the transformation function
     * @param {function(v: T) => Pr<U>} f - transformation function.
     * @return {Promise<T>}
     */
    bind<T, U>(f: MF<T, U>): Promise<U>;
}
