/**
 * Converts timeout in a Promise, resolved when specified amount of time passes.
 * @method wait
 * @param {any} v - value should be returned.
 * @param {number} [t = 0] t - amount of time, in millis.
 * @return {Promise<T> | Error}
 */
export function wait<T>(v: any, t: number = 0): Promise<T> | Error {
    return typeof t === 'number' && t >= 0
        ? new Promise(function(resolve: any) {
        setTimeout(()=>resolve(v), t);
    })
        : new Error('Function wait. Timeout must be number >= 0.');
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.