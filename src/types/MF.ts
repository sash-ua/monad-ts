
/**
 * MF<T, U> - transformation function's type.
 * @public
 * @typedef {function(v: T): Pr<U>} MF<T,U>
 */

/** Comment for ESDoc */
import {Pr} from "./pr";

export type MF<T, U> = (v?: any)=> Pr<U>;

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
