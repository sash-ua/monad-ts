/**
 * execute a function given a delay time.
 * @param {function} f - invoked function.
 * @param {number} d - a delay time.
 * @param {boolean} [immediate = true] immediate - first func call is immediate if true.
 * @return {function(...args:any[])=>void}
 */
export declare function debounceTime(f: Function, d: number, immediate?: boolean): (...args: any[]) => void;
