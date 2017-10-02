import {Maybe} from "./maybe";
import {ErrorM} from "./error";
import {clone} from "./services/clone";
import {equality} from "./services/equality";
import {Monad} from './monad';

/**
 * Class State - it takes a state and returns an intermediate value and some new state value.
 * @extends {Monad}
 */
export class State<T>  extends Monad<T> {
    /**
     * @type {any}
     * @protected
     */
    protected state: any;
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
     * Creates an instance of the class State with an initialization or not, the initialization can be occur late with bind method.
     * @param {Object} [state] - the initial state of app.
     */
    constructor(
        state?: T
    ){
        super();
        /**
         * Keeps the state of application variables.
         * @type {any}
         */
        this.state = clone(state);
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
     * It takes an initial state of the monad if monad has initialized in the constructor then function assigns Error to underlying value.
     * @method bind
     * @param {Function} f
     * @param [v] - underlying value for the monad, it can be null.
     */
    bind<T>(f: Function, v?: any): void {
        const state = !!this.state || this.state === 0 || this.state === '' || this.state === null;
        const vL = !!v || v === 0 || v === '' || v === null;
        switch (true) {
            case (state && vL):
                this.state = this.errorHandler('State.bind() - underlying value of the monad have defined in the constructor!');
                break;
            case (!state && !vL):
                this.state = this.errorHandler('State.bind() - underlying value of the monad have not defined!');
                break;
            case (!state && vL):
                this.state = v;
                break;
        }
    }
    /**
     * Changes the state of application variables, if you try add new key with put() to state object it'll be assigned
     * with Error instance.
     * @method put
     * @param {function(v: T)=> T} f - app. state transformation function.
     */
    put(f: (v: T)=> T): void {
        const buffer = clone(this.state);
        this.state = this.err.bind(
            (v: T) => equality(Object.getOwnPropertyNames(buffer), Object.getOwnPropertyNames(v))
                ? v
                : this.errorHandler('State.put()._maybeErrorT() - after init we can not add / remove keys in state obj.'),
            this.maybe.bind((v: any) => f(v), this.state)
        );
    }
    /**
     * Extracts the state of app.
     * @method get
     * @return {T}
     */
    get<T>(): T{
        return this.state;
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
