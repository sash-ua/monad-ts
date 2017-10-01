"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maybe_1 = require("./maybe");
var error_1 = require("./error");
var clone_1 = require("./services/clone");
var equality_1 = require("./services/equality");
/**
 * Class State - it takes a state and returns an intermediate value and some new state value.
 */
var State = /** @class */ (function () {
    /**
     * creates an instance of class State.
     * @param {Object} state - the initial state of app.
     */
    function State(state) {
        /**
         * keeps the state of application variables.
         * @type {T}
         */
        this.state = clone_1.clone(state);
        /**
         * the instance of Maybe.
         * @type {Maybe}
         */
        this.maybe = new maybe_1.Maybe();
        /**
         * the instance of ErrorM.
         * @type {ErrorM}
         */
        this.err = new error_1.ErrorM();
    }
    /**
     * changes the state of application variables, if you try add new key with put() to state object it'll be assigned
     * with Error instance.
     * @param {function(v: T)=> T} f - app. state transformation function.
     */
    State.prototype.put = function (f) {
        var buffer = clone_1.clone(this.state);
        this.state = this.err.bind(function (v) { return equality_1.equality(Object.getOwnPropertyNames(buffer), Object.getOwnPropertyNames(v))
            ? v
            : new Error('State.put() - after init we can not add / remove keys in state obj.'); }, this.maybe.bind(function (v) { return f(v); }, this.state));
    };
    /**
     * extracts the state of application variables.
     * @return {T}
     */
    State.prototype.get = function () {
        return this.state;
    };
    return State;
}());
exports.State = State;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
