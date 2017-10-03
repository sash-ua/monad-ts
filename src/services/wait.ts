/**
 * Converts timeout in a Promise, resolved when specified amount of time passes.
 * @method wait
 * @param {any} v - value should be returned.
 * @param {number} [t = 0] t - amount of time, in millis.
 * @return {Promise<T>}
 */

export function wait<T>(v: any, t: number = 0): Promise<T> {
    return typeof t === 'number' && t >= 0
        ? new Promise((resolve: any) => {
        setTimeout(() => resolve(v), t);
    })
        : Promise.reject(new Error('Function wait - timeout must be number >= 0.'));
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.