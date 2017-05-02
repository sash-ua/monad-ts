
import {Pr} from "../monad";

/**
 * decreasing the dimension of an array by n
 * @param {Pr<T>|Array<any>} arr - input array.
 * @param {number} n - decreasing factor.
 * @returns {Pr<T>|Array<any>|T[]}
 */
export function cast<T>(arr: Pr<T> | Array<any>, n: number): Pr<T> | Array<any> {
    return (n === 0 || n === undefined || n === null) ? arr : _reduser(arr, n);
}

/**
 * @param {Pr<T>|Array<any>} arr - input array.
 * @param {number} n - decreasing factor.
 * @returns {Pr<T>|Array<any>|T[]}
 * @private
 */
function _reduser<T>(arr: Pr<T> | Array<any>, n: number): T[] | Array<any>{
    return arr.length
        ? arr.reduce((acc: Array<any>, vL: T)=>{
            return acc.concat(_fact(vL, n));
        },[])
        : arr;
}

/**
 * @param {Pr<T>|Array<any>} arr - input array.
 * @param {number} n - decreasing factor.
 * @returns {Pr<T>|Array<any>|T[]}
 * @private
 */
function _fact<T>(arr: Pr<T>, n: number):Pr<T> | T[]{
    return (n === 1) ? arr : _reduser(arr, n-1);
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
