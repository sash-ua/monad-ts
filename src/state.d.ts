import { Monad } from "./monad";
import { Maybe } from "./maybe";
import { ErrorM } from "./error";
/**
 * Class State. For app. state manipulations.
 * @extends {Monad}
 */
export declare class State<T> extends Monad<T> {
    /**
     * @type {T}
     * @protected
     */
    protected state: T;
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
     * Create an instance of class State.
     * @param {Object} state - The initial state of app.
     */
    constructor(state: T);
    /**
     * @param {function(v: any)} f - function.
     * @return {Object} this (current context) value.
     */
    put(f: (v: any) => T): this;
    /**
     * @return {T} The state of app.
     */
    get(): T;
}
