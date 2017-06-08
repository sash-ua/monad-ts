
import {ErrorM} from "../src/error";
describe('ErrorM: ', ()=>{
    const e = new ErrorM();
    it('1) should produce return values', ()=>{
        expect(e.just((v: number)=>v, 3)).toEqual(3);
    });
    it('2) should produce return values', ()=>{
        const f = (v: number) => v;
        expect(f(3)).toEqual(3);
    });
    it('3) should produce return values', ()=>{
        const f = (v: number) => v;
        expect(e.just((v: number) => v+2, e.just(f, 1))).toEqual(3);
    });
    it('4) should produce return values', ()=>{
        const f = (v: number) => v;
        expect(e.just((x: number) => e.just((v: number) => v+2, f(x)), 1)).toEqual(3);
    });
    it('5) should produce errors', ()=>{
        expect(e.bind((v:any) => e.bind((v1: number)=>v+v1, 1), Infinity)instanceof Error).toBeTruthy();
    });
    it('6) should produce errors', ()=>{
        expect(e.bind((v:any) => e.bind(v1=>v+v1, 1), NaN)instanceof Error).toBeTruthy();
    });
    it('7) should produce errors', ()=>{
        expect(e.bind((v:any) => e.bind((v1: number)=>v/v1, 0), 1)instanceof Error).toBeTruthy();
    });
    it('8) should produce errors', ()=>{
        expect(e.bind((v:any) => e.bind((v1: number)=>v/v1, -0), 1)instanceof Error).toBeTruthy();
    });
    it('9) should produce errors', ()=>{
        expect(e.bind((v:any) => e.bind((v1: number)=>v/v1, 0), 0)instanceof Error).toBeTruthy();
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.