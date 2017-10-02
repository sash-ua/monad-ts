import { Maybe } from "./maybe";
import { ErrorM } from "./error";
import { Monad } from './monad';
/**
 * Class State - it takes a state and returns an intermediate value and some new state value.
 * @extends {Monad}
 */
export declare class State<T> extends Monad<T> {
    /**
     * @type {any}
     * @protected
     */
    protected state: any;
    /**
     * @type {Maybe}
     * @protected
     */
    protected maybe: Maybe<T>;
    /**
     * @type {ErrorM}
     * @protected
     */
    protected err: ErrorM<T>;
    /**
     * Creates an instance of the class State with an initialization or not, the initialization can be occur late with bind method.
     * @param {Object} [state] - the initial state of app.
     */
    constructor(state?: T);
    /**
     * It takes an initial state of the monad if monad has initialized in the constructor then function assigns Error to underlying value.
     * @method bind
     * @param {Function} f
     * @param [v] - underlying value for the monad, it can be null.
     */
    bind<T>(f: Function, v?: any): void;
    /**
     * Changes the state of application variables, if you try add new key with put() to state object it'll be assigned
     * with Error instance.
     * @method put
     * @param {function(v: T)=> T} f - app. state transformation function.
     */
    put(f: (v: T) => T): void;
    /**
     * Extracts the state of app.
     * @method get
     * @return {T}
     */
    get<T>(): T;
}
