"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debounceTime_1 = require("../src/services/debounceTime");
describe('Function debounceTime: ', function () {
    it('1) should produce number, mode - delay before first func invoke', function (done) {
        var f = function (arg) { return v += arg; };
        var v = 0;
        var dT = debounceTime_1.debounceTime(f, 100, false);
        for (var i = 0; i < 10; i++) {
            dT(1);
        }
        expect(v).toEqual(0);
        done();
    });
    it('2) should produce number, mode - no delay before first func invoke', function (done) {
        var f = function (arg) { return v += arg; };
        var v = 0;
        var dT = debounceTime_1.debounceTime(f, 100);
        for (var i = 0; i < 10; i++) {
            dT(1);
        }
        expect(v).toEqual(1);
        done();
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
