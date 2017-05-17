import {Maybe} from "./maybe";
import {ErrorM} from "./error";
import {clone} from "./services/clone";
import {MF} from "./types/mf";
import {Monad} from "./monad";

/**
 * Class AsyncFlow - for composing monads in an async flow (pipe), based on Promise.
 */
export class AsyncFlow<T> extends Monad<T>{
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
     * creates an instance of class AsyncFlow.
     * @param {any} [initV = 0] initV - initial value of new flow (pipe).
     * @param {boolean} [encapsulate = true] encapsulate - flag, if true then the init value will be cloned.
     */
    constructor(
        initV: any = 0,
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
     * binds initial value to the transformation function
     * @param {function(v: T) => Pr<U>} f - transformation function.
     * @return {Promise<T>}
     */
    bind<T, U>(f: MF<T, U>): Promise<U>{
        return new Promise((resolve: any) =>{
            resolve(this.err.bind(v => this.maybe.bind((v: any) => f(v), v), this.flow));
        })
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.