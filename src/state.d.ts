import { Monad } from "./monad";
import { Maybe } from "./maybe";
import { ErrorM } from "./error";
/**
 * Class State - for application state manipulations.
 * @extends {Monad}
 */
export declare class State<T> extends Monad<T> {
    /**
     * @type {any}
     * @protected
     */
    protected state: any;
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
     * creates an instance of class State.
     * @param {Object} state - the initial state of app.
     */
    constructor(state: T);
    /**
     * changes the state of application variables.
     * @param {function(v: T)=> T} f - app. state transformation function.
     * @return {State<T>}
     */
    put(f: (v: T) => T): State<T>;
    /**
     * extracts the state of application variables.
     * @return {T}
     */
    get(): T;
}
