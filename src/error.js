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
 * Class ErrorM - return given value or produce Error if take Error or get Error after execution of f(v).
 * @extends {Monad}
 */
var ErrorM = (function (_super) {
    __extends(ErrorM, _super);
    function ErrorM() {
        return _super !== null && _super.apply(this, arguments) || this;
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
