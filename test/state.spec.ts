
import {State} from "../src/state";
import {List} from "../src/list";

describe('State: ', ()=>{
    const initState = {
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
        expect(st.get()).toEqual({ data: 1, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 1, 2, 3 ] });

        st.put(v => {
            v.data = 10;
            v.arr = list.bind(v => v+f, v.arr);
            return v;
        });
        expect(st.get()).toEqual({ data: 10, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 2.25, 3.25, 4.25 ] });

        st.put(v => {v.data = 11; return v});
        expect(st.get()).toEqual({ data: 11, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 2.25, 3.25, 4.25 ] });
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.