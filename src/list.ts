
import {MF, Monad, Pr} from "./monad";

/**
 * Class List.
 * @extends {Monad}
 */
export class List<T> extends Monad<T> {
    /**
     * Method that chains the operations on a monadic values
     * @param {function(v: any)} f - transformation function for a monad
     * @param {T} v - underlying value for a monad.
     * @return {Pr<U>} given value v or transformed value by F(v)
     */
    bind<U>(f: MF<T, U>, v: T): Pr<U> | Array<T>{
        return this._disp(f, v);
    }
    /**
     * @param {function(v: any)} f - transformation function of a monad
     * @param {any} v - underlying value for a monad.
     * @return {Pr<U>} given value v or transformed value by F(v)
     * @private
     */
    private _disp<U>(f: MF<T, U>, v: any): Pr<U>{
        return v.map((vL: T): Pr<U> =>{
            return !Array.isArray(vL) ? f(vL) : this._disp(f, vL);
        });
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.

