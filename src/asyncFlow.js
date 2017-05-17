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
var maybe_1 = require("./maybe");
var error_1 = require("./error");
var clone_1 = require("./services/clone");
var monad_1 = require("./monad");
/**
 * Class AsyncFlow - for composing monads in an async flow (pipe), based on Promise.
 */
var AsyncFlow = (function (_super) {
    __extends(AsyncFlow, _super);
    /**
     * creates an instance of class AsyncFlow.
     * @param {any} [initV = 0] initV - initial value of new flow (pipe).
     * @param {boolean} [encapsulate = true] encapsulate - flag, if true then the init value will be cloned.
     */
    function AsyncFlow(initV, encapsulate) {
        if (initV === void 0) { initV = 0; }
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
     * binds initial value to the transformation function
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
