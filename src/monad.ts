/**
 * @typedef {Object} {Pr<U>}
 */
export type Pr<U> = M<U> | U ;

/**
 * @typedef {function(v: any) => Pr<U>} {MF<T, U>}
 */
export type MF<T, U> = (v: any)=> Pr<U>;

/**
 * @interface {M}
 */
export interface M<T>{
    inFlow?: any;
    just<T,U>(f: MF<T, U>, v: T): Pr<U>;
    errorHandler(e: Error | string): Error;
    bind?<T,U>(f: MF<T, U>, v: T): Pr<U>;
}

/**
 * class Monad.
 * @implements {M}
 */
export class Monad<T> implements M<T>{
    /**
     * Method get Error or string return Error
     * @protected
     * @param {Error | string} e - Error obj. or string.
     * @return {Error} throw Error.
     */
    errorHandler(e: Error | string): Error{
        return e instanceof Error ? e : new Error(e);
    }
    /**
     * Function that wraps the given value.
     * @protected
     * @param {MF<T, U>} f - function(v: any)
     * @param {U} v - any type value
     * @return {Pr<U>} given value v or transformed value by f(v)
     */
    just<U>(f: MF<T, U>, v:U): Pr<U>{
        return f(v);
    }
}


//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
