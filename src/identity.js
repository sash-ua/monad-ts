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
