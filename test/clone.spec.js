"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clone_1 = require("../src/services/clone");
describe('Service Clone: ', function () {
    var p = 'str';
    var n = null;
    var f = { x: 1 };
    var o = {
        data: 1,
        children: [{
                data: 2,
                parent: 'null'
            }],
        arr: [1, 2, 3]
    };
    var t = {
        data: 10,
        children: [{
                data: 2,
                parent: 'null'
            }],
        arr: [1, 2, 3]
    };
    it('should produce clone of object', function () {
        var lo = clone_1.clone(o);
        expect(o).toEqual(o);
        expect(lo).toEqual(o);
        lo.data = 10;
        expect(lo).toEqual(t);
        expect(o).not.toEqual(t);
    });
    it('should return primitive', function () {
        expect(clone_1.clone(p)).toEqual(p);
        expect(clone_1.clone(n)).toEqual(n);
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
