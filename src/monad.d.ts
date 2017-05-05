/**
 * @typedef {Object} {Pr<U>}
 */
export declare type Pr<U> = M<U> | U;
/**
 * @typedef {function(v: T) => Pr<U>} MF<T, U>
 */
export declare type MF<T, U> = (v: T) => Pr<U>;
/**
 * @interface {M}
 */
export interface M<T> {
    just<T, U>(f: MF<T, U>, v: T): Pr<U>;
    errorHandler(e: Error | string): Error;
}
/**
 * class Monad - base class.
 * @implements {M}
 */
export declare class Monad<T> implements M<T> {
    /**
     * get Error or string return Error.
     * @param {Error | string} e - Error obj. or string.
     * @return {Error} throw Error.
     * @protected
     */
    errorHandler(e: Error | string): Error;
    /**
     * produce result after execution f(v).
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @param {T} v - underlying value.
     * @return {Pr<U>} monadic value from v or transformed value by f(v).
     * @protected
     */
    just<T, U>(f: MF<T, U>, v: T): Pr<U>;
}
