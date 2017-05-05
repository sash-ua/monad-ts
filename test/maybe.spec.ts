
import {Maybe} from "../src/maybe";

describe('Maybe: ', ()=>{
    const maybe = new Maybe();
    it('should produce values', ()=>{
        expect(maybe.bind(v=>v, 3)).toEqual(3);
        const f = (v: any) => v;
        expect(f(3)).toEqual(3);
        expect(maybe.bind((v: number) => v+2, maybe.bind(f, 1))).toEqual(3);
        expect(maybe.bind((x: number) => maybe.bind((v: number) => v+2, f(x)), 1)).toEqual(3);

        expect(maybe.bind((v: number) => maybe.bind((v1: number)=>v+v1, 2), 1)).toEqual(3);
        expect(maybe.bind((v: number) => maybe.bind((v1: number)=> maybe.bind((v2: number) => v+v1+v2, 3), 2), 1)).toEqual(6);
    });
    it('should produce null', ()=>{
        expect(maybe.bind((v: number) => maybe.bind((v1: number)=>v+v1, 1), undefined)).toBeNull();
        expect(maybe.bind((v: number) => maybe.bind((v1: number)=>v+v1, null), 1)).toBeNull();
    });
    it('1. should returne string', ()=>{
        type G = { url: string; getUrl: () => any; };
        const z: G = {
            url: 'http://...',
            getUrl: function (){
                return this.url;
            }
        };
        expect(maybe.bind((r: G) => r.getUrl(), z)).toBe('http://...');
    });
    it('2. should returne string', ()=>{
        type F ={ url: string; getUrl: () => any; };
        const z: F = {
            url: 'http://...',
            getUrl:  ()=> z.url
        };
        expect(maybe.bind((r: F) => r.getUrl(), z)).toBe('http://...');
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
