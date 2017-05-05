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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * class Monad - base class.
 * @implements {M}
 */
var Monad = (function () {
    function Monad() {
    }
    /**
     * get Error or string return Error.
     * @param {Error | string} e - Error obj. or string.
     * @return {Error} throw Error.
     * @protected
     */
    Monad.prototype.errorHandler = function (e) {
        return e instanceof Error ? e : new Error(e);
    };
    /**
     * produce result after execution f(v).
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @param {T} v - underlying value.
     * @return {Pr<U>} monadic value from v or transformed value by f(v).
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
 * Class Maybe - return given value or produce null if take nothing or get nothing after execution of f(v).
 * @extends {Monad}
 */
var Maybe = (function (_super) {
    __extends(Maybe, _super);
    function Maybe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * chains the operations on a monadic values.
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @param {T} v - underlying value for a monad.
     * @return {Pr<U>} monadic value from v or transformed value by f(v).
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
     * return nothing (null).
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * this is service to clone object, including Map.
 * @param {any} Object or Primitives to clone.
 * @param {Map} object Map, serve object in function.
 * @return {any} Returns Primitives or clone Object.
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
        var result_1 = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : Object.create(null);
        map.set(obj, result_1);
        if (obj instanceof Map) {
            return Array().from(obj, function (_a) {
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
 * @param {any} Object or Primitives to clone.
 * @param {Map} object Map, serve object in function.
 * @returns {T} returns Primitives or clone Object.
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
 * Class ErrorM - return given value or produce Error if take Error or get Error after execution of f(v).
 * @extends {Monad}
 */
var ErrorM = (function (_super) {
    __extends(ErrorM, _super);
    /**
     * create an instance of class ErrorM.
     */
    function ErrorM() {
        return _super.call(this) || this;
    }
    /**
     * Method that chains the operations on a monadic values.
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @param {any} v - underlying value for a monad.
     * @return {Pr<U>  | Error} monadic value from v or transformed value by f(v) or throw Error.
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
/* 4 */
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
var maybe_1 = __webpack_require__(1);
var clone_1 = __webpack_require__(2);
var error_1 = __webpack_require__(3);
/**
 * Class Flow - for composing monads in a pipe.
 * @extends {Monad}
 */
var Flow = (function (_super) {
    __extends(Flow, _super);
    /**
     * create an instance of class Flow.
     * @param {any} flow - initial value when start new pipe.
     */
    function Flow(flow) {
        var _this = _super.call(this) || this;
        /**
         * it hold pipe value.
         * @type {any}
         */
        _this.flow = flow;
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
     * chain the operations on a monadic values.
     * @param {function(v: T) => Pr<U>} f - transformation function for a main flow value.
     * @param {any} [v= this.flow] - underlying value for a monad.
     * @return {any} monadic value from v or transformed value by f(v) or throw Error.
     */
    Flow.prototype.bind = function (f, v) {
        var _this = this;
        if (v === void 0) { v = this.flow; }
        this.flow = f ? this.err.bind(function (v) { return _this.maybe.bind(function (v) { return f(v); }, v); }, v) : this.err.bind(function (v) { return v; }, v);
        return this;
    };
    /**
     * create branch from a pipe.
     * @param {function(v: T) => Pr<U>} f - transformation function for a main flow value.
     * @return {Flow}
     */
    Flow.prototype.let = function (f) {
        f(clone_1.clone(this.flow));
        return this;
    };
    /**
     * extract value from a pipe.
     * @return {any}
     */
    Flow.prototype.subscribe = function () {
        return this.flow;
    };
    return Flow;
}(monad_1.Monad));
exports.Flow = Flow;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.


/***/ }),
/* 5 */
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
 * Class Identity - wrap underlying value into the monadic value and computing results from a monadic value.
 * @extends {Monad}
 */
var Identity = (function (_super) {
    __extends(Identity, _super);
    /**
     * Create an instance of class Identity.
     * @param {T} v - The initial state of app.
     * */
    function Identity(v) {
        var _this = _super.call(this) || this;
        /**
         * it hold underlying value of a monad.
         * @type {T}
         */
        _this.v = v;
        return _this;
    }
    /**
     * chains the operations on a monadic values.
     * @param {function(v: T) => Pr<U>} f - transformation function for a monad.
     * @return {Pr<U>} monadic value from v or transformed value by f(v).
     */
    Identity.prototype.bind = function (f) {
        return f(this.v);
    };
    return Identity;
}(monad_1.Monad));
exports.Identity = Identity;
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
var monad_1 = __webpack_require__(0);
/**
 * Class List - transform every element of array with given function "contemporaneously".
 * @extends {Monad}
 */
var List = (function (_super) {
    __extends(List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Method to transform every element of array with given function "contemporaneously".
     * @param {function(n: T) => U} f - transformation function for a monad.
     * @param {Array<T>} v - underlying value for a monad.
     * @return {Array<U>} monadic value from v or transformed value by F(v).
     */
    List.prototype.bind = function (f, v) {
        return this._disp(f, v);
    };
    /**
     * @param {function(n: T) => U} f - transformation function for a monad.
     * @param {any} v - underlying value for a monad.
     * @return {Array<U>} given value v or transformed value by F(v).
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * decreasing the dimension of an array by n.
 * @param {Array<T>} arr - input array.
 * @param {number} n - decreasing factor.
 * @return {Array<any>}
 */
function cast(arr, n) {
    return (n === 0 || n === undefined || n === null) ? arr : _reduser(arr, n);
}
exports.cast = cast;
/**
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
var maybe_1 = __webpack_require__(1);
var error_1 = __webpack_require__(3);
/**
 * Class State - for app. state manipulations.
 * @extends {Monad}
 */
var State = (function (_super) {
    __extends(State, _super);
    /**
     * Create an instance of class State.
     * @param {Object} state - The initial state of app.
     */
    function State(state) {
        var _this = _super.call(this) || this;
        /**
         * it hold app. state.
         * @type {T}
         */
        _this.state = state;
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
     * @param {function(v: T)=> T} f - app. state transformation function.
     * @return {State}
     */
    State.prototype.put = function (f) {
        this.state = this.err.bind(function (v) { return v; }, this.maybe.bind(function (v) { return f(v); }, this.state));
        return this;
    };
    /**
     * @return {T} The state of app.
     */
    State.prototype.get = function () {
        return this.state;
    };
    return State;
}(monad_1.Monad));
exports.State = State;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @description
 * Entry point for all public APIs of the MonadTS package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = __webpack_require__(6);
exports.List = list_1.List;
var identity_1 = __webpack_require__(5);
exports.Identity = identity_1.Identity;
var flow_1 = __webpack_require__(4);
exports.Flow = flow_1.Flow;
var clone_1 = __webpack_require__(2);
exports.clone = clone_1.clone;
var cast_1 = __webpack_require__(7);
exports.cast = cast_1.cast;
var maybe_1 = __webpack_require__(1);
exports.Maybe = maybe_1.Maybe;
var state_1 = __webpack_require__(8);
exports.State = state_1.State;
var monad_1 = __webpack_require__(0);
exports.Monad = monad_1.Monad;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 


/***/ })
/******/ ]);
});
//# sourceMappingURL=monad_ts.js.map