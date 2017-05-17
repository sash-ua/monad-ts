"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var equality_1 = require("../src/services/equality");
describe('Equality: ', function () {
    it('should produce true', function () {
        expect(equality_1.equality({ x1: 0, x: [1, { c: [22, { j: 21, g: 'ert' }, 23] }, NaN, Infinity, null, undefined], t: [null, 0] }, { x1: 0, x: [1, { c: [22, { j: 21, g: 'ert' }, 23] }, NaN, Infinity, null, undefined], t: [null, 0] })).toBeTruthy();
    });
    it('1) should produce false', function () {
        expect(equality_1.equality({ x1: 0, x: [1, { c: [22, { j: 21, g: 'ert' }, 23] }, NaN, -Infinity, null, undefined], t: [null, 0] }, { x1: 0, x: [1, { c: [22, { j: 21, g: 'ert' }, 23] }, NaN, Infinity, null, undefined], t: [null, 0] })).toBeFalsy();
    });
    it('2) should produce false', function () {
        expect(equality_1.equality({ x1: 0, x: [1, { c: [22, { j: 21, g: 'ert' }, 23] }, NaN, Infinity, null, undefined], t: [null, -0] }, { x1: 0, x: [1, { c: [22, { j: 21, g: 'ert' }, 23] }, NaN, Infinity, null, undefined], t: [null, 0] })).toBeFalsy();
    });
    it('3) should produce false', function () {
        expect(equality_1.equality({ x1: 0, x: [1, { c: [22, { j: 21, g: 'ert' }, 23] }, NaN, Infinity, undefined, undefined], t: [null, 0] }, { x1: 0, x: [1, { c: [22, { j: 21, g: 'ert' }, 23] }, NaN, Infinity, null, undefined], t: [null, 0] })).toBeFalsy();
    });
    it('4) should produce false', function () {
        expect(equality_1.equality({ u: 0, x: [1, { c: [22, { j: 21, g: 'ert' }, 23] }, NaN, Infinity, null, undefined], t: [null, 0] }, { x1: 0, x: [1, { c: [22, { j: 21, g: 'ert' }, 23] }, NaN, Infinity, null, undefined], t: [null, 0] })).toBeFalsy();
    });
    it('should produce Error', function () {
        expect(equality_1.equality({ x1: 0, x: [1, { c: [22, { j: 21, g: 'ert' }, 23] }, NaN, Infinity, undefined, undefined], t: [null, 0] }, null) instanceof Error).toBeTruthy();
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
