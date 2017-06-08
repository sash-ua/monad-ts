"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maybe_1 = require("../src/maybe");
describe('Maybe: ', function () {
    var maybe = new maybe_1.Maybe();
    it('1) should produce values', function () {
        expect(maybe.bind(function (v) { return v; }, 3)).toEqual(3);
    });
    it('2) should produce values', function () {
        var f = function (v) { return v; };
        expect(f(3)).toEqual(3);
    });
    it('3) should produce values', function () {
        var f = function (v) { return v; };
        expect(maybe.bind(function (v) { return v + 2; }, maybe.bind(f, 1))).toEqual(3);
    });
    it('4) should produce values', function () {
        var f = function (v) { return v; };
        expect(maybe.bind(function (x) { return maybe.bind(function (v) { return v + 2; }, f(x)); }, 1)).toEqual(3);
    });
    it('5) should produce values', function () {
        expect(maybe.bind(function (v) { return maybe.bind(function (v1) { return v + v1; }, 2); }, 1)).toEqual(3);
    });
    it('6) should produce values', function () {
        expect(maybe.bind(function (v) { return maybe.bind(function (v1) { return maybe.bind(function (v2) { return v + v1 + v2; }, 3); }, 2); }, 1)).toEqual(6);
    });
    it('7) should produce null', function () {
        expect(maybe.bind(function (v) { return maybe.bind(function (v1) { return v + v1; }, 1); }, undefined)).toBeNull();
    });
    it('8) should produce null', function () {
        expect(maybe.bind(function (v) { return maybe.bind(function (v1) { return v + v1; }, null); }, 1)).toBeNull();
    });
    it('9) should returne string', function () {
        var z = {
            url: 'http://...',
            getUrl: function () {
                return this.url;
            }
        };
        expect(maybe.bind(function (r) { return r.getUrl(); }, z)).toBe('http://...');
    });
    it('10) should returne string', function () {
        var z = {
            url: 'http://...',
            getUrl: function () { return z.url; }
        };
        expect(maybe.bind(function (r) { return r.getUrl(); }, z)).toBe('http://...');
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
