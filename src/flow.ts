import {Monad} from "./monad";
import {Maybe} from "./maybe";
import {clone} from "./services/clone";
import {ErrorM} from "./error";
import {MF} from "./types/mf";

/**
 * Class Flow - for composing monads in a flow (pipe).
 * @extends {Monad}
 */
export class Flow<T> extends Monad<T>{
    /**
     * @type {any}
     * @protected
     */
    protected flow: any;
    /**
     * @type {Maybe}
     * @protected
     */
    protected maybe: Maybe<T>;
    /**
     * @type {ErrorM}
     * @protected
     */
    protected err: ErrorM<T>;
    /**
     * Create an instance of class AsyncFlow.
     * @param {any} initV - initial value of new flow (pipe).
     * @param {boolean} [encapsulate = true] encapsulate - flag, if true then the init value will be cloned.
     */
    constructor(
        initV: any,
        encapsulate: boolean = true
    ){
        super();
        /**
         * keep initial flow (pipe) value.
         * @type {any}
         */
        this.flow = encapsulate ? clone(initV) : initV;
        /**
         * the instance of Maybe.
         * @type {Maybe}
         */
        this.maybe = new Maybe();
        /**
         * the instance of ErrorM.
         * @type {ErrorM}
         */
        this.err = new ErrorM();
    }
    /**
     * Chains the operations on a monadic values.
     * @method bind
     * @param {function(v: T) => Pr<U>} f - transformation function for a main flow value.
     * @param {any} [v = this.flow] - underlying value for a monad.
     * @return {Flow<T>} transformed by f() value v or throw Error or null.
     */
    bind<T, U>(f: MF<T, U>, v: any = this.flow): Flow<T>{
        this.flow = this.err.bind(v => this.maybe.bind((v: any) => f(v), v), v);
        return this;
    }
    /**
     * Creates branch from a flow (pipe).
     * @method let
     * @param {function(v: T) => Pr<U>} f - transformation function for a main flow value.
     * @return {Flow<T>}
     */
    let<T, U>(f: MF<T, U>): Flow<T>{
        f(clone(this.flow));
        return this;
    }
    /**
     * Extract value from a flow (pipe).
     * @method subscribe
     * @return {T}
     */
    subscribe<T>(): T{
        return this.flow;
    }
}
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
