
import {cast} from "../src/services/cast";
import {List} from "../src/list";
import {AsyncFlow} from "../src/asyncFlow";
import {wait} from "../src/services/wait";

describe('AsyncFlow: ', ()=>{
    const list = new List();
    it('1) should produce value', ()=>{
        new AsyncFlow(5)
            .bind((v) => v)
            .then((v) => v)
            .then((v) => cast(list.bind((v:number) => [v-1, v, v+1], [v]), 1))
            .then(v=> wait(v,0))
            .then((v)=> {
                expect(v).toEqual([4,5,6])
            });
    });
    it('2) should produce value (async)', (done)=>{
        new AsyncFlow(5)
            .bind((v) => v)
            .then((v) => v)
            .then((v) => cast(list.bind((v:number) => [v-1, v, v+1], [v]), 1))
            .then(v=> wait(v,100))
            .then((v)=> {
                expect(v).toEqual([4,5,6]);
                done();
            });
    });
    it('3) should produce null', ()=>{
        new AsyncFlow(null)
            .bind((v) => v)
            .then((v: any)=> {
                expect(v).toBeNull();
            })
    });
    it('4) should produce Error', ()=>{
        new AsyncFlow(new Error('f'))
            .bind((v) => v)
            .then((v: any)=> {
                expect(v instanceof Error).toBeTruthy();
            })
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.