
/**
 * Decreasing the dimension of an array by n.
 * @method cast
 * @param {any} arr - input array.
 * @param {number} n - decreasing factor.
 * @return {Array<any>|T[]|Error}
 */
export function cast<T, U>(arr: any, n: number = 0): Array<T> | Array<U> | Error {
    return typeof n === 'number' && Array.isArray(arr)
        ? n > 0 ? _reduser(arr, n) : arr
        : new Error('Function cast. Input  must  be array and factor - number.');
}

/**
 * @method _reduser
 * @param {Array<T>} arr - input array.
 * @param {number} n - decreasing factor.
 * @return {Array<any>}
 * @private
 */
function _reduser<T>(arr: T[], n: number): Array<any>{
    return arr.length
        ? arr.reduce((acc: Array<any>, vL: any)=>{
            return acc.concat(_fact(vL, n));
        },[])
        : arr;
}

/**
 * @method _fact
 * @param {Array<any>} arr - input array.
 * @param {number} n - decreasing factor.
 * @return {Array<any>}
 * @private
 */
function _fact<T>(arr: Array<any>, n: number): Array<any>{
    return (n === 1) ? arr : _reduser(arr, n-1);
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
