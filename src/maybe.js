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
 * Class Maybe
 * @extends {Monad}
 */
var Maybe = (function (_super) {
    __extends(Maybe, _super);
    function Maybe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Method that chains the operations on a monadic values
     * @param {function(v: any)} f - transformation function for a monad
     * @param {any} v - underlying value for a monad.
     * @return {Pr<U>} given value v or transformed value by f(v)
     */
    Maybe.prototype.bind = function (f, v) {
        if (v === null || v === undefined) {
            return this.nothing();
        }
        else {
            var vL = this.just(f, v);
            return (vL === null || vL === undefined) ? this.nothing() : vL;
        }
    };
    /**
     * return nothing (null)
     * @returns {null}
     */
    Maybe.prototype.nothing = function () {
        return null;
    };
    ;
    return Maybe;
}(monad_1.Monad));
exports.Maybe = Maybe;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
