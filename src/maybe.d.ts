import { MF, Monad, Pr } from "./monad";
/**
 * Class Maybe
 * @extends {Monad}
 */
export declare class Maybe<T> extends Monad<T> {
    /**
     * Method that chains the operations on a monadic values
     * @param {function(v: any)} f - transformation function for a monad
     * @param {any} v - underlying value for a monad.
     * @return {Pr<U>} given value v or transformed value by f(v)
     */
    bind<T, U>(f: MF<T, U>, v: any): Pr<U>;
    /**
     * return nothing (null)
     * @returns {null}
     */
    nothing(): any;
}
