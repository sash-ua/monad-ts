
import {Either} from "../index";

describe('Either: ', ()=>{
    const uVal = 10;
    const testStr = '10 - isn\'t string';
    it('should produce string', ()=>{
        const right = (x: number) => x+1;
        const left = (y: string) => y + ' - isn\'t string';
        const cond = (v:any) => typeof v === 'string';
        const e = new Either(right, left).bind(cond , uVal);
        expect(e).toEqual(testStr);
    });
    it('should produce number', ()=>{
        const right = (x: number) => x+1;
        const left = (y: string) => y + ' - isn\'t string';
        const cond = (v:any) => typeof v !== 'string';
        const e = new Either(right, left).bind(cond , uVal);
        expect(e).toEqual(11);
    });
    it('should produce Error', ()=>{
        const right = (x: number) => x+1;
        const left = (y: string) => y + ' - isn\'t string';
        const cond = (v:any) => v;
        const e = new Either(right, left).bind(cond, uVal);
        expect(e instanceof Error).toBeTruthy();
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.