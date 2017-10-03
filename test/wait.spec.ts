
import {wait} from "../src/services/wait";

describe('Function wait: ', ()=>{
    it('1) should produce value', (done)=>{
        wait(1, 300).then((v: number)=>{
            expect(v).toEqual(1);
            done();
        })
    });
    it('2) should produce Error', (done)=>{
        wait(1, -300).catch((v: Error)=>{
            expect(v instanceof Error).toBeTruthy();
            done();
        })
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.