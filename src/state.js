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
var error_1 = require("./error");
var clone_1 = require("./services/clone");
/**
 * Class State - for application state manipulations.
 * @extends {Monad}
 */
var State = (function (_super) {
    __extends(State, _super);
    /**
     * creates an instance of class State.
     * @param {Object} state - the initial state of app.
     */
    function State(state) {
        var _this = _super.call(this) || this;
        /**
         * keeps the state of application variables.
         * @type {T}
         */
        _this.state = clone_1.clone(state);
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
     * changes the state of application variables.
     * @param {function(v: T)=> T} f - app. state transformation function.
     * @return {State<T>}
     */
    State.prototype.put = function (f) {
        this.state = this.err.bind(function (v) { return v; }, this.maybe.bind(function (v) { return f(v); }, this.state));
        return this;
    };
    /**
     * extracts the state of application variables.
     * @return {T}
     */
    State.prototype.get = function () {
        return this.state;
    };
    return State;
}(monad_1.Monad));
exports.State = State;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
