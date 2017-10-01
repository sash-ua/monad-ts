import {M} from "./interfaces/m";
import {MF} from "./types/mf";
import {Pr} from "./types/pr";
import {D} from './types/d';

/**
 * Class Monad - Base abstract class.
 * @implements {M}
 * @abstract
 */
export abstract class Monad<T> implements M<T>{
    /**
     * Binds transformation function and underlying value to the monad.
     * @param {MF<T, U> | D<T>} f - transformation function.
     * @param v - underlying value.
     * @return {Pr<U> | Error | boolean}
     * @abstract
     */
    bind<T,U>(f: MF<T, U> | D<T>, v: any): Promise<U> | Pr<U> | Error | boolean{
        return void 0;
    };
    /**
     * takes Error or string return Error.
     * @param {Error | string} e - Error obj. or string.
     * @return {Error}
     * @protected
     */
    errorHandler(e: Error | string): Error{
        return e instanceof Error ? e : new Error(e);
    }
    /**
     * produces result after execution f(v).
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @param {T} v - underlying value.
     * @return {Pr<U>} extracts transformed value by f(v).
     * @protected
     */
    just<T, U>(f: MF<T, U>, v:T): Pr<U>{
        return f(v);
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
