import {MF} from "../types/mf";
import {Pr} from "../types/pr";

/**
 * interface M<T>{
 *
 * protected just<T,U>(f: MF<T, U>, v: T): Pr<U>;
 *
 * protected  fail(e: Error | string): Error;
 *
 * }
 * @interface
 * @name M - monads interface, {@link Monad}.
 * @noimport true
 */
export interface M<T>{
    /**
     * Extracts value from monad.
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @param {T} v - underlying value.
     * @return {Pr<U>} extracts transformed value by f(v).
     * @protected
     */
    just<T,U>(f: MF<T, U>, v: T): Pr<U>;

    /**
     * Execute on error occur.
     * @param {Error | string} e - Error obj. or string.
     * @return {Error}
     * @protected
     */
    fail(e: Error | string): Error;
}



//Copyright (c) 2017 Alex Tranchenko. All rights reserved.