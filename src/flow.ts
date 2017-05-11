
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
     * @type {Maybe<T>}
     * @protected
     */
    protected maybe: Maybe<T>;
    /**
     * @type {ErrorM<T>}
     * @protected
     */
    protected err: ErrorM<T>;
    /**
     * create an instance of class Flow.
     * @param {any} flow - initial value of new flow (pipe).
     */
    constructor(
        flow: any
    ){
        super();
        /**
         * keep initial flow (pipe) value.
         * @type {any}
         */
        this.flow = clone(flow);
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
     * chains the operations on a monadic values.
     * @param {function(v: T) => Pr<U>} f - transformation function for a main flow value.
     * @param {any} [v= this.flow] - underlying value for a monad.
     * @return {Flow<T>} transformed by f() value v or throw Error or null.
     */
    bind<T, U>(f?: MF<T, U>, v: any = this.flow): Flow<T>{
        this.flow = f ? this.err.bind(v => this.maybe.bind((v: any) => f(v), v), v) : this.err.bind(v => v, v);
        return this;
    }
    /**
     * create branch from a flow (pipe).
     * @param {function(v: T) => Pr<U>} f - transformation function for a main flow value.
     * @return {Flow<T>}
     */
    let<T, U>(f: MF<T, U>): Flow<T>{
        f(clone(this.flow));
        return this;
    }
    /**
     * extract value from a flow (pipe).
     * @return {T}
     */
    subscribe<T>(): T{
        return this.flow;
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
