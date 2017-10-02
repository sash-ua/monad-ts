
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
        expect(i.bind((v:number) => v, 5) instanceof Error).toBeTruthy();
    });
    it('10) should produce value', () => {
        const i = new Identity();
        const f = () => {
            return 5;
        };
        expect(i.bind(f, null)).toEqual(5);
    });
    it('11) should produce value', () => {
        const i = new Identity(0);
        const f = (v: number) => {
            return v;
        };
        expect(i.bind(f)).toEqual(0);
    });
    it('12) should produce value', () => {
        const i = new Identity('');
        const f = (v: number) => {
            return v;
        };
        expect(i.bind(f)).toMatch('');
    });
    it('13) should produce value', () => {
        const i = new Identity();
        const f = (v: number) => {
            return v;
        };
        expect(i.bind(f, 0)).toEqual(0);
    });
    it('14) should produce value', () => {
        const i = new Identity();
        const f = (v: any) => {
            return v;
        };
        expect(i.bind(f, '')).toEqual('');
    });
    it('15) should produce value', () => {
        const i = new Identity();
        const f = (v: any) => {
            return v;
        };
        expect(i.bind(f, null)).toEqual(null);
    });
    it('16) should produce value', () => {
        const i = new Identity(null);
        const f = (v: any) => {
            return v;
        };
        expect(i.bind(f)).toEqual(null);
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
