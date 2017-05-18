/**
 * execute a function given a delay time.
 * @param {function} f - invoked function.
 * @param {number} d - a delay time.
 * @param {boolean} [immediate = true] immediate - first func call is immediate if true.
 * @return {function(...args:any[])=>void}
 */
export function debounceTime(f: Function, d: number, immediate: boolean = true): (...args:any[])=>void {
    let timeout: any;
    return (...args: Array<any>): void =>{
        const later = ()=> {
            timeout = null;
            if (!immediate) f.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, d);
        if (callNow) f.apply(this, args);
    };
}


//Copyright (c) 2017 Alex Tranchenko. All rights reserved.