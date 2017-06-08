
import {Flow} from "../src/flow";
import {cast} from "../src/services/cast";
import {List} from "../src/list";
import {R} from "./state.spec";

describe('Flow: ',()=>{
    const list = new List();
    it('1) should return Error', ()=>{
        const z = new Flow(5)
            .bind((v: any): any => v+1)
            .bind((v: any) => new Error(`value ${v}`))
            .bind((v: any) => cast(list.bind((v: number) => [v-1, v, v+1], [-v, v ]), 1))
            .subscribe();
        expect(z instanceof Error).toBeTruthy();
    });
    it('2) shouldn\'t change inner state if was changed init object. Default encapsulation mode.', ()=>{
        const init: R = Object({ data: 1, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 1, 2, 3 ]});
        const res: R = Object({ data: 100, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 1, 2, 3 ]});
        const z = new Flow(init)
            .bind((v: any): any => {v.data = 100; return v})
            .subscribe();
        expect(z).toEqual(res);
    });
    it('3) shouldn\'t change inner state if was changed init object. Default encapsulation mode.', ()=>{
        const init: R = Object({ data: 1, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 1, 2, 3 ]});
        const res: R = Object({ data: 100, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 1, 2, 3 ]});
        const z = new Flow(init)
            .bind((v: any): any => {v.data = 100; return v})
            .subscribe();
        init.data = 50;
        expect(z).toEqual(res);
    });
    it('4) should change inner state if was changed init object. No encapsulation mode.', ()=>{
        const init: R = Object({ data: 1, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 1, 2, 3 ]});
        const res: R = Object({ data: 100, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 1, 2, 3 ]});
        const z = new Flow(init, false)
            .bind((v: any): any => {v.data = 100; return v})
            .subscribe();
        expect(z).toEqual(res);
    });
    it('5) should change inner state if was changed init object. No encapsulation mode.', ()=>{
        const init: R = Object({ data: 1, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 1, 2, 3 ]});
        const resChanged: R = Object({ data: 50, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 1, 2, 3 ]});
        const z = new Flow(init, false)
            .bind((v: any): any => {v.data = 100; return v})
            .subscribe();
        init.data = 50;
        expect(z).toEqual(resChanged);
    });
    it('6) should return null', ()=>{
        const z = new Flow(5)
            .bind((v: any): any => v+1)
            .bind((v: any): any => null)
            .bind((v: any) => cast(list.bind((v: number) => [v-1, v, v+1], [-v, v ]), 1))
            .subscribe();
        expect(z).toBeNull();
    });
    it('7) should return null', ()=>{
        const z = new Flow(5)
            .bind((v: any): any => v+1)
            .bind((v: any): any => undefined)
            .bind((v: any) => cast(list.bind((v: number) => [v-1, v, v+1], [-v, v ]), 1))
            .subscribe();
        expect(z).toBeNull();
    });
    it('8) should return null', ()=>{
        const z = new Flow(5)
            .bind((v: any): any => v/0)
            .bind((v: any): any => cast(list.bind((v: number) => [v-1, v, v+1], [-v, v ]), 1))
            .subscribe();
        expect(z instanceof Error).toBeTruthy();
    });
    it('9) should produce array', ()=>{
        const z = new Flow(5)
            .bind((v: any): any => v+1)
            .bind((v: any): any => cast(list.bind((v: number) => [v-1, v, v+1], [-v, v ]), 1))
            .subscribe();
        expect(z).toEqual([ -7, -6, -5, 5, 6, 7 ]);
    });
    it('10) should set shared variables', ()=>{
        let t : number[];
        expect(t).toBeUndefined();
    });
    it('11) should set shared variables', ()=>{
        let r : number;
        expect(r).toBeUndefined();
    });
    it('12) should set shared variables', ()=>{
        const e: number = 50;
        let r : number;
        let t : number[];
        const z = new Flow(5)
            .bind((v: number): any => v+1)
            .let((v: number): any => new Flow(v).bind((v: number) => r = v+e))
            .bind((v: number): any => cast(list.bind((v: number) => [v-1, v, v+1], [-v, v ]), 1))
            .let((v: number)=> new Flow(v).bind((v: number[]) => t = v, cast(list.bind((v: number)=>[v, -v], [v]), 2)))
            .subscribe();
        expect(r).toEqual(56);
    });
    it('13) should set shared variables', ()=>{
        const e: number = 50;
        let r : number;
        let t : number[];
        const z = new Flow(5)
            .bind((v: number): any => v+1)
            .let((v: number): any => new Flow(v).bind((v: number) => r = v+e))
            .bind((v: number): any => cast(list.bind((v: number) => [v-1, v, v+1], [-v, v ]), 1))
            .let((v: number)=> new Flow(v).bind((v: number[]) => t = v, cast(list.bind((v: number)=>[v, -v], [v]), 2)))
            .subscribe();
        expect(t).toEqual([ -7, 7, -6, 6, -5, 5, 5, -5, 6, -6, 7, -7 ]);
    });
    it('14) should set shared variables', ()=>{
        const e: number = 50;
        let r : number;
        let t : number[];
        const z = new Flow(5)
            .bind((v: number): any => v+1)
            .let((v: number): any => new Flow(v).bind((v: number) => r = v+e))
            .bind((v: number): any => cast(list.bind((v: number) => [v-1, v, v+1], [-v, v ]), 1))
            .let((v: number)=> new Flow(v).bind((v: number[]) => t = v, cast(list.bind((v: number)=>[v, -v], [v]), 2)))
            .subscribe();
        expect(z).toEqual([ -7, -6, -5, 5, 6, 7 ]);
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
