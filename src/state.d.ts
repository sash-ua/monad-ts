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
     * Create an instance of class State.
     * @param {Object} state - The initial state of app.
     */
    constructor(state: T);
    /**
     * @param {function(v: T)=> T} f - app. state transformation function.
     * @return {State}
     */
    put(f: (v: T) => T): this;
    /**
     * @return {T} The state of app.
     */
    get(): T;
}
