import {MF} from '../types/mf';
import {Pr} from '../types/pr';
import {D} from '../types/d';

/** interface Binding<T>{
    *
    * bind<T,U>(f: MF<T, U> | D<T>, v: any): Pr<U> | Error | boolean;
    *
    * }
 * @interface
 * @name Binding - monads interface to bind transformation function and underlying value to the monad
 * {@link Maybe}, {@link ErrorM}, {@link Either}, {@link Identity}, {@link List}.
 * @noimport true
 **/
export class Binding<T> {
    /**
     * binds transformation function and underlying value to the monad.
     * @param {MF<T, U> | D<T>} f - transformation function.
     * @param v - underlying value.
     * @return {Pr<U> | Error | boolean}
     */
    bind<T,U>(f: MF<T, U> | D<T>, v: any): Pr<U> | Error | boolean{
        return void 0;
    };
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
