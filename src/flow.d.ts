import { Monad } from "./monad";
import { Maybe } from "./maybe";
import { ErrorM } from "./error";
import { MF } from "./types/mf";
/**
 * Class Flow - for composing monads in a flow (pipe).
 * @extends {Monad}
 */
export declare class Flow<T> extends Monad<T> {
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
     * create an instance of class Flow.
     * @param {any} flow - initial value of new flow (pipe).
     */
    constructor(flow: any);
    /**
     * chains the operations on a monadic values.
     * @param {function(v: T) => Pr<U>} f - transformation function for a main flow value.
     * @param {any} [v= this.flow] - underlying value for a monad.
     * @return {Flow<T>} transformed by f() value v or throw Error or null.
     */
    bind<T, U>(f?: MF<T, U>, v?: any): Flow<T>;
    /**
     * create branch from a flow (pipe).
     * @param {function(v: T) => Pr<U>} f - transformation function for a main flow value.
     * @return {Flow<T>}
     */
    let<T, U>(f: MF<T, U>): Flow<T>;
    /**
     * extract value from a flow (pipe).
     * @return {T}
     */
    subscribe<T>(): T;
}
