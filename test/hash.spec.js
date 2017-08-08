"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hash_1 = require("../src/services/hash");
describe('Hash: ', function () {
    it('1) should produce number', function () {
        expect(hash_1.hash('test "#^')).toEqual(-1614314080);
        expect(hash_1.hash('test "#^')).toEqual(-1614314080);
    });
    it('2) should produce number', function () {
        expect(hash_1.hash('test "#^test "#^test "#^test "#^test "#^test "#^test "#^test "#^')).toEqual(-3309452539);
        expect(hash_1.hash('test "#^test "#^test "#^test "#^test "#^test "#^test "#^test "#^')).toEqual(-3309452539);
    });
    it('3) should produce number', function () {
        expect(hash_1.hash('test "#^test "#^test "#^testRrr G!@#$%^&*()__+<>?ZXCV":A')).toEqual(-1602613735);
        expect(hash_1.hash('test "#^test "#^test "#^testRrr G!@#$%^&*()__+<>?ZXCV":A')).toEqual(-1602613735);
    });
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
