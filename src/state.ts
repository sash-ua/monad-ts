
import {Monad} from "./monad";
import {Maybe} from "./maybe";
import {ErrorM} from "./error";

/**
 * Class State. For app. state manipulations.
 * @extends {Monad}
 */
export class State<T> extends  Monad<T>{
    /**
     * @type {T}
     * @protected
     */
    protected state: T;
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
     * Create an instance of class State.
     * @param {Object} state - The initial state of app.
     */
    constructor(
        state: T
    ){
        super();
        /**
         * it hold app. state.
         * @type {T}
         */
        this.state = state;
        /**
         * The instance of Maybe.
         * @type {Maybe}
         */
        this.maybe = new Maybe();
        /**
         * The instance of ErrorM.
         * @type {ErrorM}
         */
        this.err = new ErrorM();
    }
    /**
     * @param {function(v: any)} f - function.
     * @return {Object} this (current context) value.
     */
    put(f: (v: any)=> T){
        this.state = this.err.bind(v => v, this.maybe.bind(v => f(v), this.state));
        return this;
    }
    /**
     * @return {T} The state of app.
     */
    get(): T{
        return this.state;
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
