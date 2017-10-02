"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts timeout in a Promise, resolved when specified amount of time passes.
 * @method wait
 * @param {any} v - value should be returned.
 * @param {number} [t = 0] t - amount of time, in millis.
 * @return {Promise<T> | Error}
 */
function wait(v, t) {
    if (t === void 0) { t = 0; }
    return typeof t === 'number' && t >= 0
        ? new Promise(function (resolve) {
            setTimeout(function () { return resolve(v); }, t);
        })
        : new Error('Function wait. Timeout must be number >= 0.');
}
exports.wait = wait;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
