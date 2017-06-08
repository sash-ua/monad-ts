
import {List} from "../src/list";
import {cast} from "../src/services/cast";

describe('List: ', ()=>{
    const list = new List();
    it('1) should produce array', ()=>{
        let z = cast(list.bind((v: number) =>v, [1]), 0);
        expect(z).toEqual([1]);
    });
    it('2) should produce array', ()=>{
        let z: any = list.bind((v: number) =>v, [1]);
        expect(z).toEqual([1]);
    });
    it('3) should produce array', ()=>{
        const f = (v: number[]) => v;
        expect(f([1])).toEqual([1]);
    });
    it('4) should produce array', ()=>{
        const answ =  [ -9, 9, -10, 10, -11, 11 ] ;
        let z = cast(list.bind((v: number) =>[-v, v], list.bind((v: number) => [v-1, v, v+1], [10])), 2);
        expect(z).toEqual(answ);
    });
    it('5) should produce array', ()=>{
        const answ =  [ -9, 9, -10, 10, -11, 11 ] ;
        let z = cast(list.bind((v: number) =>list.bind((v: number) => [-v, v], [v-1, v, v+1]), [10]),2);
        expect(z).toEqual(answ);
    });
    it('6) should produce array', ()=>{
        const answ1 = [ -9, 9, -10, 10, -11, 11, -1, 1, -2, 2, -3, 3 ];
        let z = cast(list.bind((v: number) =>[-v, v], list.bind((v: number) => [v-1, v, v+1], [10, 2])), 2);
        expect(z).toEqual(answ1);
    });
    it('7) should produce array', ()=>{
        const answ1 = [ -9, 9, -10, 10, -11, 11, -1, 1, -2, 2, -3, 3 ];
        let z = cast(list.bind((v: number) =>list.bind((v: number) => [-v, v], [v-1, v, v+1]), [10, 2]), 2);
        expect(z).toEqual(answ1);
    });
    it('8) should produce array', ()=>{
        const y1 = cast(list.bind((x: number)=>list.bind((x: string)=>new  List().bind(x=>[x+'a'], [-x, x]), [x-1, x, x+1]), [10]), 3);
        expect(y1).toEqual([ '-9a', '9a', '-10a', '10a', '-11a', '11a' ]);
    });
    it('9) should produce array', ()=>{
        const y2 = cast(list.bind(x=>list.bind(x=>[x], [{rt: 1, ...x}, x, x]), [{a: 10}]), 2);
        expect(y2).toEqual([ Object({ rt: 1, a: 10 }), Object({ a: 10 }), Object({ a: 10 }) ]);
    });
    it('10) should produce array of arrays', ()=>{
        const rz = [ [ -9, 9 ], [ -10, 10 ], [ -11, 11 ], [ -1, 1 ], [ -2, 2 ], [ -3, 3 ] ];
        let z = cast(list.bind((v: number) => [-v, v], list.bind((v: number) => [v-1, v, v+1], [[10], [2]])), 2);
        expect(z).toEqual(rz);
    });
    it('11) should produce array of arrays', ()=>{
        const rz = [ [ -9, 9 ], [ -10, 10 ], [ -11, 11 ], [ -1, 1 ], [ -2, 2 ], [ -3, 3 ] ];
        let z = cast(list.bind((v: number) => list.bind((v: number) => [-v, v], [v-1, v, v+1]), [[10], [2]]), 2);
        expect(z).toEqual(rz );
    });
    it('12) should produce array of arrays', ()=>{
        const rz3 = [ [ -19, 19 ], [ -20, 20 ], [ -21, 21 ], [ -10, 10 ], [ -11, 11 ], [ -12, 12 ], [ -3, 3 ], [ -4, 4 ], [ -5, 5 ], [ -2, 2 ], [ -3, 3 ], [ -4, 4 ] ];
        let z3 = cast(list.bind((v: number) => [-v, v], list.bind( (v: number) => [v-1, v, v+1], list.bind((v: number) => [v*2, v+1], [[10], [2]]))), 3);
        expect(z3).toEqual(rz3 );
    });
    it('13) should produce array of arrays', ()=>{
        const rz3 = [ [ -19, 19 ], [ -20, 20 ], [ -21, 21 ], [ -10, 10 ], [ -11, 11 ], [ -12, 12 ], [ -3, 3 ], [ -4, 4 ], [ -5, 5 ], [ -2, 2 ], [ -3, 3 ], [ -4, 4 ] ];
        let z3 = cast(list.bind((v: number) => list.bind((v: number) => list.bind((v: number) =>[-v, v], [v-1, v, v+1]), [v*2,v+1]), [[10], [2]]), 3);
        expect(z3).toEqual(rz3 );
    });
    it('14) should produce string', ()=>{
        const t: Array<string> = 'test'.split('');
        const z: any = cast(list.bind((x: string) => list.bind((x: string) => x === 't' ? x : x=' ', [x]), t), 2).join('');
        expect(z).toEqual('t  t');
    });
    it('15) should produce string', ()=>{
        const t: Array<string> = 'test'.split('');
        const s: any = cast(list.bind((x: string) => list.bind((x: string) => x === 'tt' ? x : x=' ', [x+'t']), t), 2).join('');
        expect(s).toEqual('tt  tt');
    });
    it('16) should produce an error', ()=>{
        expect(list.bind(v=>v, 'abc') instanceof Error).toBeTruthy();
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
