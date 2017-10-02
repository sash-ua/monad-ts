import {Monad} from "./monad";
import {MF} from "./types/mf";
import {Pr} from "./types/pr";

/**
 * Class Maybe - return given value or produce null if take nothing or get nothing after execution of f(v).
 * @extends {Monad}
 */
export class Maybe<T> extends Monad<T> {
    /**
     * Chains the operations on a monadic values.
     * @method bind
     * @param {MF<T, U>} f - transformation function for a monad.
     * @param {T} v - underlying value for a monad.
     * @return {Pr<U>} transformed by f() value v.
     */
    bind<T, U>(f: MF<T, U>, v: T): Pr<U>{
        if(v === null || v === undefined){
            return this.nothing();
        } else {
            const vL: any = this.just(f, v);
            return (vL === null || vL === undefined) ? this.nothing() : vL;
        }
    }
    /**
     * Return nothing (null).
     * @method nothing
     * @return {null}
     */
    nothing(): any{
        return null;
    };
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
