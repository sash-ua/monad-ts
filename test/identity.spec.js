"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var identity_1 = require("../src/identity");
describe('Identity: ', function () {
    it('1) should produce values', function () {
        var i = new identity_1.Identity();
        expect(i.just(function (v) { return v; }, 3)).toEqual(3);
    });
    it('2) should produce values', function () {
        var f = function (v) { return v; };
        expect(f(3)).toEqual(3);
    });
    it('3) should produce values', function () {
        var i = new identity_1.Identity();
        var f = function (v) { return v; };
        expect(i.just(function (v) { return v + 2; }, i.just(f, 1))).toEqual(3);
    });
    it('4) should produce values', function () {
        var i = new identity_1.Identity();
        var f = function (v) { return v; };
        expect(i.just(function (x) { return i.just(function (v) { return v + 2; }, f(x)); }, 1)).toEqual(3);
    });
    it('5) should produce values', function () {
        var i = new identity_1.Identity(3);
        expect(i.bind(function (v) { return v; })).toEqual(3);
    });
    it('6) should produce values', function () {
        var f = function (v) { return v; };
        expect(f(3)).toEqual(3);
    });
    it('7) should produce values', function () {
        var i = new identity_1.Identity(3);
        expect(i.bind(function (v) { return v + 2; })).toEqual(5);
    });
    it('8) should produce values', function () {
        var i = new identity_1.Identity(3);
        expect(i.bind(function (x) { return i.bind(function (v) { return x + 2; }); })).toEqual(5);
    });
    it('9) should produce true', function () {
        var i = new identity_1.Identity(3);
        expect(i.bind(function (v) { return v; }, 5) instanceof Error).toBeTruthy();
    });
    it('10) should produce value', function () {
        var i = new identity_1.Identity();
        var f = function () {
            return 5;
        };
        expect(i.bind(f, null)).toEqual(5);
    });
    it('11) should produce value', function () {
        var i = new identity_1.Identity(0);
        var f = function (v) {
            return v;
        };
        expect(i.bind(f)).toEqual(0);
    });
    it('12) should produce value', function () {
        var i = new identity_1.Identity('');
        var f = function (v) {
            return v;
        };
        expect(i.bind(f)).toMatch('');
    });
    it('13) should produce value', function () {
        var i = new identity_1.Identity();
        var f = function (v) {
            return v;
        };
        expect(i.bind(f, 0)).toEqual(0);
    });
    it('14) should produce value', function () {
        var i = new identity_1.Identity();
        var f = function (v) {
            return v;
        };
        expect(i.bind(f, '')).toMatch('');
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
