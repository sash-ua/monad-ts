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
    it('1) should return changed given object', function () {
        initState.data = 100;
        expect(st.get()).toEqual({ data: 1, children: [Object({ data: 2, parent: 'null' })], arr: [1, 2, 3] });
    });
    it('2) should return changed given object', function () {
        st.put(function (v) {
            v.data = 10;
            v.arr = list.bind(function (x) { return x + f; }, v.arr);
            return v;
        });
        expect(st.get()).toEqual({ data: 10, children: [Object({ data: 2, parent: 'null' })], arr: [2.25, 3.25, 4.25] });
    });
    it('3) should return changed given object', function () {
        st.put(function (v) {
            v.data = 11;
            return v;
        });
        expect(st.get()).toEqual({ data: 11, children: [Object({ data: 2, parent: 'null' })], arr: [2.25, 3.25, 4.25] });
    });
    it('4) should produce Error', function () {
        st.put(function (v) {
            v.test = 10;
            v.arr = list.bind(function (x) { return x + f; }, v.arr);
            return v;
        });
        expect(st.get() instanceof Error).toBeTruthy();
    });
    it('5) should produce state', function () {
        var iS = {
            data: 1,
            children: [{
                    data: 2,
                    parent: 'null'
                }],
            arr: [1, 2, 3]
        };
        var st = new state_1.State();
        st.bind(function (x) { return x; }, iS);
        expect(st.get()).toEqual(iS);
    });
    it('6) should produce Error', function () {
        var st = new state_1.State(null);
        st.bind(function (x) { return x; }, null);
        expect(st.get() instanceof Error).toBeTruthy();
    });
    it('7) should produce Error', function () {
        var st = new state_1.State(undefined);
        st.bind(function (x) { return x; }, undefined);
        expect(st.get() instanceof Error).toBeTruthy();
    });
    it('8) should produce Error', function () {
        var st = new state_1.State();
        st.bind(function (x) { return x; });
        expect(st.get() instanceof Error).toBeTruthy();
    });
    it('9) should produce Error', function () {
        var st = new state_1.State(0);
        st.bind(function (x) { return x; }, 0);
        expect(st.get() instanceof Error).toBeTruthy();
    });
    it('10) should produce Error', function () {
        var st = new state_1.State('');
        st.bind(function (x) { return x; }, '');
        expect(st.get() instanceof Error).toBeTruthy();
    });
    it('11) should produce value', function () {
        var st = new state_1.State(0);
        st.bind(function (x) { return x; });
        expect(st.get() instanceof Error).toBeTruthy();
    });
    it('12) should produce value', function () {
        var st = new state_1.State('');
        st.bind(function (x) { return x; });
        expect(st.get() instanceof Error).toBeTruthy();
    });
    it('13) should produce value', function () {
        var st = new state_1.State();
        st.bind(function (x) { return x; }, 0);
        expect(st.get() instanceof Error).toBeTruthy();
    });
    it('14) should produce value', function () {
        var st = new state_1.State();
        st.bind(function (x) { return x; }, '');
        expect(st.get() instanceof Error).toBeTruthy();
    });
    it('15) should return changed given object', function () {
        var initState = {
            data: 1,
            children: [{
                    data: 2,
                    parent: null
                }],
            arr: [1, 2, 3]
        };
        var st = new state_1.State();
        st.bind(function (x) { return x; }, initState);
        var list = new list_1.List();
        var f = 1.25;
        st.put(function (v) {
            v.data = 10;
            v.arr = list.bind(function (x) { return x + f; }, v.arr);
            return v;
        });
        expect(st.get()).toEqual({ data: 10, children: [Object({ data: 2, parent: null })], arr: [2.25, 3.25, 4.25] });
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
