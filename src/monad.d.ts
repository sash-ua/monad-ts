import { M } from "./interfaces/m";
import { MF } from "./types/MF";
import { Pr } from "./types/PR";
/**
 * Class Monad - base class.
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
     * @return {Pr<U>} extracts transformed value by f(v).
     * @protected
     */
    just<T, U>(f: MF<T, U>, v: T): Pr<U>;
}
