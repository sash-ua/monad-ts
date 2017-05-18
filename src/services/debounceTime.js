"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * execute a function given a delay time.
 * @param {function} f - invoked function.
 * @param {number} d - a delay time.
 * @param {boolean} [immediate = true] immediate - first func call is immediate if true.
 * @return {function(...args:any[])=>void}
 */
function debounceTime(f, d, immediate) {
    var _this = this;
    if (immediate === void 0) { immediate = true; }
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var later = function () {
            timeout = null;
            if (!immediate)
                f.apply(_this, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, d);
        if (callNow)
            f.apply(_this, args);
    };
}
exports.debounceTime = debounceTime;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
