
/**
 * decreasing the dimension of an array by n.
 * @param {Array<T>} arr - input array.
 * @param {number} n - decreasing factor.
 * @return {Array<any>}
 */
export function cast<T>(arr: T[], n: number): Array<any> {
    return (n === 0 || n === undefined || n === null) ? arr : _reduser(arr, n);
}

/**
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
 * @param {Array<any>} arr - input array.
 * @param {number} n - decreasing factor.
 * @return {Array<any>}
 * @private
 */
function _fact<T>(arr: Array<any>, n: number): Array<any>{
    return (n === 1) ? arr : _reduser(arr, n-1);
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
