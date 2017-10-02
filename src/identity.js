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
var clone_1 = require("./services/clone");
var equality_1 = require("./services/equality");
var error_1 = require("./error");
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
