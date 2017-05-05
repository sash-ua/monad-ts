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
