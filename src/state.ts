
import {Monad} from "./monad";
import {Maybe} from "./maybe";
import {ErrorM} from "./error";
import {clone} from "./services/clone";

/**
 * Class State - for application state manipulations.
 * @extends {Monad}
 */
export class State<T> extends  Monad<T>{
    /**
     * @type {any}
     * @protected
     */
    protected state: any;
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
     * creates an instance of class State.
     * @param {Object} state - the initial state of app.
     */
    constructor(
        state: T
    ){
        super();
        /**
         * keeps the state of application variables.
         * @type {T}
         */
        this.state = clone(state);
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
     * changes the state of application variables.
     * @param {function(v: T)=> T} f - app. state transformation function.
     * @return {State<T>}
     */
    put(f: (v: T)=> T): State<T>{
        this.state = this.err.bind((v: T) => v, this.maybe.bind((v: T) => f(v), this.state));
        return this;
    }
    /**
     * extracts the state of application variables.
     * @return {T}
     */
    get(): T{
        return this.state;
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
