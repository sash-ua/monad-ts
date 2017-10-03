import {Monad} from "./monad";
import {clone} from "./services/clone";
import {MF} from "./types/mf";
import {Pr} from "./types/pr";
import {equality} from "./services/equality";
import {ErrorM} from "./error";

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
     * @type {ErrorM}
     * @protected
     */
    protected err: ErrorM<T>;
    /**
     * Creates an instance of class Identity.
     * @param {any} [v] - The initial state of app.
     * */
    constructor(v?: any){
        super();
        /**
         * Keeps underlying value of a monad.
         * @type {any}
         */
        this.v = clone(v);
        /**
         * The instance of ErrorM.
         * @type {ErrorM}
         */
        this.err = new ErrorM();
    }
    /**
     * Chains the operations on a monadic value.
     * @method bind
     * @param {MF<T, U>} f - transformation function for the monad.
     * @param {any} [v = this.v]- underlying value for the monad, it can be null.
     * @return {Pr<U> | Error}
     */
    bind<T, U>(f: MF<T, U>, v: any = this.v): Pr<U> | Error{
        return this.v && v
            ? equality(this.v, v)
                ? f(v)
                : this.fail('Identity.bind() - underlying value of the monad have defined in the constructor!')
            : v || v === 0 || v === '' || v === null
                ? f(v)
                : f();
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
