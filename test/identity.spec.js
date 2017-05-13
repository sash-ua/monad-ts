"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var identity_1 = require("../src/identity");
describe('Identity: ', function () {
    it('should produce values', function () {
        var i = new identity_1.Identity();
        expect(i.just(function (v) { return v; }, 3)).toEqual(3);
        var f = function (v) { return v; };
        expect(f(3)).toEqual(3);
        expect(i.just(function (v) { return v + 2; }, i.just(f, 1))).toEqual(3);
        expect(i.just(function (x) { return i.just(function (v) { return v + 2; }, f(x)); }, 1)).toEqual(3);
    });
    it('should produce values', function () {
        var i = new identity_1.Identity(3);
        expect(i.bind(function (v) { return v; })).toEqual(3);
        var f = function (v) { return v; };
        expect(f(3)).toEqual(3);
        expect(i.bind(function (v) { return v + 2; })).toEqual(5);
        expect(i.bind(function (x) { return i.bind(function (v) { return x + 2; }); })).toEqual(5);
    });
    it('should ', function () {
        var i = new identity_1.Identity(3);
        expect(i.bind(function (v) { return v; }, 5) instanceof Error).toBeTruthy();
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
