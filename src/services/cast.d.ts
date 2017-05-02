import { Pr } from "../monad";
/**
 * decreasing the dimension of an array by n
 * @param {Pr<T>|Array<any>} arr - input array.
 * @param {number} n - decreasing factor.
 * @returns {Pr<T>|Array<any>|T[]}
 */
export declare function cast<T>(arr: Pr<T> | Array<any>, n: number): Pr<T> | Array<any>;
