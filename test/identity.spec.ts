
import {Identity} from "../src/identity";

describe('Identity: ', ()=>{
    const i = new Identity();
    it('should produce return values', ()=>{
        expect(i.just(v=>v, 3)).toEqual(3);
        const f = (v: any) => v;
        expect(f(3)).toEqual(3);
        expect(i.just(v => v+2, i.just(f, 1))).toEqual(3);
        expect(i.just(x => i.just(v => v+2, f(x)), 1)).toEqual(3);
    })
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
