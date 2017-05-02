
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
    it('should produce clone of object', ()=>{
        const lo = clone(o);
        expect(o).toEqual(o);
        expect(lo).toEqual(o);
        lo.data = 10;
        expect(lo).toEqual(t);
        expect(o).not.toEqual(t);
    });
    it('should return primitive', ()=>{
        expect(clone(p)).toEqual(p);
        expect(clone(n)).toEqual(n);
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
