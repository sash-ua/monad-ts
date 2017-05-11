/**
 * MF<T, U> - transformation function's type.
 * @public
 * @typedef {function(v: T): Pr<U>} 'MF<T, U>
 */
/** Comment for ESDoc */
import { Pr } from "./pr";
export declare type MF<T, U> = (v: T) => Pr<U>;
