import {Monad} from "./monad";
import {equality} from "./services/equality";
import {Pr} from "./types/pr";
import {D} from './types/d';

/**
 * Class Either - represents computation with two possibilities.
 * @extends {Monad}
 * @implements {Binding}
 */
export class Either<T, U> extends  Monad<T> {
    /**
     * @type {T} uVal - keep underlying value in the monad
     */
    private uVal: T;
    /**
     * creates an instance of class Either.
     * @param {function(v: any) => any} r - right function.
     * @param {function(v: any) => any} l - left function.
     */
    constructor(
        private r: (v: any) => any,
        private l: (v: any) => any
    ){
        super();
    }
    /**
     * binds controller function and underlying value to the monad.
     * @param {D<T>} f - controller function, after execution f(v) produce true (execute right func-n) or false (execute left func-n).
     * @param {any} v - underlying value for the monad.
     * @return {boolean | Pr<any> | Error}
     */
    bind<T, U>(f: D<T>, v: any): boolean | Pr<any> | Error{
        this.uVal = v;
        try {
            switch (f(v)){
                case true:
                    return this.r(v);
                case false:
                    return this.l(v);
                default:
                    return this.errorHandler('Either.bind() - binding error');
            }
        } catch (e) {
            this.errorHandler(`Either.bind().switch - ${e}`);
        }
        
    }

    /**
     * extract result of left(v) computation.
     * @param {T} v - underlying value.
     * @return {Pr<N>}
     */
    left<T>(v: T): Pr<any>{
        return this.uVal ? equality(this.uVal, v) ? this.l(v) : this.errorHandler('Either.left() - v have been binded with bind method') : this.l(v);
    }

    /**
     * extract result of right(v) computation.
     * @param {T} v - underlying value.
     * @return {Pr<Z>}
     */
    right<T>(v: T): Pr<any>{
        return this.uVal ? equality(this.uVal, v) ? this.r(v) : this.errorHandler('Either.right() - v have been binded with bind method') : this.r(v);
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.