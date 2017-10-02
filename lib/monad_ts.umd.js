(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Monad_ts"] = factory();
	else
		root["Monad_ts"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class Monad - Base abstract class.
 * @implements {M}
 * @abstract
 */
var Monad = /** @class */ (function () {
    function Monad() {
    }
    /**
     * Takes Error or string return Error.
     * @method errorHandler
     * @param {Error | string} e - Error obj. or string.
     * @return {Error}
     * @protected
     */
    Monad.prototype.errorHandler = function (e) {
        return e instanceof Error ? e : new Error(e);
    };
    /**
     * Produces result after execution f(v).
     * @method just
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @param {T} v - underlying value.
     * @return {Pr<U>} extracts transformed value by f(v).
     * @protected
     */
    Monad.prototype.just = function (f, v) {
        return f(v);
    };
    return Monad;
}());
exports.Monad = Monad;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var monad_1 = __webpack_require__(0);
/**
 * Class ErrorM - return given value or produce Error if take Error or get Error after execution of f(v).
 * @extends {Monad}
 */
var ErrorM = /** @class */ (function (_super) {
    __extends(ErrorM, _super);
    function ErrorM() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Chains the operations on a monadic values.
     * @method bind
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @param {any} v - underlying value for a monad.
     * @return {Pr<U>  | Error} transformed by f() value v or Error.
     */
    ErrorM.prototype.bind = function (f, v) {
        if (v !== v || v === Infinity || v === -Infinity || v instanceof Error) {
            return this.errorHandler(v);
        }
        else {
            var vL = this.just(f, v);
            return (vL !== vL || vL === Infinity || vL === -Infinity || vL instanceof Error) ? this.errorHandler(vL) : vL;
        }
    };
    return ErrorM;
}(monad_1.Monad));
exports.ErrorM = ErrorM;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The service to clone complex objects, including Map.
 * @method clone
 * @param {T} obj - Object or Primitives to clone.
 * @return {T}
 */
function clone(obj, map) {
    if (map === void 0) { map = new Map(); }
    // Primitives are immutable, no need to clone them.
    if (Object(obj) !== obj) {
        return obj;
    }
    else if (map.has(obj)) {
        // Cyclic reference handling
        return map.get(obj);
    }
    else {
        var result_1 = Array.isArray(obj)
            ? []
            : obj.constructor && obj.constructor()
                ? obj.constructor()
                : Object.create(obj);
        if (Object(result_1) !== result_1) {
            map.set(obj, obj);
            result_1 = obj;
        }
        else {
            map.set(obj, result_1);
        }
        if (obj instanceof Map) {
            return Array.from(obj, function (_a) {
                var key = _a[0], val = _a[1];
                return result_1.set(key, _toTail(val, map));
            })[0];
        }
        else {
            return Object.assign.apply(Object, [result_1].concat(Object.keys(obj).map(function (key) {
                return (_a = {}, _a[key] = _toTail(obj[key], map), _a);
                var _a;
            })));
        }
    }
}
exports.clone = clone;
/**
 * @method _toTail
 * @param {T} obj - Object or Primitives to clone.
 * @param {any} map
 * @return {T}
 * @private
 */
function _toTail(obj, map) {
    return clone(obj, map);
}
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var monad_1 = __webpack_require__(0);
/**
 * Class Maybe - return given value or produce null if take nothing or get nothing after execution of f(v).
 * @extends {Monad}
 */
var Maybe = /** @class */ (function (_super) {
    __extends(Maybe, _super);
    function Maybe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Chains the operations on a monadic values.
     * @method bind
     * @param {MF<T, U>} f - transformation function for a monad.
     * @param {T} v - underlying value for a monad.
     * @return {Pr<U>} transformed by f() value v.
     */
    Maybe.prototype.bind = function (f, v) {
        if (v === null || v === undefined) {
            return this.nothing();
        }
        else {
            var vL = this.just(f, v);
            return (vL === null || vL === undefined) ? this.nothing() : vL;
        }
    };
    /**
     * Return nothing (null).
     * @method nothing
     * @return {null}
     */
    Maybe.prototype.nothing = function () {
        return null;
    };
    ;
    return Maybe;
}(monad_1.Monad));
exports.Maybe = Maybe;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * It checks equality of given arguments, arguments must be statically analyzable, therefore there are some constraints,
 * look at examples to find them.
 *
 *  @example <caption>1)</caption>
 *  Functions compare by the structure, not by values of variables or other elements it consists of.
 *
 *  Equal:
 *      let d = 20;
 *      equality(
 *          ()=>{return ()=> {return {'g': d}};},
 *          function(){return function() {return{'g': d}};}
 *      )
 *
 *  Not Equal:
 *      let d = 20;
 *      let d2 = 20;
 *      equality(
 *          ()=>{return ()=> {return {'g': d}};},
 *          function(){return function() {return{'g': d2}};}
 *      )
 *
 *  @example <caption>2)</caption>
 *  Do not use the creation of some objects by object creation, they will be compared wrong.
 *  Never use this constructions in compared objects:
 *      new Boolean(*);
 *      new Number(*);
 *      Error(*);
 *      new Error(*);
 *      new Date(*);
 *      new RegExp(*);
 *
 *  Equal:
 *      equality(new Boolean(true), new Boolean(false));                  // Wrong
 *      equality(Error('true'), Error('false'));                          // Wrong
 *      equality(new Number(1), new Number(11));                          // Wrong
 *      equality(new Date(1995, 11, 17), new Date('1995-12-17T03:24:00')) // Wrong
 *
 *  Not Equal (the exception of `new` option in some cases can solve the issue):
 *      equality(Boolean(true), Boolean(false)); // Right
 *      equality(Number(1), Number(11));         // Right
 *
 *  @example <caption>3)</caption>
 *  Instances of a user-defined object type that has a constructor function are compared as objects by `key: value`.
 *
 *      class Test{
 *          constructor(private arg: any){    }
 *      }
 *      class Test2{
 *          constructor(private arg: any){    }
 *      }
 *  Equal:
 *      new Test(true) and new Test(true);
 *
 *  Not Equal:
 *      new Test(true) and new Test2(true);
 *      new Test(true) and new Test(false);
 *
 * @method equality
 * @param {any} x - argument 1, can include null, NaN etc.
 * @param {any} y - argument 2, can include null, NaN etc.
 * @returns {boolean}
 */
