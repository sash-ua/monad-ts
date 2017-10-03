import {Monad} from "./monad";
import {MF} from './types/mf';
import {Pr} from './types/pr';

/**
 * Class List - transform every element of array with given function "contemporaneously".
 * @extends {Monad}
 */
export class List<T> extends Monad<T> {
    /**
     * Transform every element of array with given function
     * @method bind
     * @param {MF<T, U>} f - transformation function for a monad.
     * @param v - underlying value for a monad.
     * @return {Pr<U> | Error} transformed by f() value v or error if input arg is not array.
     */
    bind<T, U>(f:  MF<T, U>, v: any): Pr<U> | Error{
        return Array.isArray(v) ? this._disp(f, v): this.fail('List.bind() - input must be an array.');
    }
    /**
     * @method _disp
     * @param {function(n: T) => U} f - transformation function for a monad.
     * @param {any} v - underlying value for a monad.
     * @return {Array<U>} transformed by f() value v.
     * @private
     */
    private _disp<U>(f:  MF<T, U>, v: any): Pr<U>{
        return v.map((vL: any) =>{
            return !Array.isArray(vL) ? f(vL) : this._disp(f, vL);
        });
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.

