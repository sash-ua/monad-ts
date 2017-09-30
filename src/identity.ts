
import {Monad} from "./monad";
import {clone} from "./services/clone";
import {MF} from "./types/mf";
import {Pr} from "./types/pr";
import {equality} from "./services/equality";
import {ErrorM} from "./error";
import {Binding} from './interfaces/binding';

/**
 * Class Identity - wraps underlying value into the monadic value and compute results from a monadic value.
 * @extends {Monad}
 * @implements {Binding}
 */
export class Identity<T> extends Monad<T> implements Binding<T> {
    /**
     * @type {any}
     * @protected
     */
    protected v: any;
    /**
     * @type {ErrorM<T>}
     * @protected
     */
    protected err: ErrorM<T>;
    /**
     * creates an instance of class Identity.
     * @param {T} v - The initial state of app.
     * */
    constructor(v?: T){
        super();
        /**
         * keeps underlying value of a monad.
         * @type {T}
         */
        this.v = clone(v);
        /**
         * the instance of ErrorM.
         * @type {ErrorM}
         */
        this.err = new ErrorM();
    }
    /**
     * chains the operations on a monadic value.
     * @param {function(v: T) => Pr<U>} f - transformation function for the monad.
     * @param {T} [v = this.v] underlying value for the monad.
     * @return {Pr<U> | Error}
     */
    bind<T, U>(f: MF<T, U>, v: T = this.v): Pr<U> | Error{
        let b: any;
        return this.v && v
            ? equality(this.v, v)
                ? f(v)
                : new Error('Identity. Underlying value of the monad have defined in the constructor!')
            : v
                ? f(v)
                : f();
    }
    /**
     * Inherit method just() from Monad.
     */
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
