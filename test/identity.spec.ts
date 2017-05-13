
import {Identity} from "../src/identity";

describe('Identity: ', ()=>{
    it('should produce values', ()=>{
        const i = new Identity();
        expect(i.just((v:number)=>v, 3)).toEqual(3);
        const f = (v:number) => v;
        expect(f(3)).toEqual(3);
        expect(i.just((v:number) => v+2, i.just(f, 1))).toEqual(3);
        expect(i.just((x:number) => i.just(v => v+2, f(x)), 1)).toEqual(3);
    });
    it('should produce values', ()=>{
        const i = new Identity(3);
        expect(i.bind((v:number)=>v)).toEqual(3);
        const f = (v:number) => v;
        expect(f(3)).toEqual(3);
        expect(i.bind((v:number) => v+2)).toEqual(5);
        expect(i.bind((x:number) => i.bind(v => x+2))).toEqual(5);
    });
    it('should ', ()=>{
        const i = new Identity(3);
        expect(i.bind((v:number)=>v, 5) instanceof Error).toBeTruthy();
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
