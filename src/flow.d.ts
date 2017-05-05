import { MF, Monad, Pr } from "./monad";
import { Maybe } from "./maybe";
import { ErrorM } from "./error";
/**
 * Class Flow. For composing monads in a pipe.
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
     * @param {any} flow - initial value when start new pipe.
     */
    constructor(flow: any);
    /**
     * chain the operations on a monadic values.
     * @param {function(v: T) => Pr<U>} f - transformation function for a main flow value.
     * @param {any} [v= this.flow] - underlying value for a monad.
     * @return {any} monadic value from v or transformed value by f(v) or throw Error.
     */
    bind<T, U>(f?: MF<T, U>, v?: any): this;
    /**
     * create branch from a pipe.
     * @param {function(v: T) => Pr<U>} f - transformation function for a main flow value.
     * @return {Flow}
     */
    let<T, U>(f: MF<T, U>): Pr<U>;
    /**
     * extract value from a pipe.
     * @return {any}
     */
    subscribe<T>(): T;
}
