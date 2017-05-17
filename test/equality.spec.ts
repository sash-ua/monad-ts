
import {equality} from "../src/services/equality";

describe('Equality: ', ()=>{
    it('should produce true', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeTruthy();
    });
    it('1) should produce false', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, -Infinity, null, undefined], t: [null, 0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('2) should produce false', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, -0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('3) should produce false', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, undefined, undefined], t: [null, 0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('4) should produce false', ()=>{
        expect(equality(
            {u: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('should produce Error', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, undefined, undefined], t: [null, 0]},
            null
        ) instanceof  Error).toBeTruthy();
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.