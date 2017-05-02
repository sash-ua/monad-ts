"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maybe_1 = require("../src/maybe");
describe('Maybe: ', function () {
    var maybe = new maybe_1.Maybe();
    it('should produce values', function () {
        expect(maybe.bind(function (v) { return v; }, 3)).toEqual(3);
        var f = function (v) { return v; };
        expect(f(3)).toEqual(3);
        expect(maybe.bind(function (v) { return v + 2; }, maybe.bind(f, 1))).toEqual(3);
        expect(maybe.bind(function (x) { return maybe.bind(function (v) { return v + 2; }, f(x)); }, 1)).toEqual(3);
        expect(maybe.bind(function (v) { return maybe.bind(function (v1) { return v + v1; }, 2); }, 1)).toEqual(3);
        expect(maybe.bind(function (v) { return maybe.bind(function (v1) { return maybe.bind(function (v2) { return v + v1 + v2; }, 3); }, 2); }, 1)).toEqual(6);
    });
    it('should produce null', function () {
        expect(maybe.bind(function (v) { return maybe.bind(function (v1) { return v + v1; }, 1); }, undefined)).toBeNull();
        expect(maybe.bind(function (v) { return maybe.bind(function (v1) { return v + v1; }, null); }, 1)).toBeNull();
    });
    it('1. should returne string', function () {
        var z = {
            url: 'http://...',
            getUrl: function () {
                return this.url;
            }
        };
        expect(maybe.bind(function (r) { return r.getUrl(); }, z)).toBe('http://...');
    });
    it('2. should returne string', function () {
        var z = {
            url: 'http://...',
            getUrl: function () { return z.url; }
        };
        expect(maybe.bind(function (r) { return r.getUrl(); }, z)).toBe('http://...');
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
