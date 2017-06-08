
import {Identity} from "../src/identity";

describe('Identity: ', ()=>{
    it('1) should produce values', ()=>{
        const i = new Identity();
        expect(i.just((v:number)=>v, 3)).toEqual(3);
    });
    it('2) should produce values', ()=>{
        const f = (v:number) => v;
        expect(f(3)).toEqual(3);
    });
    it('3) should produce values', ()=>{
        const i = new Identity();
        const f = (v:number) => v;
        expect(i.just((v:number) => v+2, i.just(f, 1))).toEqual(3);
    });
    it('4) should produce values', ()=>{
        const i = new Identity();
        const f = (v:number) => v;
        expect(i.just((x:number) => i.just(v => v+2, f(x)), 1)).toEqual(3);
    });
    it('5) should produce values', ()=>{
        const i = new Identity(3);
        expect(i.bind((v:number)=>v)).toEqual(3);
    });
    it('6) should produce values', ()=>{
        const f = (v:number) => v;
        expect(f(3)).toEqual(3);
    });
    it('7) should produce values', ()=>{
        const i = new Identity(3);
        expect(i.bind((v:number) => v+2)).toEqual(5);
    });
    it('8) should produce values', ()=>{
        const i = new Identity(3);
        expect(i.bind((x:number) => i.bind(v => x+2))).toEqual(5);
    });
    it('9) should produce true', ()=>{
        const i = new Identity(3);
        expect(i.bind((v:number)=>v, 5) instanceof Error).toBeTruthy();
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
