"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../src/state");
var list_1 = require("../src/list");
describe('State: ', function () {
    var initState = {
        data: 1,
        children: [{
                data: 2,
                parent: 'null'
            }],
        arr: [1, 2, 3]
    };
    var st = new state_1.State(initState);
    var list = new list_1.List();
    var f = 1.25;
    it('should return changed given object', function () {
        expect(st.get()).toEqual({ data: 1, children: [Object({ data: 2, parent: 'null' })], arr: [1, 2, 3] });
        st.put(function (v) {
            v.data = 10;
            v.arr = list.bind(function (x) { return x + f; }, v.arr);
            return v;
        });
        expect(st.get()).toEqual({ data: 10, children: [Object({ data: 2, parent: 'null' })], arr: [2.25, 3.25, 4.25] });
        st.put(function (v) {
            v.data = 11;
            return v;
        });
        expect(st.get()).toEqual({ data: 11, children: [Object({ data: 2, parent: 'null' })], arr: [2.25, 3.25, 4.25] });
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
