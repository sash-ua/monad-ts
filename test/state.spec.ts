import {State} from "../src/state";
import {List} from "../src/list";

export type R = { data: number; children: any[]; arr: any; test?: number};

describe('State: ', ()=>{
    const initState: R = {
        data: 1,
        children: [{
            data: 2,
            parent: 'null'
        }],
        arr:[1,2,3]
    };
    const st = new State(initState);
    const list = new List();
    const f = 1.25;

    it('1) should return changed given object', ()=>{
        initState.data = 100;
        expect(st.get()).toEqual({ data: 1, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 1, 2, 3 ] });
    });
    it('2) should return changed given object', ()=>{
        st.put((v: R) => {
            v.data = 10;
            v.arr = list.bind((x:number) => x+f, v.arr);
            return v;
        });
        expect(st.get()).toEqual({ data: 10, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 2.25, 3.25, 4.25 ] });
    });
    it('3) should return changed given object', ()=>{
        st.put((v: R) => {
            v.data = 11;
            return v
        });
        expect(st.get()).toEqual({ data: 11, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 2.25, 3.25, 4.25 ] });
    });
    it('4) should produce Error', ()=>{
        st.put((v: R) => {
            v.test = 10;
            v.arr = list.bind((x:number) => x+f, v.arr);
            return v;
        });
        expect(st.get()instanceof Error).toBeTruthy();
    });
    it('5) should produce state', ()=>{
        const iS: R = {
            data: 1,
            children: [{
                data: 2,
                parent: 'null'
            }],
            arr:[1,2,3]
        };
        const st = new State();
        st.bind((x: any) => x, iS);
        expect(st.get()).toEqual(iS);
    });
    it('6) should produce Error', ()=>{
        const st = new State(null);
        st.bind((x: any) => x, null);
        expect(st.get()instanceof Error).toBeTruthy();
    });
    it('7) should produce Error', ()=>{
        const st = new State(undefined);
        st.bind((x: any) => x, undefined);
        expect(st.get()instanceof Error).toBeTruthy();
    });
    it('8) should produce Error', ()=>{
        const st = new State();
        st.bind((x: any) => x);
        expect(st.get()instanceof Error).toBeTruthy();
    });
    it('9) should produce Error', ()=>{
        const st = new State(0);
        st.bind((x: any) => x, 0);
        expect(st.get()instanceof Error).toBeTruthy();
    });
    it('10) should produce Error', ()=>{
        const st = new State('');
        st.bind((x: any) => x, '');
        expect(st.get()instanceof Error).toBeTruthy();
    });
    it('11) should produce value', ()=>{
        const st = new State(0);
        st.bind((x: any) => x);
        expect(st.get()).toEqual(0);
    });
    it('12) should produce value', ()=>{
        const st = new State('');
        st.bind((x: any) => x);
        expect(st.get()).toEqual('');
    });
    it('13) should produce value', ()=>{
        const st = new State();
        st.bind((x: any) => x, 0);
        expect(st.get()).toEqual(0);
    });
    it('14) should produce value', ()=>{
        const st = new State();
        st.bind((x: any) => x, '');
        expect(st.get()).toEqual('');
    });
    it('15) should return changed given object', ()=>{
        const initState: R = {
            data: 1,
            children: [{
                data: 2,
                parent: null
            }],
            arr:[1,2,3]
        };
        const st = new State();
        st.bind((x: any) => x, initState);
        const list = new List();
        const f = 1.25;
        st.put((v: R) => {
            v.data = 10;
            v.arr = list.bind((x:number) => x+f, v.arr);
            return v;
        });
        expect(st.get()).toEqual({ data: 10, children: [ Object({ data: 2, parent: null }) ], arr: [ 2.25, 3.25, 4.25 ] });
    });
    
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.

