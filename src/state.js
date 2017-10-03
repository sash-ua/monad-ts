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
var equality_1 = require("./services/equality");
var monad_1 = require("./monad");
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
        var state = !!this.state;
        var vL = !!v;
        switch (true) {
            case (state && vL):
                this.state = this.fail('State.bind() - underlying value of the monad have defined in the constructor!');
                break;
            case (!state && !vL):
                this.state = this.fail('State.bind() - underlying value of the monad have not defined!');
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
            : _this.fail('State.put()._maybeErrorT() - after init we can not add / remove keys in state obj.'); }, this.maybe.bind(function (v) { return f(v); }, this.state));
    };
    /**
     * Extracts the state of app.
     * @method get
     * @return {Pr<T> | Error}
     */
    State.prototype.get = function () {
        return this.state;
    };
    return State;
}(monad_1.Monad));
exports.State = State;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
