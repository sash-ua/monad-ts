
import {State} from "../src/state";
import {List} from "../src/list";

describe('State: ', ()=>{
    type R = { data: number; children: any[]; arr: number[]; };
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

    it('should return changed given object', ()=>{
        initState.data = 100;
        expect(st.get()).toEqual({ data: 1, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 1, 2, 3 ] });

        st.put((v: R) => {
            v.data = 10;
            v.arr = list.bind((x:number) => x+f, v.arr);
            return v;
        });
        expect(st.get()).toEqual({ data: 10, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 2.25, 3.25, 4.25 ] });

        st.put((v: R) => {
            v.data = 11;
            return v
        });
        expect(st.get()).toEqual({ data: 11, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 2.25, 3.25, 4.25 ] });
    });
    it('should produce Error', ()=>{
        st.put((v: R) => {
            v.test = 10;
            v.arr = list.bind((x:number) => x+f, v.arr);
            return v;
        });
        expect(st.get()instanceof Error).toBeTruthy();
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.

