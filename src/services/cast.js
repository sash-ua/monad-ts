"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Decreasing the dimension of an array by n.
 * @method cast
 * @param {any} arr - input array.
 * @param {number} n - decreasing factor.
 * @return {Array<any>|T[]|Error}
 */
function cast(arr, n) {
    if (n === void 0) { n = 0; }
    return typeof n === 'number' && Array.isArray(arr)
        ? n > 0 ? _reduser(arr, n) : arr
        : new Error('Function cast. Input  must  be array and factor - number.');
}
exports.cast = cast;
/**
 * @method _reduser
 * @param {Array<T>} arr - input array.
 * @param {number} n - decreasing factor.
 * @return {Array<any>}
 * @private
 */
function _reduser(arr, n) {
    return arr.length
        ? arr.reduce(function (acc, vL) {
            return acc.concat(_fact(vL, n));
        }, [])
        : arr;
}
/**
 * @method _fact
 * @param {Array<any>} arr - input array.
 * @param {number} n - decreasing factor.
 * @return {Array<any>}
 * @private
 */
function _fact(arr, n) {
    return (n === 1) ? arr : _reduser(arr, n - 1);
}
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
