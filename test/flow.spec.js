"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flow_1 = require("../src/flow");
var cast_1 = require("../src/services/cast");
var list_1 = require("../src/list");
describe('Flow: ', function () {
    var list = new list_1.List();
    it('1) should return Error', function () {
        var z = new flow_1.Flow(5)
            .bind(function (v) { return v + 1; })
            .bind(function (v) { return new Error("value " + v); })
            .bind(function (v) { return cast_1.cast(list.bind(function (v) { return [v - 1, v, v + 1]; }, [-v, v]), 1); })
            .subscribe();
        expect(z instanceof Error).toBeTruthy();
    });
    it('2) shouldn\'t change inner state if was changed init object. Default encapsulation mode.', function () {
        var init = Object({ data: 1, children: [Object({ data: 2, parent: 'null' })], arr: [1, 2, 3] });
        var res = Object({ data: 100, children: [Object({ data: 2, parent: 'null' })], arr: [1, 2, 3] });
        var z = new flow_1.Flow(init)
            .bind(function (v) { v.data = 100; return v; })
            .subscribe();
        expect(z).toEqual(res);
    });
    it('3) shouldn\'t change inner state if was changed init object. Default encapsulation mode.', function () {
        var init = Object({ data: 1, children: [Object({ data: 2, parent: 'null' })], arr: [1, 2, 3] });
        var res = Object({ data: 100, children: [Object({ data: 2, parent: 'null' })], arr: [1, 2, 3] });
        var z = new flow_1.Flow(init)
            .bind(function (v) { v.data = 100; return v; })
            .subscribe();
        init.data = 50;
        expect(z).toEqual(res);
    });
    it('4) should change inner state if was changed init object. No encapsulation mode.', function () {
        var init = Object({ data: 1, children: [Object({ data: 2, parent: 'null' })], arr: [1, 2, 3] });
        var res = Object({ data: 100, children: [Object({ data: 2, parent: 'null' })], arr: [1, 2, 3] });
        var z = new flow_1.Flow(init, false)
            .bind(function (v) { v.data = 100; return v; })
            .subscribe();
        expect(z).toEqual(res);
    });
    it('5) should change inner state if was changed init object. No encapsulation mode.', function () {
        var init = Object({ data: 1, children: [Object({ data: 2, parent: 'null' })], arr: [1, 2, 3] });
        var resChanged = Object({ data: 50, children: [Object({ data: 2, parent: 'null' })], arr: [1, 2, 3] });
        var z = new flow_1.Flow(init, false)
            .bind(function (v) { v.data = 100; return v; })
            .subscribe();
        init.data = 50;
        expect(z).toEqual(resChanged);
    });
    it('6) should return null', function () {
        var z = new flow_1.Flow(5)
            .bind(function (v) { return v + 1; })
            .bind(function (v) { return null; })
            .bind(function (v) { return cast_1.cast(list.bind(function (v) { return [v - 1, v, v + 1]; }, [-v, v]), 1); })
            .subscribe();
        expect(z).toBeNull();
    });
    it('7) should return null', function () {
        var z = new flow_1.Flow(5)
            .bind(function (v) { return v + 1; })
            .bind(function (v) { return undefined; })
            .bind(function (v) { return cast_1.cast(list.bind(function (v) { return [v - 1, v, v + 1]; }, [-v, v]), 1); })
            .subscribe();
        expect(z).toBeNull();
    });
    it('8) should return null', function () {
        var z = new flow_1.Flow(5)
            .bind(function (v) { return v / 0; })
            .bind(function (v) { return cast_1.cast(list.bind(function (v) { return [v - 1, v, v + 1]; }, [-v, v]), 1); })
            .subscribe();
        expect(z instanceof Error).toBeTruthy();
    });
    it('9) should produce array', function () {
        var z = new flow_1.Flow(5)
            .bind(function (v) { return v + 1; })
            .bind(function (v) { return cast_1.cast(list.bind(function (v) { return [v - 1, v, v + 1]; }, [-v, v]), 1); })
            .subscribe();
        expect(z).toEqual([-7, -6, -5, 5, 6, 7]);
    });
    it('10) should set shared variables', function () {
        var t;
        expect(t).toBeUndefined();
    });
    it('11) should set shared variables', function () {
        var r;
        expect(r).toBeUndefined();
    });
    it('12) should set shared variables', function () {
        var e = 50;
        var r;
        var t;
        var z = new flow_1.Flow(5)
            .bind(function (v) { return v + 1; })
            .let(function (v) { return new flow_1.Flow(v).bind(function (v) { return r = v + e; }); })
            .bind(function (v) { return cast_1.cast(list.bind(function (v) { return [v - 1, v, v + 1]; }, [-v, v]), 1); })
            .let(function (v) { return new flow_1.Flow(v).bind(function (v) { return t = v; }, cast_1.cast(list.bind(function (v) { return [v, -v]; }, [v]), 2)); })
            .subscribe();
        expect(r).toEqual(56);
    });
    it('13) should set shared variables', function () {
        var e = 50;
        var r;
        var t;
        var z = new flow_1.Flow(5)
            .bind(function (v) { return v + 1; })
            .let(function (v) { return new flow_1.Flow(v).bind(function (v) { return r = v + e; }); })
            .bind(function (v) { return cast_1.cast(list.bind(function (v) { return [v - 1, v, v + 1]; }, [-v, v]), 1); })
            .let(function (v) { return new flow_1.Flow(v).bind(function (v) { return t = v; }, cast_1.cast(list.bind(function (v) { return [v, -v]; }, [v]), 2)); })
            .subscribe();
        expect(t).toEqual([-7, 7, -6, 6, -5, 5, 5, -5, 6, -6, 7, -7]);
    });
    it('14) should set shared variables', function () {
        var e = 50;
        var r;
        var t;
        var z = new flow_1.Flow(5)
            .bind(function (v) { return v + 1; })
            .let(function (v) { return new flow_1.Flow(v).bind(function (v) { return r = v + e; }); })
            .bind(function (v) { return cast_1.cast(list.bind(function (v) { return [v - 1, v, v + 1]; }, [-v, v]), 1); })
            .let(function (v) { return new flow_1.Flow(v).bind(function (v) { return t = v; }, cast_1.cast(list.bind(function (v) { return [v, -v]; }, [v]), 2)); })
            .subscribe();
        expect(z).toEqual([-7, -6, -5, 5, 6, 7]);
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
