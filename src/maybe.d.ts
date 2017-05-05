import { MF, Monad, Pr } from "./monad";
/**
 * Class Maybe - return given value or produce null if take nothing or get nothing after execution of f(v).
 * @extends {Monad}
 */
export declare class Maybe<T> extends Monad<T> {
    /**
     * chains the operations on a monadic values.
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @param {T} v - underlying value for a monad.
     * @return {Pr<U>} monadic value from v or transformed value by f(v).
     */
    bind<T, U>(f: MF<T, U>, v: T): Pr<U>;
    /**
     * return nothing (null).
     * @return {null}
     */
    nothing(): any;
}
