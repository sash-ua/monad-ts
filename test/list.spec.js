"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("../src/list");
var cast_1 = require("../src/services/cast");
describe('List: ', function () {
    var list = new list_1.List();
    it('1) should produce array', function () {
        var z = cast_1.cast(list.bind(function (v) { return v; }, [1]), 0);
        expect(z).toEqual([1]);
    });
    it('2) should produce array', function () {
        var z = list.bind(function (v) { return v; }, [1]);
        expect(z).toEqual([1]);
    });
    it('3) should produce array', function () {
        var f = function (v) { return v; };
        expect(f([1])).toEqual([1]);
    });
    it('4) should produce array', function () {
        var answ = [-9, 9, -10, 10, -11, 11];
        var z = cast_1.cast(list.bind(function (v) { return [-v, v]; }, list.bind(function (v) { return [v - 1, v, v + 1]; }, [10])), 2);
        expect(z).toEqual(answ);
    });
    it('5) should produce array', function () {
        var answ = [-9, 9, -10, 10, -11, 11];
        var z = cast_1.cast(list.bind(function (v) { return list.bind(function (v) { return [-v, v]; }, [v - 1, v, v + 1]); }, [10]), 2);
        expect(z).toEqual(answ);
    });
    it('6) should produce array', function () {
        var answ1 = [-9, 9, -10, 10, -11, 11, -1, 1, -2, 2, -3, 3];
        var z = cast_1.cast(list.bind(function (v) { return [-v, v]; }, list.bind(function (v) { return [v - 1, v, v + 1]; }, [10, 2])), 2);
        expect(z).toEqual(answ1);
    });
    it('7) should produce array', function () {
        var answ1 = [-9, 9, -10, 10, -11, 11, -1, 1, -2, 2, -3, 3];
        var z = cast_1.cast(list.bind(function (v) { return list.bind(function (v) { return [-v, v]; }, [v - 1, v, v + 1]); }, [10, 2]), 2);
        expect(z).toEqual(answ1);
    });
    it('8) should produce array', function () {
        var y1 = cast_1.cast(list.bind(function (x) { return list.bind(function (x) { return new list_1.List().bind(function (x) { return [x + 'a']; }, [-x, x]); }, [x - 1, x, x + 1]); }, [10]), 3);
        expect(y1).toEqual(['-9a', '9a', '-10a', '10a', '-11a', '11a']);
    });
    it('9) should produce array', function () {
        var y2 = cast_1.cast(list.bind(function (x) { return list.bind(function (x) { return [x]; }, [__assign({ rt: 1 }, x), x, x]); }, [{ a: 10 }]), 2);
        expect(y2).toEqual([Object({ rt: 1, a: 10 }), Object({ a: 10 }), Object({ a: 10 })]);
    });
    it('10) should produce array of arrays', function () {
        var rz = [[-9, 9], [-10, 10], [-11, 11], [-1, 1], [-2, 2], [-3, 3]];
        var z = cast_1.cast(list.bind(function (v) { return [-v, v]; }, list.bind(function (v) { return [v - 1, v, v + 1]; }, [[10], [2]])), 2);
        expect(z).toEqual(rz);
    });
    it('11) should produce array of arrays', function () {
        var rz = [[-9, 9], [-10, 10], [-11, 11], [-1, 1], [-2, 2], [-3, 3]];
        var z = cast_1.cast(list.bind(function (v) { return list.bind(function (v) { return [-v, v]; }, [v - 1, v, v + 1]); }, [[10], [2]]), 2);
        expect(z).toEqual(rz);
    });
    it('12) should produce array of arrays', function () {
        var rz3 = [[-19, 19], [-20, 20], [-21, 21], [-10, 10], [-11, 11], [-12, 12], [-3, 3], [-4, 4], [-5, 5], [-2, 2], [-3, 3], [-4, 4]];
        var z3 = cast_1.cast(list.bind(function (v) { return [-v, v]; }, list.bind(function (v) { return [v - 1, v, v + 1]; }, list.bind(function (v) { return [v * 2, v + 1]; }, [[10], [2]]))), 3);
        expect(z3).toEqual(rz3);
    });
    it('13) should produce array of arrays', function () {
        var rz3 = [[-19, 19], [-20, 20], [-21, 21], [-10, 10], [-11, 11], [-12, 12], [-3, 3], [-4, 4], [-5, 5], [-2, 2], [-3, 3], [-4, 4]];
        var z3 = cast_1.cast(list.bind(function (v) { return list.bind(function (v) { return list.bind(function (v) { return [-v, v]; }, [v - 1, v, v + 1]); }, [v * 2, v + 1]); }, [[10], [2]]), 3);
        expect(z3).toEqual(rz3);
    });
    it('14) should produce string', function () {
        var t = 'test'.split('');
        var z = cast_1.cast(list.bind(function (x) { return list.bind(function (x) { return x === 't' ? x : x = ' '; }, [x]); }, t), 2).join('');
        expect(z).toEqual('t  t');
    });
    it('15) should produce string', function () {
        var t = 'test'.split('');
        var s = cast_1.cast(list.bind(function (x) { return list.bind(function (x) { return x === 'tt' ? x : x = ' '; }, [x + 't']); }, t), 2).join('');
        expect(s).toEqual('tt  tt');
    });
    it('16) should produce an error', function () {
        expect(list.bind(function (v) { return v; }, 'abc') instanceof Error).toBeTruthy();
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