Object.defineProperty(exports, "__esModule", { value: true });
function equality(x, y) {
    var isXO = new Object(x);
    var isYO = new Object(y);
    if (isXO !== x && isYO !== y) {
        return Object.is(x, y);
    }
    if (isXO === x && isYO === y) {
        var xN = x.constructor;
        var yN = y.constructor;
        if (xN === yN) {
            if (xN === Array && yN === Array) {
                return x.length !== y.length ? false : _arrayIterator(x, y);
            }
            else if (xN === Function && yN === Function) {
                return x.toString() === y.toString();
            }
            else if (equality(Object.getOwnPropertyNames(x), Object.getOwnPropertyNames(y))) {
                for (var key in x) {
                    if (x.hasOwnProperty(key)) {
                        if (!equality(x[key], y[key]))
                            return false;
                    }
                }
                return true;
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
exports.equality = equality;
/**
 * Tterate array controller.
 * @method _arrayIterator
 * @param {Array<any>} x
 * @param {Array<any>} y
 * @return {boolean}
 * @private
 */
function _arrayIterator(x, y) {
    return !x.some(function (v, i) {
        return Array.isArray(v) ? _arrayIterator(v, y[i]) : (typeof v === 'object' || typeof v === "function") ? !equality(v, y[i]) : !Object.is(v, y[i]);
    });
}
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description
 * Entry point for all public APIs of the Monad-TS package.
 */
var asyncFlow_1 = __webpack_require__(6);
exports.AsyncFlow = asyncFlow_1.AsyncFlow;
var cast_1 = __webpack_require__(7);
exports.cast = cast_1.cast;
var clone_1 = __webpack_require__(2);
exports.clone = clone_1.clone;
var debounceTime_1 = __webpack_require__(8);
exports.debounceTime = debounceTime_1.debounceTime;
var either_1 = __webpack_require__(9);
exports.Either = either_1.Either;
var error_1 = __webpack_require__(1);
exports.ErrorM = error_1.ErrorM;
var equality_1 = __webpack_require__(4);
exports.equality = equality_1.equality;
var flow_1 = __webpack_require__(10);
exports.Flow = flow_1.Flow;
var hash_1 = __webpack_require__(11);
exports.hash = hash_1.hash;
var identity_1 = __webpack_require__(12);
exports.Identity = identity_1.Identity;
var list_1 = __webpack_require__(13);
exports.List = list_1.List;
var m_1 = __webpack_require__(14);
exports.M = m_1.M;
var maybe_1 = __webpack_require__(3);
exports.Maybe = maybe_1.Maybe;
var monad_1 = __webpack_require__(0);
exports.Monad = monad_1.Monad;
var state_1 = __webpack_require__(15);
exports.State = state_1.State;
var wait_1 = __webpack_require__(16);
exports.wait = wait_1.wait;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var maybe_1 = __webpack_require__(3);
var error_1 = __webpack_require__(1);
var clone_1 = __webpack_require__(2);
var monad_1 = __webpack_require__(0);
/**
 * Class AsyncFlow - for composing monads in an async flow (pipe), based on Promise.
 * @extends {Monad}
 */
var AsyncFlow = /** @class */ (function (_super) {
    __extends(AsyncFlow, _super);
    /**
     * Creates an instance of class AsyncFlow.
     * @param {any} [initV = 0] initV - initial value of new flow (pipe).
     * @param {boolean} [encapsulate = true] encapsulate - flag, if true then the init value will be cloned.
     */
    function AsyncFlow(initV, encapsulate) {
        if (initV === void 0) { initV = 0; }
        if (encapsulate === void 0) { encapsulate = true; }
        var _this = _super.call(this) || this;
        /**
         * Keep initial flow (pipe) value.
         * @type {any}
         */
        _this.flow = encapsulate ? clone_1.clone(initV) : initV;
        /**
         * The instance of Maybe.
         * @type {Maybe}
         */
        _this.maybe = new maybe_1.Maybe();
        /**
         * The instance of ErrorM.
         * @type {ErrorM}
         */
        _this.err = new error_1.ErrorM();
        return _this;
    }
    /**
     * Binds initial value to the transformation function.
     * @method bind
     * @param {function(v: T) => Pr<U>} f - transformation function.
     * @return {Promise<T>}
     */
    AsyncFlow.prototype.bind = function (f) {
        var _this = this;
        return new Promise(function (resolve) {
            resolve(_this.err.bind(function (v) { return _this.maybe.bind(function (v) { return f(v); }, v); }, _this.flow));
        });
    };
    return AsyncFlow;
}(monad_1.Monad));
exports.AsyncFlow = AsyncFlow;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Decreasing the dimension of an array by n.
 * @method cast
 * @param {any} arr - input array.
 * @param {number} n - decreasing factor.
 * @return {Array<any>|T[]|Error}
 */
function cast(arr, n) {
    if (n === void 0) { n = 0; }
    return typeof n === 'number' && Array.isArray(arr)
        ? n > 0 ? _reduser(arr, n) : arr
        : new Error('Function cast. Input  must  be array and factor - number.');
}
exports.cast = cast;
/**
 * @method _reduser
 * @param {Array<T>} arr - input array.
 * @param {number} n - decreasing factor.
 * @return {Array<any>}
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
 * @method _fact
 * @param {Array<any>} arr - input array.
 * @param {number} n - decreasing factor.
 * @return {Array<any>}
 * @private
 */
function _fact(arr, n) {
    return (n === 1) ? arr : _reduser(arr, n - 1);
}
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Execute a function given a delay time.
 * @method debounceTime
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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var monad_1 = __webpack_require__(0);
var equality_1 = __webpack_require__(4);
/**
 * Class Either - represents computation with two possibilities.
 * @extends {Monad}
 */
var Either = /** @class */ (function (_super) {
    __extends(Either, _super);
    /**
     * Creates an instance of class Either.
     * @param {function(v: any) => any} r - right function.
     * @param {function(v: any) => any} l - left function.
     */
    function Either(r, l) {
        var _this = _super.call(this) || this;
        _this.r = r;
        _this.l = l;
        return _this;
    }
    /**
     * Binds controller function and underlying value to the monad.
     * @method bind
     * @param {D<T>} f - controller function, after execution f(v) produce true (execute right func-n) or false (execute left func-n).
     * @param {any} v - underlying value for the monad.
     * @return {boolean | Pr<any> | Error}
     */
    Either.prototype.bind = function (f, v) {
        this.uVal = v;
        try {
            switch (f(v)) {
                case true:
                    return this.r(v);
                case false:
                    return this.l(v);
                default:
                    return this.errorHandler('Either.bind() - binding error');
            }
        }
        catch (e) {
            this.errorHandler("Either.bind().switch - " + e);
        }
    };
    /**
     * Extract result of left(v) computation.
     * @method left
     * @param {T} v - underlying value.
     * @return {Pr}
     */
    Either.prototype.left = function (v) {
        return this.uVal ? equality_1.equality(this.uVal, v) ? this.l(v) : this.errorHandler('Either.left() - v have been binded with bind method') : this.l(v);
    };
    /**
     * Extract result of right(v) computation.
     * @method right
     * @param {T} v - underlying value.
     * @return {Pr}
     */
    Either.prototype.right = function (v) {
        return this.uVal ? equality_1.equality(this.uVal, v) ? this.r(v) : this.errorHandler('Either.right() - v have been binded with bind method') : this.r(v);
    };
    return Either;
}(monad_1.Monad));
exports.Either = Either;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var monad_1 = __webpack_require__(0);
var maybe_1 = __webpack_require__(3);
var clone_1 = __webpack_require__(2);
var error_1 = __webpack_require__(1);
/**
 * Class Flow - for composing monads in a flow (pipe).
 * @extends {Monad}
 */
var Flow = /** @class */ (function (_super) {
    __extends(Flow, _super);
    /**
     * Create an instance of class AsyncFlow.
     * @param {any} initV - initial value of new flow (pipe).
     * @param {boolean} [encapsulate = true] encapsulate - flag, if true then the init value will be cloned.
     */
    function Flow(initV, encapsulate) {
        if (encapsulate === void 0) { encapsulate = true; }
        var _this = _super.call(this) || this;
        /**
         * keep initial flow (pipe) value.
         * @type {any}
         */
        _this.flow = encapsulate ? clone_1.clone(initV) : initV;
        /**
         * the instance of Maybe.
         * @type {Maybe}
         */
        _this.maybe = new maybe_1.Maybe();
        /**
         * the instance of ErrorM.
         * @type {ErrorM}
         */
        _this.err = new error_1.ErrorM();
        return _this;
    }
    /**
     * Chains the operations on a monadic values.
     * @method bind
     * @param {function(v: T) => Pr<U>} f - transformation function for a main flow value.
     * @param {any} [v = this.flow] - underlying value for a monad.
     * @return {Flow<T>} transformed by f() value v or throw Error or null.
     */
    Flow.prototype.bind = function (f, v) {
        var _this = this;
        if (v === void 0) { v = this.flow; }
        this.flow = this.err.bind(function (v) { return _this.maybe.bind(function (v) { return f(v); }, v); }, v);
        return this;
    };
    /**
     * Creates branch from a flow (pipe).
     * @method let
     * @param {function(v: T) => Pr<U>} f - transformation function for a main flow value.
     * @return {Flow<T>}
     */
    Flow.prototype.let = function (f) {
        f(clone_1.clone(this.flow));
        return this;
    };
    /**
     * Extract value from a flow (pipe).
     * @method subscribe
     * @return {T}
     */
    Flow.prototype.subscribe = function () {
        return this.flow;
    };
    return Flow;
}(monad_1.Monad));
exports.Flow = Flow;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Calculates a hash (32 bit).
 * Based on FNV-1a algorithm, ref: http://isthe.com/chongo/tech/comp/fnv/
 * @method hash
 * @param {string} str - string to hash
 * @param {number} [pHash = 2166136261] previous hash.
 * @returns {number}
 */
Object.defineProperty(exports, "__esModule", { value: true });
function hash(str, pHash) {
    if (pHash === void 0) { pHash = 2166136261; }
    if (str.length === 0 || !str)
        return null;
    var n = str.length - 1;
    var hash = pHash;
    while (n >= 0) {
        // xor the bottom with the current chunk.
        hash ^= str.charCodeAt(n--);
        //  multiply with a expression of shifts.
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return hash;
}
exports.hash = hash;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var monad_1 = __webpack_require__(0);
var clone_1 = __webpack_require__(2);
var equality_1 = __webpack_require__(4);
var error_1 = __webpack_require__(1);
/**
 * Class Identity - wraps underlying value into the monadic value and compute results from a monadic value.
 * @extends {Monad}
 */
var Identity = /** @class */ (function (_super) {
    __extends(Identity, _super);
    /**
     * Creates an instance of class Identity.
     * @param {any} [v] - The initial state of app.
     * */
    function Identity(v) {
        var _this = _super.call(this) || this;
        /**
         * Keeps underlying value of a monad.
         * @type {any}
         */
        _this.v = clone_1.clone(v);
        /**
         * The instance of ErrorM.
         * @type {ErrorM}
         */
        _this.err = new error_1.ErrorM();
        return _this;
    }
    /**
     * Chains the operations on a monadic value.
     * @method bind
     * @param {MF<T, U>} f - transformation function for the monad.
     * @param {any} [v = this.v]- underlying value for the monad, it can be null.
     * @return {Pr<U> | Error}
     */
    Identity.prototype.bind = function (f, v) {
        if (v === void 0) { v = this.v; }
        return this.v && v
            ? equality_1.equality(this.v, v)
                ? f(v)
                : this.errorHandler('Identity.bind() - underlying value of the monad have defined in the constructor!')
            : v || v === 0 || v === '' || v === null
                ? f(v)
                : f();
    };
    return Identity;
}(monad_1.Monad));
exports.Identity = Identity;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var monad_1 = __webpack_require__(0);
/**
 * Class List - transform every element of array with given function "contemporaneously".
 * @extends {Monad}
 */
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Transform every element of array with given function
     * @method bind
     * @param {MF<T, U>} f - transformation function for a monad.
     * @param v - underlying value for a monad.
     * @return {Pr<U> | Error} transformed by f() value v or error if input arg is not array.
     */
    List.prototype.bind = function (f, v) {
        return Array.isArray(v) ? this._disp(f, v) : this.errorHandler('List.bind() - input must be an array.');
    };
    /**
     * @method _disp
     * @param {function(n: T) => U} f - transformation function for a monad.
     * @param {any} v - underlying value for a monad.
     * @return {Array<U>} transformed by f() value v.
     * @private
     */
    List.prototype._disp = function (f, v) {
        var _this = this;
        return v.map(function (vL) {
            return !Array.isArray(vL) ? f(vL) : _this._disp(f, vL);
        });
    };
    return List;
}(monad_1.Monad));
exports.List = List;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * interface M<T>{
 *
 *  just<T,U>(f: MF<T, U>, v: T): Pr<U>;
 *
 *  errorHandler(e: Error | string): Error;
 *
 * }
 * @interface
 * @name M - monads interface, {@link Monad}.
 * @noimport true
 */
var M = /** @class */ (function () {
    function M() {
    }
    /**
     * extracts value from monad.
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @param {T} v - underlying value.
     * @return {Pr<U>} extracts transformed value by f(v).
     */
    M.prototype.just = function (f, v) {
        return void 0;
    };
    ;
    /**
     * errors handler.
     * @param {Error | string} e - Error obj. or string.
     * @return {Error}
     */
    M.prototype.errorHandler = function (e) {
        return void 0;
    };
    ;
    return M;
}());
exports.M = M;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var maybe_1 = __webpack_require__(3);
var error_1 = __webpack_require__(1);
var clone_1 = __webpack_require__(2);
var equality_1 = __webpack_require__(4);
var monad_1 = __webpack_require__(0);
/**
 * Class State - it takes a state and returns an intermediate value and some new state value.
 * @extends {Monad}
 */
var State = /** @class */ (function (_super) {
    __extends(State, _super);
    /**
     * Creates an instance of the class State with an initialization or not, the initialization can be occur late with bind method.
     * @param {Object} [state] - the initial state of app.
     */
    function State(state) {
        var _this = _super.call(this) || this;
        /**
         * Keeps the state of application variables.
         * @type {any}
         */
        _this.state = clone_1.clone(state);
        /**
         * The instance of Maybe.
         * @type {Maybe}
         */
        _this.maybe = new maybe_1.Maybe();
        /**
         * The instance of ErrorM.
         * @type {ErrorM}
         */
        _this.err = new error_1.ErrorM();
        return _this;
    }
    /**
     * It takes an initial state of the monad if monad has initialized in the constructor then function assigns Error to underlying value.
     * @method bind
     * @param {Function} f
     * @param [v] - underlying value for the monad, it can be null.
     */
    State.prototype.bind = function (f, v) {
        var state = !!this.state || this.state === 0 || this.state === '' || this.state === null;
        var vL = !!v || v === 0 || v === '' || v === null;
        switch (true) {
            case (state && vL):
                this.state = this.errorHandler('State.bind() - underlying value of the monad have defined in the constructor!');
                break;
            case (!state && !vL):
                this.state = this.errorHandler('State.bind() - underlying value of the monad have not defined!');
                break;
            case (!state && vL):
                this.state = v;
                break;
        }
    };
    /**
     * Changes the state of application variables, if you try add new key with put() to state object it'll be assigned
     * with Error instance.
     * @method put
     * @param {function(v: T)=> T} f - app. state transformation function.
     */
    State.prototype.put = function (f) {
        var _this = this;
        var buffer = clone_1.clone(this.state);
        this.state = this.err.bind(function (v) { return equality_1.equality(Object.getOwnPropertyNames(buffer), Object.getOwnPropertyNames(v))
            ? v
            : _this.errorHandler('State.put()._maybeErrorT() - after init we can not add / remove keys in state obj.'); }, this.maybe.bind(function (v) { return f(v); }, this.state));
    };
    /**
     * Extracts the state of app.
     * @method get
     * @return {T}
     */
    State.prototype.get = function () {
        return this.state;
    };
    return State;
}(monad_1.Monad));
exports.State = State;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ })
/******/ ]);
});