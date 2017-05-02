"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var identity_1 = require("../src/identity");
describe('Identity: ', function () {
    var i = new identity_1.Identity();
    it('should produce return values', function () {
        expect(i.just(function (v) { return v; }, 3)).toEqual(3);
        var f = function (v) { return v; };
        expect(f(3)).toEqual(3);
        expect(i.just(function (v) { return v + 2; }, i.just(f, 1))).toEqual(3);
        expect(i.just(function (x) { return i.just(function (v) { return v + 2; }, f(x)); }, 1)).toEqual(3);
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
