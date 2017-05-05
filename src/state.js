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
/**
 * Class State - for application state manipulations.
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
