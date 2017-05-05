
import {MF, Monad, Pr} from "./monad";
import {Maybe} from "./maybe";
import {clone} from "./services/clone";
import {ErrorM} from "./error";


/**
 * Class Flow. For composing monads in a pipe.
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
     * @param {any} flow - initial value when start new pipe.
     */
    constructor(
        flow: any
    ){
        super();
        /**
         * it hold pipe value.
         * @type {any}
         */
        this.flow = flow;
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
     * chain the operations on a monadic values.
     * @param {function(v: T) => Pr<U>} f - transformation function for a main flow value.
     * @param {any} [v= this.flow] - underlying value for a monad.
     * @return {any} monadic value from v or transformed value by f(v) or throw Error.
     */
    bind<T, U>(f?: MF<T, U>, v: any = this.flow){
        this.flow = f ? this.err.bind(v => this.maybe.bind((v: any) => f(v), v), v) : this.err.bind(v => v, v);
        return this;
    }
    /**
     * create branch from a pipe.
     * @param {function(v: T) => Pr<U>} f - transformation function for a main flow value.
     * @return {Flow}
     */
    let<T, U>(f: MF<T, U>): Pr<U>{
        f(clone(this.flow));
        return this;
    }
    /**
     * extract value from a pipe.
     * @return {any}
     */
    subscribe<T>(): T{
        return this.flow;
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
