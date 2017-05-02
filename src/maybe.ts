import {MF, Monad, Pr} from "./monad";

/**
 * Class Maybe
 * @extends {Monad}
 */
export class Maybe<T> extends Monad<T>{
    /**
     * Method that chains the operations on a monadic values
     * @param {function(v: any)} f - transformation function for a monad
     * @param {any} v - underlying value for a monad.
     * @return {Pr<U>} given value v or transformed value by f(v)
     */
    bind<T, U>(f: MF<T, U>, v: any): Pr<U>{
        if(v === null || v === undefined){
            return this.nothing();
        } else {
            const vL: any = this.just(f, v);
            return (vL === null || vL === undefined) ? this.nothing() : vL;
        }
    }
    /**
     * return nothing (null)
     * @returns {null}
     */
    nothing(): any{
        return null;
    };
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
