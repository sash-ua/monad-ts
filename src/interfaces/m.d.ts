import { MF } from "../types/mf";
import { Pr } from "../types/pr";
/**
 * interface M<T>{
 *
 *  just<T,U>(f: MF<T, U>, v: T): Pr<U>;
 *
 *  errorHandler(e: Error | string): Error;
 *
 * }
 * @interface
 * @name M - monads interface, {@link Monad}.
 * @noimport true
 */
export declare class M<T> {
    /**
     * extracts value from monad.
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @param {T} v - underlying value.
     * @return {Pr<U>} extracts transformed value by f(v).
     */
    just<T, U>(f: MF<T, U>, v: T): Pr<U>;
    /**
     * errors handler.
     * @param {Error | string} e - Error obj. or string.
     * @return {Error}
     */
    errorHandler(e: Error | string): Error;
}
