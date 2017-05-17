"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cast_1 = require("../src/services/cast");
var list_1 = require("../src/list");
var asyncFlow_1 = require("../src/asyncFlow");
var wait_1 = require("../src/services/wait");
describe('AsyncFlow: ', function () {
    var list = new list_1.List();
    it('should produce value', function () {
        new asyncFlow_1.AsyncFlow(5)
            .bind(function (v) { return v; })
            .then(function (v) { return v; })
            .then(function (v) { return cast_1.cast(list.bind(function (v) { return [v - 1, v, v + 1]; }, [v]), 1); })
            .then(function (v) { return wait_1.wait(v, 0); })
            .then(function (v) {
            expect(v).toEqual([4, 5, 6]);
        });
    });
    it('should produce value (async)', function (done) {
        new asyncFlow_1.AsyncFlow(5)
            .bind(function (v) { return v; })
            .then(function (v) { return v; })
            .then(function (v) { return cast_1.cast(list.bind(function (v) { return [v - 1, v, v + 1]; }, [v]), 1); })
            .then(function (v) { return wait_1.wait(v, 100); })
            .then(function (v) {
            expect(v).toEqual([4, 5, 6]);
            done();
        });
    });
    it('should produce null', function () {
        var z = new asyncFlow_1.AsyncFlow(null)
            .bind(function (v) { return v; })
            .then(function (v) {
            expect(v).toBeNull();
        });
    });
    it('should produce Error', function () {
        var z = new asyncFlow_1.AsyncFlow(new Error('f'))
            .bind(function (v) { return v; })
            .then(function (v) {
            expect(v instanceof Error).toBeTruthy();
        });
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
