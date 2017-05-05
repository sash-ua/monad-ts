
import {Monad} from "./monad";

/**
 * Class List - transform every element of array with given function "contemporaneously".
 * @extends {Monad}
 */
export class List<T> extends Monad<T> {
    /**
     * Method to transform every element of array with given function "contemporaneously".
     * @param {function(n: T) => U} f - transformation function for a monad.
     * @param {Array<T>} v - underlying value for a monad.
     * @return {Array<U>} monadic value from v or transformed value by F(v).
     */
    bind<U>(f: (n: T)=> U, v: Array<T>): Array<U>{
        return this._disp(f, v);
    }
    /**
     * @param {function(n: T) => U} f - transformation function for a monad.
     * @param {any} v - underlying value for a monad.
     * @return {Array<U>} given value v or transformed value by F(v).
     * @private
     */
    private _disp<U>(f: (n: T)=> U, v: any): Array<U>{
        return v.map((vL: any) =>{
            return !Array.isArray(vL) ? f(vL) : this._disp(f, vL);
        });
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.

