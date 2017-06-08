
import {wait} from "../src/services/wait";

describe('Function wait: ', ()=>{
    it('1) should produce value', (done)=>{
        const s = wait(1, 300).then((v: number)=>{
            expect(v).toEqual(1);
            done();
        })
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.