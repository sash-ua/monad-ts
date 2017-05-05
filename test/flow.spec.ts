
import {Flow} from "../src/flow";
import {cast} from "../src/services/cast";
import {List} from "../src/list";

describe('Flow: ',()=>{
    const list = new List();
    it('should return Error', ()=>{
        const z = new Flow(5)
            .bind((v: any): any => v+1)
            .bind((v: any) => new Error(`value ${v}`))
            .bind((v: any) => cast(list.bind((v: number) => [v-1, v, v+1], [-v, v ]), 1))
            .subscribe();
        expect(z instanceof Error).toBeTruthy();
    });
    it('1. should return null', ()=>{
        const z = new Flow(5)
            .bind((v: any): any => v+1)
            .bind((v: any): any => null)
            .bind((v: any) => cast(list.bind((v: number) => [v-1, v, v+1], [-v, v ]), 1))
            .subscribe();
        expect(z).toBeNull();
    });
    it('2. should return null', ()=>{
        const z = new Flow(5)
            .bind((v: any): any => v+1)
            .bind((v: any): any => undefined)
            .bind((v: any) => cast(list.bind((v: number) => [v-1, v, v+1], [-v, v ]), 1))
            .subscribe();
        expect(z).toBeNull();
    });
    it('3. should return null', ()=>{
        const z = new Flow(5)
            .bind((v: any): any => v/0)
            .bind((v: any): any => cast(list.bind((v: number) => [v-1, v, v+1], [-v, v ]), 1))
            .subscribe();
        expect(z instanceof Error).toBeTruthy();
    });
    it('should produce array', ()=>{
        const z = new Flow(5)
            .bind((v: any): any => v+1)
            .bind((v: any): any => cast(list.bind((v: number) => [v-1, v, v+1], [-v, v ]), 1))
            .subscribe();
        expect(z).toEqual([ -7, -6, -5, 5, 6, 7 ]);
    });
    it('should set shared variables', ()=>{
        const e: number = 50;
        let r : number;
        let t : number[];
        expect(t).toBeUndefined();
        expect(r).toBeUndefined();
        const z = new Flow(5)
            .bind((v: number): any => v+1)
            .let((v: number): any => new Flow(v).bind((v: number) => r = v+e))
            .bind((v: number): any => cast(list.bind((v: number) => [v-1, v, v+1], [-v, v ]), 1))
            .let((v: number)=> new Flow(v).bind((v: number[]) => t = v, cast(list.bind((v: number)=>[v, -v], [v]), 2)))
            .subscribe();
        expect(r).toEqual(56);
        expect(t).toEqual([ -7, 7, -6, 6, -5, 5, 5, -5, 6, -6, 7, -7 ]);
        expect(z).toEqual([ -7, -6, -5, 5, 6, 7 ]);
    });
    it('should return given value', ()=>{
        const z = new Flow(5).bind().bind().bind().subscribe();
        expect(z).toEqual(5);
        const z1 = new Flow('test').bind().bind().bind().subscribe();
        expect(z1).toEqual('test');
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
