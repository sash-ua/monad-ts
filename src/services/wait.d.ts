/**
 * Converts timeout in a Promise, resolved when specified amount of time passes.
 * @method wait
 * @param {any} v - value should be returned.
 * @param {number} [t = 0] t - amount of time, in millis.
 * @return {Promise<T> | Error}
 */
export declare function wait<T>(v: any, t?: number): Promise<T> | Error;
