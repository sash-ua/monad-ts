import {hash} from "../src/services/hash";

describe('Hash: ', ()=>{
    it('1) should produce number', ()=>{
        expect(hash('test "#^')).toEqual(2680653216);
        expect(hash('test "#^')).toEqual(2680653216);
    });
    it('2) should produce number', ()=>{
        expect(hash('test "#^test "#^test "#^test "#^test "#^test "#^test "#^test "#^')).toEqual(985514757);
        expect(hash('test "#^test "#^test "#^test "#^test "#^test "#^test "#^test "#^')).toEqual(985514757);
    });
    it('3) should produce number', ()=>{
        expect(hash('test "#^test "#^test "#^testRrr G!@#$%^&*()__+<>?ZXCV":A')).toEqual(2692353561 );
        expect(hash('test "#^test "#^test "#^testRrr G!@#$%^&*()__+<>?ZXCV":A')).toEqual(2692353561 );
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.