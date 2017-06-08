
import {clone} from "../src/services/clone";

describe('Service Clone: ', ()=>{
    const p = 'str';
    const n: any = null;
    let f = {x:1};
    let o = {
        data: 1,
        children: [{
            data: 2,
            parent: 'null'
        }],
        arr:[1,2,3]
    };
    let t = {
        data: 10,
        children: [{
            data: 2,
            parent: 'null'
        }],
        arr:[1,2,3]
    };
    it('1) should produce clone of object', ()=>{
        expect(o).toEqual(o);
    });
    it('2) should produce clone of object', ()=>{
        const lo = clone(o);
        expect(lo).toEqual(o);
    });
    it('3) should produce clone of object', ()=>{
        const lo = clone(o);
        lo.data = 10;
        expect(lo).toEqual(t);
    });
    it('4) should produce clone of object', ()=>{
        const lo = clone(o);
        lo.data = 10;
        expect(o).not.toEqual(t);
    });
    it('5) should return primitive', ()=>{
        expect(clone(p)).toEqual(p);
    });
    it('6) should return primitive', ()=>{
        expect(clone(n)).toEqual(n);
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
