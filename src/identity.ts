
import {MF, Monad, Pr} from "./monad";

/**
 * Class Identity - wraps underlying value into the monadic value and compute results from a monadic value.
 * @extends {Monad}
 */
export class Identity<T> extends Monad<T> {
    /**
     * @type {any}
     * @protected
     */
    protected v: any;
    /**
     * create an instance of class Identity.
     * @param {T} v - The initial state of app.
     * */
    constructor(v?: T){
        super();
        /**
         * it hold underlying value of a monad.
         * @type {T}
         */
        this.v = v;
    }
    /**
     * chains the operations on a monadic values.
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @return {Pr<U>} monadic value from v or transformed value by f(v).
     */
    bind<T, U>(f: MF<T, U>): Pr<U>{
        return f(this.v);
    }
    /**
     * Inherit method just() from Monad.
     */
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
