import { MF, Monad, Pr } from "./monad";
/**
 * Class ErrorM - return given value or produce Error if take Error or get Error after execution of f(v).
 * @extends {Monad}
 */
export declare class ErrorM<T> extends Monad<T> {
    /**
     * create an instance of class ErrorM.
     */
    constructor();
    /**
     * Method that chains the operations on a monadic values.
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @param {any} v - underlying value for a monad.
     * @return {Pr<U>  | Error} monadic value from v or transformed value by f(v) or throw Error.
     */
    bind<T, U>(f: MF<T, U>, v: any): Pr<U> | Error;
}
