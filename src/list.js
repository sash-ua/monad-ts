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
 * Class List.
 * @extends {Monad}
 */
var List = (function (_super) {
    __extends(List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Method that chains the operations on a monadic values
     * @param {function(v: any)} f - transformation function for a monad
     * @param {T} v - underlying value for a monad.
     * @return {Pr<U>} given value v or transformed value by F(v)
     */
    List.prototype.bind = function (f, v) {
        return this._disp(f, v);
    };
    /**
     * @param {function(v: any)} f - transformation function of a monad
     * @param {any} v - underlying value for a monad.
     * @return {Pr<U>} given value v or transformed value by F(v)
     * @private
     */
    List.prototype._disp = function (f, v) {
        var _this = this;
        return v.map(function (vL) {
            return !Array.isArray(vL) ? f(vL) : _this._disp(f, vL);
        });
    };
    return List;
}(monad_1.Monad));
exports.List = List;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
