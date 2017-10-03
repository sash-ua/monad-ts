"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("../src/error");
describe('ErrorM: ', function () {
    var e = new error_1.ErrorM();
    it('1) should produce return values', function () {
        expect(e.bind(function (v) { return v; }, 3)).toEqual(3);
    });
    it('2) should produce return values', function () {
        var f = function (v) { return v; };
        expect(f(3)).toEqual(3);
    });
    it('3) should produce return values', function () {
        var f = function (v) { return v; };
        expect(e.bind(function (v) { return v + 2; }, e.bind(f, 1))).toEqual(3);
    });
    it('4) should produce return values', function () {
        var f = function (v) { return v; };
        expect(e.bind(function (x) { return e.bind(function (v) { return v + 2; }, f(x)); }, 1)).toEqual(3);
    });
    it('5) should produce errors', function () {
        expect(e.bind(function (v) { return e.bind(function (v1) { return v + v1; }, 1); }, Infinity) instanceof Error).toBeTruthy();
    });
    it('6) should produce errors', function () {
        expect(e.bind(function (v) { return e.bind(function (v1) { return v + v1; }, 1); }, NaN) instanceof Error).toBeTruthy();
    });
    it('7) should produce errors', function () {
        expect(e.bind(function (v) { return e.bind(function (v1) { return v / v1; }, 0); }, 1) instanceof Error).toBeTruthy();
    });
    it('8) should produce errors', function () {
        expect(e.bind(function (v) { return e.bind(function (v1) { return v / v1; }, -0); }, 1) instanceof Error).toBeTruthy();
    });
    it('9) should produce errors', function () {
        expect(e.bind(function (v) { return e.bind(function (v1) { return v / v1; }, 0); }, 0) instanceof Error).toBeTruthy();
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
