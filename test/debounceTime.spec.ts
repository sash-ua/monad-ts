
import {debounceTime} from "../src/services/debounceTime";

describe('Function debounceTime: ',()=>{
    it('should produce number, mode - delay before first func invoke', (done)=>{
        const f = (arg: number): number => v+=arg;
        let v = 0;
        const dT = debounceTime(f, 100, false);
        for(let i = 0; i<10; i++){
            dT(1);
        }
        expect(v).toEqual(0);
        done();
    });
    it('should produce number, mode - no delay before first func invoke', (done)=>{
        const f = (arg: number): number => v+=arg;
        let v = 0;
        const dT = debounceTime(f, 100);
        for(let i = 0; i<10; i++){
            dT(1);
        }
        expect(v).toEqual(1);
        done();
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.