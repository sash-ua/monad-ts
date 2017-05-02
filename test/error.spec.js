"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("../src/error");
describe('ErrorM: ', function () {
    var e = new error_1.ErrorM();
    it('should produce return values', function () {
        expect(e.just(function (v) { return v; }, 3)).toEqual(3);
        var f = function (v) { return v; };
        expect(f(3)).toEqual(3);
        expect(e.just(function (v) { return v + 2; }, e.just(f, 1))).toEqual(3);
        expect(e.just(function (x) { return e.just(function (v) { return v + 2; }, f(x)); }, 1)).toEqual(3);
    });
    it('should produce errors', function () {
        expect(e.bind(function (v) { return e.bind(function (v1) { return v + v1; }, 1); }, Infinity) instanceof Error).toBeTruthy();
        expect(e.bind(function (v) { return e.bind(function (v1) { return v + v1; }, 1); }, NaN) instanceof Error).toBeTruthy();
        expect(e.bind(function (v) { return e.bind(function (v1) { return v / v1; }, 0); }, 1) instanceof Error).toBeTruthy();
        expect(e.bind(function (v) { return e.bind(function (v1) { return v / v1; }, -0); }, 1) instanceof Error).toBeTruthy();
        expect(e.bind(function (v) { return e.bind(function (v1) { return v / v1; }, 0); }, 0) instanceof Error).toBeTruthy();
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
