"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clone_1 = require("../src/services/clone");
describe('Service Clone: ', function () {
    var p = 'str';
    var n = null;
    var o = {
        data: 1,
        children: [{
                data: 2,
                parent: 'null'
            }],
        arr: [1, 2, 3]
    };
    var o2 = {
        data: 1,
        children: {
            data: 2,
            parent: 'null'
        },
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
    it('1) should produce clone of object', function () {
        var lo = clone_1.clone(o);
        expect(lo).toEqual(o);
    });
    it('2) should produce clone of object', function () {
        var lo = clone_1.clone(o);
        lo.data = 10;
        expect(lo).toEqual(t);
    });
    it('3) should produce clone of object', function () {
        var l = o, z = clone_1.clone(o);
        expect(o).not.toEqual(o2);
        expect(l).not.toEqual(o2);
        expect(z).not.toEqual(o2);
        o.children = { data: 2, parent: 'null' };
        expect(o).toEqual(o2);
        expect(l).toEqual(o2);
        expect(z).not.toEqual(o2);
    });
    it('4) should return primitive', function () {
        expect(clone_1.clone(p)).toEqual(p);
    });
    it('5) should return primitive', function () {
        expect(clone_1.clone(n)).toEqual(n);
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
