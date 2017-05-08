"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
describe('Either: ', function () {
    var uVal = 10;
    var testStr = '10 - isn\'t string';
    it('should produce string', function () {
        var right = function (x) { return x + 1; };
        var left = function (y) { return y + ' - isn\'t string'; };
        var cond = function (v) { return typeof v === 'string'; };
        var e = new index_1.Either(right, left);
        var w = cond(uVal) ? right(uVal) : left(uVal);
        expect(w).toEqual(testStr);
    });
    it('should produce string', function () {
        var right = function (x) { return x + 1; };
        var left = function (y) { return y + ' - isn\'t string'; };
        var cond = function (v) { return typeof v === 'string'; };
        var e = new index_1.Either(right, left).bind(cond, uVal);
        expect(e).toEqual(testStr);
    });
    it('should produce number', function () {
        var right = function (x) { return x + 1; };
        var left = function (y) { return y + ' - isn\'t string'; };
        var cond = function (v) { return typeof v !== 'string'; };
        var e = new index_1.Either(right, left).bind(cond, uVal);
        expect(e).toEqual(11);
    });
    it('should produce Error', function () {
        var right = function (x) { return x + 1; };
        var left = function (y) { return y + ' - isn\'t string'; };
        var cond = function (v) { return v; };
        var e = new index_1.Either(right, left).bind(cond, uVal);
        expect(e instanceof Error).toBeTruthy();
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
