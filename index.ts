
/**
 * @description
 * Entry point for all public APIs of the Monad-TS package.
 */

export {Either} from "./src/either";
export {List} from "./src/list";
export {Identity} from "./src/identity";
export {Flow} from "./src/flow";
export {clone} from "./src/services/clone";
export {cast} from "./src/services/cast";
export {M, MF, Pr} from "./src/monad";
export {Maybe} from "./src/maybe";
export {State} from "./src/state";
export {Monad} from "./src/monad";



// import {Either} from "./src/either";
//
// const e = new Either((x: number) => x+1, (y: string) => y + ' isn\'t string').bind((v: any) => typeof v !== 'string', '10');
// console.log(e);

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.