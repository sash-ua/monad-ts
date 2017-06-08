
import {equality} from "../src/services/equality";

class Test{
    constructor(private arg: any){    }
}
class Test2{
    constructor(private arg: any){    }
}

describe('Equality: ', ()=>{
    let d;
    it('1)should produce true', ()=>{
        expect(equality(
            10,10
        )).toBeTruthy();
    });
    it('2)should produce true', ()=>{
        expect(equality(
            null, null
        )).toBeTruthy();
    });
    it('3)should produce false', ()=>{
        expect(equality(
            null, undefined
        )).toBeFalsy();
    });
    it('4)should produce true', ()=>{
        expect(equality(
            NaN, NaN
        )).toBeTruthy();
    });
    it('4)should produce false', ()=>{
        expect(equality(
            NaN, Infinity
        )).toBeFalsy();
    });
    it('5) should produce true', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: function(){return d = {'g': {arr:[1,2,3]}};}}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: function(){return d = {'g': {arr:[1,2,3]}};}}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeTruthy();
    });
    it('6) should produce false', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: function(){return d = {'g': {arr:[1,2,3]}};}}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: function(){}}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('7) should produce false', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: ()=>{return ()=> {return {'g': {arr:[1,2,3]}}};}}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: function(){return function ss() {return{'g': {arr:[1,2,3]}}};}}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('8) should produce true', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: ()=>{return ()=> {return {'g': {arr:[1,2,3]}}};}}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: function(){return function() {return{'g': {arr:[1,2,3]}}};}}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeTruthy();
    });
    it('9) should produce false', ()=>{
        let d = 20;
        let d2 = 20;
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: ()=>{return ()=> {return {'g': d}};}}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: function(){return function() {return{'g': d2}};}}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('10) should produce false', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: ()=>{return ()=> {return {'g': {arr:[1,2,3]}}};}}, 23]}, NaN, ()=>{return {'f': 1000}}, null, undefined], t: [null, 0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: function(){return function() {return{'g': {arr:[1,2,3]}}};}}, 23]}, ()=>{return {'f': 1000}}, NaN, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });

    it('11) should produce false', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, -Infinity, null, undefined], t: [null, 0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('12) should produce false', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: function(){return d = 2;}}, 23]}, NaN, -Infinity, null, undefined], t: [null, 0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('13) should produce false', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, -0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('14) should produce false', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, undefined, undefined], t: [null, 0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('15) should produce false', ()=>{
        expect(equality(
            {u: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('16) should produce false', ()=>{
        expect(equality(
            {x: 0, x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('17.0) should produce false', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, undefined, undefined], t: [null, 0]},
            null
        ) ).toBeFalsy();
    });
    it('17.1) should produce false', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, undefined, undefined], t: [null, 0]},
            NaN
        ) ).toBeFalsy();
    });
    it('17.2) should produce false', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, undefined, undefined], t: [null, 0]},
            undefined
        ) ).toBeFalsy();
    });
    it('17.3) should produce false', ()=>{
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, undefined, undefined], t: [null, 0]},
            Infinity
        ) ).toBeFalsy();
    });
    it('18) should produce false', ()=>{
        expect(equality(
            {x: new Test(true), x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x: new Test(false), x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('19) should produce true', ()=>{
        expect(equality(
            {x: new Test(true), x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x: new Test(true), x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t:
    [null, 0]}
        )).toBeTruthy();
    });
    it('20) should produce false', ()=>{
        expect(equality(
            {x: new Test(true), x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x: new Test2(true), x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('21.0) should produce false', ()=>{
        expect(equality(
            {x: String('as'), y: {}, x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x: String('asd'), y: {}, x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('21.1) should produce false', ()=>{
        expect(equality(
            {x: new String('as'), y: {}, x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x: new String('asd'), y: {}, x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('21.3) should produce true', ()=>{
        expect(equality(
            {x: new String('as'), y: {}, x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x: new String('as'), y: {}, x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeTruthy();
    });
    it('21.4) should produce true', ()=>{
        expect(equality(
            {x: String('as'), y: {}, x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x: String('as'), y: {}, x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeTruthy();
    });
    it('22.0) should produce false', ()=>{
        expect(equality(
            {x: Number(11), y: {}, x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x: Number(1), y: {}, x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('22.1) should produce true', ()=>{
        expect(equality(
            {x: Number(11), y: {}, x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x: Number(11), y: {}, x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeTruthy();
    });
    it('23.0) should produce false', ()=>{
        expect(equality(
            {x: Boolean(true), y: {}, x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x: Boolean(false), y: {}, x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeFalsy();
    });
    it('23.1) should produce true', ()=>{
        expect(equality(
            {x: Boolean(true), y: {}, x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x: Boolean(true), y: {}, x1: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeTruthy();
    });
    it('23.2) should produce false', ()=>{
        expect(equality(Boolean(true), Boolean(false))).toBeFalsy();
    });
    it('24) should produce true', ()=>{
        let d = 20;
        let d2 = 20;
        expect(equality(
            {x1: 0, x: [1, {c: [22, {j:21, g: d}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
            {x1: 0, x: [1, {c: [22, {j:21, g: d2}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
        )).toBeTruthy();
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.