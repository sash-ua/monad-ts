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
var monad_1 = require("./monad");
var maybe_1 = require("./maybe");
var clone_1 = require("./services/clone");
var error_1 = require("./error");
/**
 * Class Flow - for composing monads in a flow (pipe).
 * @extends {Monad}
 */
var Flow = /** @class */ (function (_super) {
    __extends(Flow, _super);
    /**
     * create an instance of class AsyncFlow.
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
     * chains the operations on a monadic values.
     * @param {function(v: T) => Pr<U>} f - transformation function for a main flow value.
     * @param {any} [v= this.flow] - underlying value for a monad.
     * @return {Flow<T>} transformed by f() value v or throw Error or null.
     */
    Flow.prototype.bind = function (f, v) {
        var _this = this;
        if (v === void 0) { v = this.flow; }
        this.flow = this.err.bind(function (v) { return _this.maybe.bind(function (v) { return f(v); }, v); }, v);
        return this;
    };
    /**
     * creates branch from a flow (pipe).
     * @param {function(v: T) => Pr<U>} f - transformation function for a main flow value.
     * @return {Flow<T>}
     */
    Flow.prototype.let = function (f) {
        f(clone_1.clone(this.flow));
        return this;
    };
    /**
     * extract value from a flow (pipe).
     * @return {T}
     */
    Flow.prototype.subscribe = function () {
        return this.flow;
    };
    return Flow;
}(monad_1.Monad));
exports.Flow = Flow;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
