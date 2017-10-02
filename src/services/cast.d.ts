/**
 * Decreasing the dimension of an array by n.
 * @method cast
 * @param {any} arr - input array.
 * @param {number} n - decreasing factor.
 * @return {Array<any>|T[]|Error}
 */
export declare function cast<T, U>(arr: any, n?: number): Array<T> | Array<U> | Error;
