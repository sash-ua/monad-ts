
import {ErrorM} from "../src/error";
describe('ErrorM: ', ()=>{
    const e = new ErrorM();
    it('should produce return values', ()=>{
        expect(e.just(v=>v, 3)).toEqual(3);
        const f = (v: any) => v;
        expect(f(3)).toEqual(3);
        expect(e.just(v => v+2, e.just(f, 1))).toEqual(3);
        expect(e.just(x => e.just(v => v+2, f(x)), 1)).toEqual(3);
    });
    it('should produce errors', ()=>{
        expect(e.bind(v => e.bind(v1=>v+v1, 1), Infinity)instanceof Error).toBeTruthy();
        expect(e.bind(v => e.bind(v1=>v+v1, 1), NaN)instanceof Error).toBeTruthy();
        expect(e.bind(v => e.bind(v1=>v/v1, 0), 1)instanceof Error).toBeTruthy();
        expect(e.bind(v => e.bind(v1=>v/v1, -0), 1)instanceof Error).toBeTruthy();
        expect(e.bind(v => e.bind(v1=>v/v1, 0), 0)instanceof Error).toBeTruthy();
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.