"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * decreasing the dimension of an array by n
 * @param {Pr<T>|Array<any>} arr - input array.
 * @param {number} n - decreasing factor.
 * @returns {Pr<T>|Array<any>|T[]}
 */
function cast(arr, n) {
    return (n === 0 || n === undefined || n === null) ? arr : _reduser(arr, n);
}
exports.cast = cast;
/**
 * @param {Pr<T>|Array<any>} arr - input array.
 * @param {number} n - decreasing factor.
 * @returns {Pr<T>|Array<any>|T[]}
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
 * @param {Pr<T>|Array<any>} arr - input array.
 * @param {number} n - decreasing factor.
 * @returns {Pr<T>|Array<any>|T[]}
 * @private
 */
function _fact(arr, n) {
    return (n === 1) ? arr : _reduser(arr, n - 1);
}
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
