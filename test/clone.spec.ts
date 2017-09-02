
import {clone} from "../src/services/clone";

describe('Service Clone: ', ()=>{
    const p = 'str';
    const n: any = null;
    let o: any = {
        data: 1,
        children: [{
            data: 2,
            parent: null
        }],
        arr:[1,2,3]
    };
    let o2: any = {
        data: 1,
        children: {
            data: 2,
            parent: null
        },
        arr:[1,2,3]
    };
    let t: any = {
        data: 10,
        children: [{
            data: 2,
            parent: null
        }],
        arr:[1,2,3]
    };
    let obj = {
        foo: 1,
        get bar() {
            return 2;
        }
    };
    let objC = {
        foo: 1,
        get sbar() {
            return 2;
        }
    };
    let objC2 = {
        foo: 1,
        get bar() {
            return 3;
        }
    };
    
    it('1) should produce clone of object', ()=>{
        const lo = clone(o);
        expect(lo).toEqual(o);
    });
    it('2) should produce clone of object', ()=>{
        const lo = clone(o);
        lo.data = 10;
        expect(lo).toEqual(t);
    });
    it('3) should produce clone of object', ()=>{
        let l = o, z = clone(o);
        expect(o).not.toEqual(o2);
        expect(l).not.toEqual(o2);
        expect(z).not.toEqual(o2);
        o.children = {data: 2, parent: null};
        expect(o).toEqual(o2);
        expect(l).toEqual(o2);
        expect(z).not.toEqual(o2);
    });
    it('4) should return primitive', ()=>{
        expect(clone(p)).toEqual(p);
    });
    it('5) should return primitive', ()=>{
        expect(clone(n)).toEqual(n);
    });
    it('6) should return true', ()=>{
        expect(obj).not.toEqual(objC);
        expect(obj).not.toEqual(objC2);
        let z =clone(obj);
        expect(z).not.toEqual(objC);
        obj.foo = 2;
        expect(z).not.toEqual(obj);
        z.foo = 2;
        expect(z).toEqual(obj);
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
