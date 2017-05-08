"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * function to check equality of data.
 * @param {any} x - argument 1.
 * @param {any} y - argument 2.
 * @returns {boolean | Error}
 */
function equality(x, y) {
    if (!x || !y) {
        return new Error('Equal. There isn\'t argument');
    }
    // Primitives equality
    if (Object(x) !== x && Object(y) !== y) {
        return Object.is(x, y);
    }
    else if (Array.isArray(x) && Array.isArray(y)) {
        return x.length !== y.length ? false : _arrayIterator(x, y);
    }
    else if (Array.isArray(x) && !Array.isArray(y) || !Array.isArray(x) && Array.isArray(y)) {
        return false;
    }
    else {
        for (var key in x) {
            if (x.hasOwnProperty(key)) {
                if (!equality(x[key], y[key]))
                    return false;
            }
        }
        return true;
    }
}
exports.equality = equality;
/**
 * iterate array controller.
 * @param {Array<any>} x
 * @param {Array<any>} y
 * @return {boolean}
 * @private
 */
function _arrayIterator(x, y) {
    return !x.some(function (v, i) {
        return Array.isArray(v) ? _arrayIterator(v, y[i]) : (typeof v === 'object') ? !equality(v, y[i]) : !Object.is(v, y[i]);
    });
}
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
