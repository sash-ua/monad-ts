import { Monad } from "./monad";
import { Pr } from "./types/pr";
import { MF } from "./types/mf";
/**
 * Class ErrorM - return given value or produce Error if take Error or get Error after execution of f(v).
 * @extends {Monad}
 */
export declare class ErrorM<T> extends Monad<T> {
    /**
     * chains the operations on a monadic values.
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @param {any} v - underlying value for a monad.
     * @return {Pr<U>  | Error} transformed by f() value v or Error.
     */
    bind<T, U>(f: MF<T, U>, v: any): Pr<U> | Error;
}
